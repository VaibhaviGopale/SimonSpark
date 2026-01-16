let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScoreEl = document.querySelector("#highScore");
let restartBtn = document.querySelector("#restart");

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerText = `High Score: ${highScore}`;

const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  wrong: new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3")
};

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

restartBtn.addEventListener("click", () => {
  reset();
  h2.innerText = "Press any key or tap to start";
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  sounds[btn.id].play();
  setTimeout(() => btn.classList.remove("gameflash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  sounds[btn.id].play();
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    sounds.wrong.play();

    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      highScoreEl.innerText = `High Score: ${highScore}`;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key or tap to start.`;
    document.body.style.backgroundColor = "red";

    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 300);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
