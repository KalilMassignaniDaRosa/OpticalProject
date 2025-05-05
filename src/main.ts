import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit";

(async function main(): Promise<void> {
  try {
    // Pega as variáveis de ambiente tipadas
    const  VITE_CAMERAKIT_API_TOKEN = import.meta.env.VITE_CAMERAKIT_API_TOKEN
    const  VITE_CAMERAKIT_LENS_GROUP_ID = import.meta.env.VITE_CAMERAKIT_LENS_GROUP_ID
    const  VITE_CAMERAKIT_LENS_ID = import.meta.env.VITE_CAMERAKIT_LENS_ID
    //console.log("Variáveis de ambiente:", import.meta.env);


    // Validações iniciais
    if (!VITE_CAMERAKIT_API_TOKEN) {
      throw new Error("Variável VITE_CAMERAKIT_API_TOKEN não encontrada!");
    }
    if (!VITE_CAMERAKIT_LENS_ID || !VITE_CAMERAKIT_LENS_GROUP_ID) {
      throw new Error(
        "Variáveis de Lens (VITE_CAMERAKIT_LENS_ID ou VITE_CAMERAKIT_LENS_GROUP_ID) não encontradas!"
      );
    }

    // Inicializa o Camera Kit
    const cameraKit = await bootstrapCameraKit({
      apiToken: VITE_CAMERAKIT_API_TOKEN,
    });

    // Configura o canvas
    const canvas = document.getElementById("my-Canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      throw new Error("Canvas com id ‘my-Canvas’ não encontrado!");
    }

    const session = await cameraKit.createSession({
      liveRenderTarget: canvas,
    });

    // Tratamento de erros da sessão
    session.events.addEventListener("error", (event) => {
      console.error("Erro na sessão:", event.detail.error);
      if (event.detail.error.name === "LensExecutionError") {
        alert("Erro na Lens! Tente recarregar a página.");
      }
    });

    // Captura de vídeo da câmera frontal
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });

    const source = createMediaStreamSource(stream, {
      transform: Transform2D.MirrorX,
      cameraType: "user",
    });

    await session.setSource(source);

    // Carrega e aplica a Lens
    const lens = await cameraKit.lensRepository.loadLens(
      VITE_CAMERAKIT_LENS_ID,
      VITE_CAMERAKIT_LENS_GROUP_ID
    );

    await session.applyLens(lens);
    await session.play();

    console.log("Lens ativada com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
  }
})();
