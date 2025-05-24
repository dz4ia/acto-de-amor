window.addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio.paused) {
    audio.play();
  }
});



const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const phrase = "TE AMO";
const fontSize = 24;
ctx.font = fontSize + "px monospace";

// Generar estrellas
const starCount = 200;
const stars = [];

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random()
  });
}

// Crear palabras en columnas
const columns = Math.floor(canvas.width / (ctx.measureText(phrase).width + 20));
const words = [];

for (let i = 0; i < columns; i++) {
  words.push({
    text: phrase,
    x: i * (ctx.measureText(phrase).width + 20),
    y: Math.random() * -canvas.height,
    speed: 2 + Math.random() * 3
  });
}

function drawStars() {
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
  }
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();

  ctx.fillStyle = "#0000ff";
  ctx.font = fontSize + "px monospace";

  for (let w of words) {
    ctx.fillText(w.text, w.x, w.y);
    w.y += w.speed;

    if (w.y > canvas.height) {
      w.y = -fontSize * 2;
    }
  }
 
  requestAnimationFrame(draw);
}

draw();
