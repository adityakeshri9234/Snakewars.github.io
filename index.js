//game variables and constants
let inputDir ={x:0,y:0};
let foodSound=new Audio('food.mp3');
let gameOverSound=new Audio('gameover.mp3');
let moveSound=new Audio('move.mp3');
let musicSound=new Audio('music.mp3');
let speed=5;
let lastPainttime=0;
let snakeArr=[
    {x:13,y:15}
]
food ={x:6,y:7};
let score=0;
// game functions 
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPainttime)/1000<1/speed){
        return;
    }
    lastPainttime=ctime;
    gameEngine();
    

}
function isCollide(snake){
    //if snake collide into itself
    for(let index=1;index<snakeArr.length;index++){
        if(snake[index].x===snake[0].x && snake[index].y=== snake[0].y){
            return true;
        } 
    }
    //if snake collide to wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }

    
}

function gameEngine(){
    //update snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={ x:0,y:0};
        alert("Game Over! Press any key to start again ");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    //if you have eaten the food ,increment the score and regenerate the food
    if(snakeArr[0].y==food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML= "Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y : snakeArr[0].y +inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()) ,y: Math.round(a+(b-a)*Math.random())}
    }
    //display the snake and food
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]}

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('head');
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}




//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1; 
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1; 
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0; 
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0; 
            break;
    }
});