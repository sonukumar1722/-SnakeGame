let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 15 }];
food = { x: 15, y: 12 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x > 19 ||
    snake[0].x <= 0 ||
    snake[0].y > 19 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

// Game Engine
function gameEngine() {
  // Part 1. Updating the food and Snake Array
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any key to play again.");
    snakeArr = [{ x: 15, y: 12 }];
    musicSound.play();
    score = 0;
  }

  //   If snake has eaten the food, increase the score and regenerate the food
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highscoreBox.innerHTML = "Highscore:" + hiscoreval;
    }
    scoreBox.innerHTML = "Score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 18;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //distructuring object
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display the snake and food
  //Display the snake
  box.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    // Start game position
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakebody");
    }
    box.appendChild(snakeElement);
  });
  //Display the food
  foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  box.appendChild(foodElement);
}

// Main logic
// musicSound.play();
hiscore = localStorage.getItem("hiscore");
if (hiscore == null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  highscoreBox.innerHTML = "Highscore:" + hiscore;
}

// Listining the keys pressed in keyboard
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start game position
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log(e.key);
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log(e.key);
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log(e.key);
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log(e.key);
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

// Listining keys for mobile version
document.getElementById("up").addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});
document.getElementById("down").addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});
document.getElementById("left").addEventListener("click", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});
document.getElementById("right").addEventListener("click", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});
