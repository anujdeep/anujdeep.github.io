const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images
const ground = new Image();
ground.src="grass4.png";
ground.width=608;
ground.height=608;

const foodImg = new Image();
foodImg.src = "beetle.svg";
foodImg.width=32;
foodImg.height=32;

const foodImg1 = new Image();
foodImg1.src = "fly.svg";
foodImg1.width=32;
foodImg1.height=32;

const foodImg2 = new Image();
foodImg2.src = "ladybug.svg";
foodImg2.width=32;
foodImg2.height=32;

//create the snake
//it is an array of objects
var snake = [];
snake[0] = {

    x : 5 * box,
    y : 5 * box
};

//create the food

let food = {

  x : Math.floor(Math.random()*17%16+2) * box,
  y : Math.floor(Math.random() * 15%14 + 3) * box
};

//create the score var

let score=0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
  if(event.keyCode == 37 && d!="RIGHT"){
      d="LEFT";
  }
  else if(event.keyCode == 38 && d!="DOWN"){
      d="UP";
  }
  else if(event.keyCode == 39  && d!="LEFT"){
      d="RIGHT";
  }
  else if(event.keyCode == 40 && d!="UP"){
      d="DOWN";
  }

}
//check collision function

// function collision(head,array){
// for(let i=0;i<array.length;i++){
//   if(head.x==array[i].x && head.y==array[i].y )
//   return true;
// }
//   return false;
// }

//draw everything to canvas

var col=["red","hotpink","violet","salmon","orange","teal","aqua","blue","olive","white"];

function draw(){
    ctx.drawImage(ground,0,0);
    for( var i = 0; i < snake.length ; i++){
        ctx.fillStyle =  (i == 0) ? col[Math.floor(Math.random()*10)%9] : "aqua";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    if(food.x % 3 ==0)
    ctx.drawImage(foodImg, food.x ,food.y);
    else if (food.x % 3 ==1) {
      ctx.drawImage(foodImg1, food.x ,food.y);
    }
    else {
      ctx.drawImage(foodImg2, food.x ,food.y);
    }

    //old head position
     let snakeX = snake[0].x;
    let snakeY = snake[0].y;

     //remove the tail
  //  snake.pop();
    //
    // //which direction
     if(d=="LEFT")snakeX-=box;
     if(d=="RIGHT")snakeX+=box;
     if(d=="UP")snakeY-=box;
     if(d=="DOWN")snakeY+=box;


     // add new Head

     let newHead = {

         x : snakeX,

         y : snakeY

     }

     snake.unshift(newHead);

     // if the snake eats the food

    if(snakeX == food.x && snakeY == food.y){

        score++;

        //eat.play();

        food = {

            x : Math.floor(Math.random()*17%16+2) * box,

            y : Math.floor(Math.random()*15%14+3) * box

        }

        // we don't remove the tail

    }else{

        // remove the tail

        snake.pop();

    }


    ctx.fillStyle = "white";

    ctx.font = "35px Changa one";

    ctx.fillText(score,0.5*box,1.0*box);



    // game over



    if(snakeX == 0 || snakeX >18 * box || snakeY < 1*box || snakeY == 18*box || collision(newHead,snake)){

        alert("GAME OVER");
        clearInterval(game);

      //  dead.play();

    }

}

//call draw function every 200ms
var game = setInterval(draw,200);
