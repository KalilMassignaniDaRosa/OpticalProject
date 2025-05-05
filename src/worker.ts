self.addEventListener('message', (e) => {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 640;
  canvas.height = 480;
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
  }
  
  draw();
});