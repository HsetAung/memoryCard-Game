let mychance = 5;
let milisecond = 41000;
let start = document.getElementById("start");
let restart = document.getElementById("restart");
//let restart = document.getElementById("restart");
let seconds = 40;
let count = document.getElementById("countTime");
let intervalID;
score = 0;
var colorLists = [
  "red",
  "green",
  "blue",
  "orange",
  "yellow"

];

let board = [];
let row;
let rows = 2;
let colums = 5;
let colorSet;
let clickCard1;
let clickCard2;

let gameOver = false;

document.getElementById("error").innerHTML = mychance;
document.getElementById("Score").innerHTML = score;


start.addEventListener("click", view);
document.getElementById("board").innerHTML = "MEMOERY GAME... ";
/**
 * game state which is include all of functions
 */
function view() {
  document.getElementById("start").disabled = true; //after clicked start btn will disable
  document.getElementById("board").innerHTML = "";
  document.getElementById("error").innerHTML = mychance;
  document.getElementById("Score").innerHTML = score;
  shuffle();
  startGame();
}

/**
 * this function is used for auto shuffleing two colorList Array of porperties
 */
function shuffle() {
 
  colorSet = colorLists.concat(colorLists);
  console.log(colorSet);
  if (gameOver == false) {
  //shuffle
  for (let i = 0; i < colorSet.length; i++) {
    let j = Math.floor(Math.random() * colorSet.length);

    let equal = colorSet[i];
    colorSet[i] = colorSet[j];
    colorSet[j] = equal;
  }
  console.log(colorSet);
}
}
/**
 * this fucnction is used for game start
 *
 */

function startGame() {
 
  if (gameOver == false) {
   
    for (let r = 0; r < rows; r++) {
       row = [];
      for (let c = 0; c < colums; c++) {
        let colorImg = colorSet.pop();
        row.push(colorImg); //colorSet of elements move to row array
        let card = document.createElement("img");
        card.id = r.toString() + "-" + c.toString(); //building id for card
        card.src = colorImg + ".jpg"; // img of src
        card.classList.add("card");

        card.addEventListener("click", clickCard);
        document.getElementById("board").append(card);
      }

      board.push(row); //row array add in board
    }
    console.log(board);
    setTimeout(cover, 6000);
  }
}
/**
 * front side of cards
 */
function cover() {
  if (gameOver == false) {
    setTimeout(end, milisecond);
    let secMinus = () => {
      //this function is used for when 1s, decrease 1s from 40s
      seconds -= 1;
      count.innerHTML = seconds;
     
    };

    intervalID = setInterval(secMinus, 1000);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < colums; c++) {
        let coverCard = document.getElementById(
          r.toString() + "-" + c.toString()
        );
        coverCard.src = "cover.jpg";
      }
    }
  }
}
/**
 * clikcard1 and 2 of process
 */
function clickCard() {
  if (gameOver == false) {
    if (this.src.includes("cover")) {
      if (!clickCard1) {
        clickCard1 = this;
        let rc = clickCard1.id.split("-"); //"0,1" => [0-1]
        let r = Number(rc[0]); //row index of card1
        let c = Number(rc[1]); //col index of card1
        clickCard1.src = board[r][c] + ".jpg";
      } else if (!clickCard2 && clickCard1 != clickCard2) {
        clickCard2 = this;
        let rc = clickCard2.id.split("-"); //"0,1" => [0-1]
        let r = Number(rc[0]);
        let c = Number(rc[1]);
        clickCard2.src = board[r][c] + ".jpg";
      }
     
    } 
    
    
    setTimeout(() => {
   
    //if card1 and 2 are same score++
    if (clickCard1.src === clickCard2.src && 
      clickCard1.src!= "cover.jpg" &&
       clickCard2.src!= "cover.jpg" 
      ) {
      score+=2;
      console.log("clickCard1.src",clickCard1.src,"clickCard2.src",clickCard2.src)
      console.log(score);
      document.getElementById("Score").innerHTML = score;
       //if score values get 10 =>WIN
      if (score === 10) {
        clearTimeout(end, milisecond);
        gameOver = true;
        clearInterval(intervalID);
        document.getElementById("win").innerHTML = "YOU ARE WIN!";
        document.getElementById("win").style.color = "green";
      }
    }
   
    
    }, 500);
   
  }
  update()
}

/**
 * if card1 and 2 are not same goback to front side during 1s
 *
 */
function update() {
  setTimeout(() => {
    if (clickCard1.src != clickCard2.src) {
      clickCard1.src = "cover.jpg";
      clickCard2.src = "cover.jpg";
      mychance--;

      document.getElementById("error").innerHTML = mychance; //chance times--

      if (mychance === 0) {
        gameOver = true;
        clearInterval(intervalID); // if return true count time is going to break
        document.getElementById("win").innerHTML = "YOU LOSE, Try Again...";
        document.getElementById("win").style.color = "red";
      }
    }

    clickCard1 = null;
    clickCard2 = null;
  }, 500);
}
/**
 * retrun true
 * time up or Win
 * break count time
 */
function end() {
  if (milisecond === 41000 || seconds === 0) {
    gameOver = true;
    clearInterval(intervalID);
    document.getElementById("win").innerHTML = "TIME UP, Try Again...";
    document.getElementById("win").style.color = "red";
  }
  if (score === 10) {
    gameOver = true;
    clearInterval(intervalID);
    document.getElementById("win").innerHTML = "YOU ARE WIN!";
    document.getElementById("win").style.color = "green";
  }
}

/**
 * restart.addEventListener("click", reboot);

function reboot() {
  document.getElementById("start").disabled = false;
  count.innerHTML = "";

  gameOver = false;
  milisecond = 41000;
  seconds = 40;
  mychance = 5;
  score = 0;

  document.getElementById("error").innerHTML = mychance;
  document.getElementById("Score").innerHTML = score;
  document.getElementById("win").innerHTML = "";

  clearInterval(intervalID);
  document.getElementById("board").innerHTML = "";
  board = [];

  start.addEventListener("click", view);
  intervalID = setInterval(() => {
     clearInterval(intervalID);
    seconds -= 1;
    count.innerHTML = seconds;
    if (seconds === 0) {
      gameOver = true;
      clearInterval(intervalID);
      document.getElementById("win").innerHTML = "TIME UP, Try Again...";
      document.getElementById("win").style.color = "red";
    }
  }, 1000);
}
 */