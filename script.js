const pump = document.getElementById("pump");
const balloon = document.getElementById("balloon");
const letter = document.getElementById("letter");

let balloonSize = 50;
let inflated = false;
let flying = false;
let animationFrameId = null;
let scale = 1;
let currentImage = -1;
const balloonImages = [
  "Symbol 100001.png",
  "Symbol 100002.png",
  "Symbol 100003.png",
  "Symbol 100004.png",
  "Symbol 100005.png",
  "Symbol 100006.png",
  "Symbol 100007.png",
  "Symbol 100008.png",
  "Symbol 100009.png",
  "Symbol 100010.png",
];
const letterImages = [
  "Symbol 10001.png",
  "Symbol 10002.png",
  "Symbol 10003.png",
  "Symbol 10004.png",
  "Symbol 10005.png",
  "Symbol 10006.png",
  "Symbol 10007.png",
  "Symbol 10008.png",
  "Symbol 10009.png",
  "Symbol 10010.png",
  "Symbol 10011.png",
  "Symbol 10012.png",
  "Symbol 10013.png",
  "Symbol 10014.png",
  "Symbol 10015.png",
  "Symbol 10016.png",
  "Symbol 10017.png",
  "Symbol 10018.png",
  "Symbol 10019.png",
  "Symbol 10020.png",
];
let angle = Math.random() * 360;
let radius = 2;

pickNewBalloon();

pumphandle.addEventListener("click", () => {
  if (inflated || flying) return;

  if (scale < 3.5) {
    scale += 0.7;
    balloon.style.transform = `translateX(-50%) scale(${scale})`;
    letter.style.transform = `translateX(-50%) scale(${scale})`;
  }

  if (scale >= 3.5) {
    inflated = true;
    startFlying();
    moveBalloon();
  }
});

function pickNewBalloon() {
  currentImage = Math.floor(Math.random() * balloonImages.length);
  balloon.src = balloonImages[currentImage];
  const letterIndex = Math.floor(Math.random() * letterImages.length);
  letter.src = letterImages[letterIndex];

  balloonSize = 50;
  balloon.style.width = `${balloonSize}px`;
  balloon.style.height = `${balloonSize}px`;
  inflated = false;
  flying = false;
}

// Start flying
function startFlying() {
  flying = true;

  let posX = balloon.offsetLeft;
  let posY = balloon.offsetTop;
  let pos1X = letter.offsetLeft;
  let pos1Y = letter.offsetTop;
  let speed = 1; // overall flying speed

  function animate() {
    if (!flying) return;

    angle += (Math.random() - 0.5) * 10;

    posX += speed * Math.cos((angle * Math.PI) / 180);
    posY += speed * Math.sin((angle * Math.PI) / 180);

    pos1X += speed * Math.cos((angle * Math.PI) / 180);
    pos1Y += speed * Math.sin((angle * Math.PI) / 180);

    if (posX <= 0 || posX >= window.innerWidth - balloon.offsetWidth) {
      angle = 180 - angle;
    }
    if (posY <= 0 || posY >= window.innerHeight - balloon.offsetHeight) {
      angle = 360 - angle;
    }

    if (pos1X <= 0 || posX >= window.innerWidth - letter.offsetWidth) {
      angle = 180 - angle;
    }
    if (pos1Y <= 0 || posY >= window.innerHeight - letter.offsetHeight) {
      angle = 360 - angle;
    }

    balloon.style.left = `${posX}px`;
    balloon.style.top = `${posY}px`;

    letter.style.left = `${pos1X}px`;
    letter.style.top = `${pos1Y}px`;
    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

// Burst balloon
balloon.addEventListener("click", () => {
  if (flying) {
    cancelAnimationFrame(animationFrameId); // stop flying
    balloon.src = "burst.webp"; // burst image
    flying = false;
    inflated = false;

    setTimeout(() => {
      balloon.style.display = "none";
      resetBalloon();
    }, 500);
  }
});

function resetBalloon() {
  balloon.style.display = "block";
  currentImage = Math.floor(Math.random() * balloonImages.length);
  balloon.src = balloonImages[currentImage];
  const letterIndex = Math.floor(Math.random() * letterImages.length);
  letter.src = letterImages[letterIndex];
  balloonSize = 100;
  scale = 1;
  balloon.style.left = "11.7in";
  balloon.style.top = "4.47in";
  letter.style.left = "11.7in";
  letter.style.top = "4.52in";
  balloon.style.transform = `translateX(-50%) scale(${scale})`;
  letter.style.transform = `translateX(-50%) scale(${scale})`;
  inflated = false;
  flying = false;
}

//changes
pumpContainer.addEventListener("click", () => {
  animateHandle();
});

function animateHandle() {
  const originalTop = window.getComputedStyle(pumphandle).top;

  pumphandle.style.top = `calc(${originalTop} + 50px)`;

  setTimeout(() => {
    pumphandle.style.top = originalTop;
  }, 200);
}

//changes-1
let balloonPosition = 4.47;

function moveBalloon() {
  balloonPosition += 0.1;

  const topInPixels = balloonPosition * 96;
  const balloonHeight = 100;
  const letterHeight = 30;
  balloon.style.top = `${balloonPosition}in`;
  letter.style.position = "fixed";
  letter.style.left = "11.7in";
  letter.style.top = `${topInPixels + balloonHeight / 2 - letterHeight / 2}px`;
}
