const startButton = document.querySelector('.start-btn');
const resetButton = document.querySelector('.reset-btn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const levelBoard = document.querySelector('.level');
const hitsSound = document.querySelector('.hits-sound');
let lastHole;
let timeUp = false;
let score = +localStorage.getItem('score') || 0;
let level = +localStorage.getItem('level') || 1; 
let clicksCount = 0;


function randomTime (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function randomHole (holes) {
  let randIndex = Math.floor(Math.random() * holes.length);
  let hole = holes[randIndex];
  if (hole === lastHole) {
    return randomHole(holes);
  } 
  lastHole = hole;
  return hole;
}


function molesAction (lvl) {
  function randomLevelTime (level) {
    if (level === 1) {
      return randomTime(300, 1200);
    } else if (level === 2) {
      return randomTime(300, 900);
    } else if (level === 3) {
      return randomTime(300, 700);
    } else if (level === 4) {
      return randomTime(350, 600);
    } else if (level === 5) {
      return randomTime(300, 550);
    } else {
      console.log('level error');
      return 100;
    } 
  };

  function changeLevel (lvl) {

    if (lvl < 4) {
      return lvl + 1;
    } else if (lvl === 4) {
      alert ('Соберись! сейчас начнется последний уровень');
      return lvl + 1;
    } else if (lvl == 5) {
      alert (`Игра окончена. Ваш счёт: ${score}`);
      localStorage.clear();
      score = 0;
      scoreBoard.textContent = score;
      return 1;
    } else {
      return console.log('uncorrect level');
    }
  }

  let time = randomLevelTime(level);
  let hole = randomHole(holes);
  hole.classList.add('active');
  setTimeout( () => {
    hole.classList.remove('active');
    if (timeUp === false) {
      molesAction(lvl);
    } else if (timeUp === true) {
      level = changeLevel(lvl);
      levelBoard.textContent = level;
      localStorage.level = level.toString();
      localStorage.score = score.toString();
    }
  }, time);
}

function startGame () {
  timeUp = false;
  setTimeout(() => { timeUp = true; }, 10000);
  clicksCount = 0;
  if (level === 1) {
    localStorage.setItem('level', 1);
    localStorage.setItem('score', 0);
    molesAction(level);
  } else {
    molesAction(level);
  }
}

function hit (event) {
  hitsSound.play();
  ++score;
  scoreBoard.textContent = score;
  this.parentNode.classList.remove('active');
}

scoreBoard.textContent = score;
levelBoard.textContent = level;

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', () => {
  localStorage.clear();
  level = 1;
  score = 0;
  scoreBoard.textContent = score;
  levelBoard.textContent = level;
});
moles.forEach( (mole) => {mole.addEventListener('click', hit)} );
