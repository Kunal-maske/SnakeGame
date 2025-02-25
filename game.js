//const and vars
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameOver.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

//functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  // console.log(ctime)
  lastPaintTime = ctime;

  gameEngine();
}

function isColide(snake){
  // return false
  //if bumped in urself
  for (let i=1; i<snakeArr.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true
    }
  }

  //if bumped into wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
    return true
  }
}

function gameEngine() {
  //p1 :snake update snake array and food

  if(isColide(snakeArr)){
    gameOverSound.play()
    musicSound.pause()
    inputDir = {x:0,y:0}
    alert('Game Over! Press any key to play again');
    snakeArr = [{x:13,y:15}]
    musicSound.play();
    score = 0
  }

  

  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play()
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
    let a = 2;
    let b = 16;
    food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
  }

  //moving snake
  for (let  i = snakeArr.length - 2;  i>=0; i--) {
    // const element = array[i];
    snakeArr[i+1]={...snakeArr[i]}
    
  }
  snakeArr[0].x += inputDir.x
  snakeArr[0].y += inputDir.y


  //p2: display snake and food

  //snake
  board = document.querySelector(".board");
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}








//logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
        // console.log(1)
        inputDir.x = 0;
        inputDir.y = -1;

      break;

    case "ArrowDown":
        // console.log(2)
        inputDir.x = 0 ;
        inputDir.y = 1 ;
      break;

    case "ArrowLeft":
        // console.log(3)
        inputDir.x = -1 ;
        inputDir.y = 0 ;
      break;

    case "ArrowRight":
        // console.log(4)
        inputDir.x = 1 ;
        inputDir.y = 0 ;
      break;

    default:
      break;
  }
});
