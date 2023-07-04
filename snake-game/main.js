const canvas=document.getElementById("canvas")
const pen=canvas.getContext("2d");
pen.shadowColor = "red";
pen.shadowBlur = 15;//food including the snake has a shadow around them. even the text score.
//console.log(pen); it will return an object having some values.
pen.fillStyle="red"//changing the default black pen color to red
const cs=67//cell size
const W=1200//width
const H=600//height
let food=null
let count=0;
class Snake{
    constructor(){
        this.init_len=5
        this.direction="right"//from the beginning, it will start moving to right direction
        this.cells=[]//a snake consists of many small cells. so it is representing each cells.individually. the cell number will increase if it eat food.
    }
    createSnake(){//it will push in the empty array called cells.
        for(let i=0;i<this.init_len;i++){
            this.cells.push({//it is pushing the coordinate values to the array cells.
                x:i,
                y:0//initial values
            })
        }
    }
    drawSnake(){
for(let i=0;i<this.cells.length;i++){
const cell=this.cells[i]
if(i===this.cells.length-1){//last cell is head or yellowish
    pen.fillStyle="yellow"
}else{//all other cells are red
    pen.fillStyle="red"   
}
pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2)//it takes 4 arguments. x coordinate first. second one is y coordinate. 3rd=width and the last one is height. it will draw a 
//rectangle inside the canvas area.values of x is 1,2,3,4.....
}
    }
    updateSnake(){
        const headX=this.cells[this.cells.length-1].x//storing the x coordinate of the last element
        const headY=this.cells[this.cells.length-1].y
        let nextX=headX+1//we are moving the head to front cell.do not use const.
        let nextY=headY
        if(food.x===headX && food.y===headY){//if food coordinate and head coordinate matches.if both are overlapping. what to do?
food=randomFood()//for consuming food. previously the value of the global variable food was null but here the function is called to get random or set coordinates.
//once it is overlapped, another food should be generated somewhere else.
count++//our score will increase also
        }else{
            this.cells.shift()//this will increase the size of the snake after consuming food.
        }
		//check lgao body ke saath collision
		for(let i=0;i<this.cells.length-1;i++){
			const cell=this.cells[i];
			if(cell.x===headX && cell.y===headY){
				gameOver();
				return;
			}
			
		}
        if(this.direction==="left"){
            nextX=headX-1//head will be shifted backword
            nextY=headY
            if(nextX*cs<0){//once it touches the left margin of the area or canvas, we are stopping the game loop.
                gameOver()
            }
        }
        else if(this.direction==="up"){
            nextX=headX
            nextY=headY-1
            if(nextY*cs<0){
                gameOver()
            }
        }
        else if(this.direction==="down"){
            nextX=headX
            nextY=headY+1
            if(nextY*cs>H){
                gameOver()
            }
        }
        else if(this.direction==="right"){
            nextX=headX+1
            nextY=headY
            if(nextX*cs>W){
                gameOver()
            }
        }
        this.cells.push({//this is pushing the head
            x:nextX,
            y:nextY//updated and pushed in array
        })
    }
    changeDirection(direction){
        this.direction=direction
    }
}
const snake=new Snake()//creating an object
//console.log(snake);
//initialization of game
//let init_x=10
//let init_y=20

function init(){
    //pen.fillRect(init_x,init_y,67,67)//default color is black, first two is the starting coordinate and next two are width,height
    snake.createSnake()//push i nthe array console.log(snake)
    snake.drawSnake()
    food=randomFood()
	//console.log(food);
    function keypressed(e){//take arrow key instructions and input
if(e.key==="ArrowLeft"){
    snake.changeDirection("left")
}
else if(e.key==="ArrowRight"){
    snake.changeDirection("right")
}
else if(e.key==="ArrowUp"){
    snake.changeDirection("up")
}
else if(e.key==="ArrowDown"){
    snake.changeDirection("down")
}
    }
    document.addEventListener("keydown",keypressed)
}
//this will draw the updated game

function draw(){// if you updated the value but haven't drawn, what will be the point???!!!!!!!!haha
    //pen.clearRect(0,0,1200,600)//clear previous rectangles
    //pen.fillRect(init_x,init_y,20,20)
    pen.clearRect(0,0,W,H)//it will remove the previous position. otherwise it will not move forward. start from 0,0 coordinate and clean everything in betwwn what comes
	//in height and width. total height and width coordinate is the finishing or ending point.
	
    pen.fillStyle="red"
    pen.font="bold 40px sans-serif"
    pen.fillText(`Score:${count}`,30,30) //here 30,30 are the coordinates where to show the text
    pen.fillRect(food.x*cs,food.y*cs,cs,cs)
    pen.fillStyle="yellow"
    snake.drawSnake();
	
}

//this will update different  value properties of the snake
function update(){
    snake.updateSnake()
//init_x=init_x+10. this will update the initial x coordinate and it will increase it by 10.
}
//game loop. this function will continuously call two functions sequentially to run the game continuously. first we have to update and then only draw.
function gameLoop(){
    update();
    draw();
	//console.log("game updated and drawn");
}
function randomFood(){
    const foodX=Math.floor(Math.random()*(W-cs)/cs)//to generate random coordinates
    const foodY=Math.floor(Math.random()*(H-cs)/cs)//it should be multiple so that it can properly overlap
    //creating food object
    const food={
        x:foodX,
        y:foodY
    }
    return food
}
init();// here we called the init function.
const id=setInterval(gameLoop,200)//it will continuously call the function called gameLoop after 100. milisecond
function gameOver(){
    clearInterval(id)
}
//refer this page- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D