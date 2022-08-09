const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const button = document.getElementById("startButton");
const twitter = document.getElementById("twitter");
let lastHole;
let timeUp = false;
let score = 0;
let gameTime = 30000; // 30 seconds
const music = document.getElementById("music");
const chop = document.getElementById("chop");
let hashtag = "UffImInTrouble";
let siteEncoding = "%20https%3A%2F%2Fwhack-an-mp.netlify.app%2F";
music.volume = 0.3;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  //prevent same hole from getting the same number
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500, 1200); //get a random time to determine how long mole should peep
  const hole = randomHole(holes); //get the random hole from the randomHole function
  hole.classList.add("up"); //add the CSS class so selected mole can "pop up"
  setTimeout(() => {
    hole.classList.remove("up"); //make the selected mole "pop down" after a random time
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  twitter.classList.remove("show");
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  music.play();
  button.setAttribute("disabled", true);
  peep();
  setTimeout(() => {
    timeUp = true;
    music.pause();
    music.currentTime = 0;
    button.removeAttribute("disabled");
    twitter.classList.add("show");

    let singleWhack = `https://twitter.com/intent/tweet?text=I%20managed%201%20whack%21%20How%20many%20times%20can%20you%20whack%20an%20MP%3F%20%23${hashtag}${siteEncoding}`;
    let nonOneWhacks = `https://twitter.com/intent/tweet?text=I%20managed%20${score}%20whacks%21%20How%20many%20times%20can%20you%20whack%20an%20MP%3F%20%23${hashtag}${siteEncoding}`;

    if (score == 1) {
      twitter.setAttribute("href", singleWhack);
    } else {
      twitter.setAttribute("href", nonOneWhacks);
    }

    window.scrollTo(0, document.body.scrollHeight);
  }, gameTime);
}

function wack(e) {
  chop.pause();
  chop.currentTime = 0;
  if (!e.isTrusted) return; //** new thing I learned */
  score++;
  this.parentNode.classList.remove("up"); //this refers to item clicked
  scoreBoard.textContent = score;
  chop.play();
}

moles.forEach((mole) => mole.addEventListener("click", wack));
