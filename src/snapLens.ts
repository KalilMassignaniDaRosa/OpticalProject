import {
  bootstrapCameraKit,
  estimateLensPerformance,
  createMediaStreamSource,
  Transform2D
} from "@snap/camera-kit";

const DEFAULT_CAMERA_WIDTH  = 320;
const DEFAULT_CAMERA_HEIGHT = 240;
const DEFAULT_FPS_LIMIT     = 15;

// Referencias do DOM
const startBtn     = document.getElementById("start-lens")   as HTMLButtonElement;
const prevBtn      = document.getElementById("prev-lens")   as HTMLButtonElement;
const nextBtn      = document.getElementById("next-lens")   as HTMLButtonElement;
const indexLabel   = document.getElementById("lens-index")  as HTMLSpanElement;
const canvas       = document.getElementById("my-Canvas")   as HTMLCanvasElement;

// Lentes e sessao
let session: any = null;
let stream: MediaStream | null = null;
let lenses: any[] = [];
let currentIndex = 0;

// Atualiza o index atual
function updateIndexLabel() {
  indexLabel.textContent = `${currentIndex + 1} / ${lenses.length}`;
}

// Aplica lente do index
async function applyCurrentLens() {
  if (!session || !lenses.length) return;
  const lens = lenses[currentIndex];
  await session.applyLens(lens);
}

// Comeca sessao
async function startSession(
  cameraWidth: number = DEFAULT_CAMERA_WIDTH,
  cameraHeight: number = DEFAULT_CAMERA_HEIGHT,
  fpsLimit: number = DEFAULT_FPS_LIMIT
) {
  try {
    // Encerra sessao
    if (session) {
      await session.destroy();
      session = null;
    }
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }

    // Bootstrap do CameraKit
    const cameraKit = await bootstrapCameraKit({
      apiToken: import.meta.env.VITE_CAMERAKIT_API_TOKEN!,
      lensPerformance: estimateLensPerformance()
    });

    // Cria sessao
    session = await cameraKit.createSession({ liveRenderTarget: canvas });
    session.events.addEventListener("error", (e: any) => {
      console.error("Erro on session:", e.detail.error);
      if (e.detail.error.name === "LensExecutionError") {
        alert("Lens error! Refresh the page");
      }
    });

    // Inicia stream de video
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: cameraWidth, height: cameraHeight, frameRate: { max: fpsLimit } }
    });

    // Video espelhado
    const source = createMediaStreamSource(stream, {
      transform: Transform2D.MirrorX,
      cameraType: "user",
      fpsLimit
    });
    await session.setSource(source);
    await source.setRenderSize(cameraWidth, cameraHeight);

    // Carrega todas as lentes
    const groupId = import.meta.env.VITE_CAMERAKIT_LENS_GROUP_ID!;
    const { lenses: loadedLenses } = await cameraKit.lensRepository.loadLensGroups([groupId]);
    lenses = loadedLenses;
    currentIndex = 0;
    updateIndexLabel();

    // Aplica a primeira lente
    await applyCurrentLens();
    await session.setFPSLimit(fpsLimit);
    await session.play();

  } catch (err) {
    console.error("Error starting Snap Lens::", err);
  }
}

// Eventos
startBtn.addEventListener("click", async () => {
  await startSession();
  startBtn.remove();
});

prevBtn.addEventListener("click", async () => {
  if (lenses.length) {
    currentIndex = (currentIndex - 1 + lenses.length) % lenses.length;
    updateIndexLabel();
    await applyCurrentLens();
  }
});

nextBtn.addEventListener("click", async () => {
  if (lenses.length) {
    currentIndex = (currentIndex + 1) % lenses.length;
    updateIndexLabel();
    await applyCurrentLens();
  }
});
