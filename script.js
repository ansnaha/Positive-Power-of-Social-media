const quotes = [
  "🌟 You’re amazing, keep shining!",
  "💪 Every day is a fresh start!",
  "✨ Your smile can change someone’s day!",
  "🌈 Positivity looks good on you!",
  "🚀 Keep going, you’re unstoppable!",
  "😊 Believe in yourself!",
  "💖 Spread kindness wherever you go!",
  "🎉 You just made the world a bit brighter!"
];

function showQuote() {
  const userAnswer = document.getElementById("userAnswer").value;
  if (userAnswer.trim() === "") {
    alert("Please answer the question first!");
    return;
  }

  // Show random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteElement = document.getElementById("quote");
  quoteElement.innerText = randomQuote;
  quoteElement.style.opacity = 1;
  quoteElement.style.animation = 'pop 0.5s ease forwards';

  // Clear input
  document.getElementById("userAnswer").value = "";

  // Trigger confetti
  launchConfetti();
}

/* Simple confetti animation */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 100;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }

  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
      ctx.stroke();
    });

    update();
  }

  function update() {
    angle += 0.01;
    confetti.forEach(c => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  let animation = setInterval(draw, 20);
  setTimeout(() => clearInterval(animation), 3000); // Stop after 3 seconds
}
