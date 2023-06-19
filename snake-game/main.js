const canvas=document.getElementById("canvas")
const pen=canvas.getContext("2d")
pen.fillStyle="red"//changing the default black pen color to red
const cs=67//cell size
const W=1200//width
const H=600//height
let food=null
let count=0
class Snake{
    constructor(){
        this.init_len=5
        this.direction="right"
        this.cells=[]
    }
    createSnake(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x:i,
                y:0//initial values
            })
        }
    }
    drawSnake(){
for(let i=0;i<this.cells.length;i++){
const cell=this.cells[i]
if(i===this.cells.length-1){
    pen.fillStyle="yellow"
}else{
    pen.fillStyle="red"   
}
pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2)
}
    }
    updateSnake(){
        const headX=this.cells[this.cells.length-1].x
        const headY=this.cells[this.cells.length-1].y
        let nextX=headX+1
        let nextY=headY
        if(food.x===headX && food.y===headY){
food=randomFood()//for consuming food
count++
        }else{
            this.cells.shift()//to remove a cell from the head
        }
        if(this.direction==="left"){
            nextX=headX-1
            nextY=headY
            if(nextX*cs<0){
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
        this.cells.push({
            x:nextX,
            y:nextY//updated and pushed in array
        })
    }
    changeDirection(direction){
        this.direction=direction
    }
}
const snake=new Snake()//creating an object
//initialization of game
//let init_x=10
//let init_y=20
function init(){
    //pen.fillRect(init_x,init_y,67,67)//default color is black, first two is the starting coordinate and next two are width,height
    snake.createSnake()//push i nthe array console.log(snake)
    snake.drawSnake()
    food=randomFood()
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
function draw(){
    //pen.clearRect(0,0,1200,600)//clear previous rectangles
    //pen.fillRect(init_x,init_y,20,20)
    pen.clearRect(0,0,W,H)
    pen.fillStyle="red"
    pen.font="40px sans-serif"
    pen.fillText(`Score:${count}`,30,30)
    pen.fillRect(food.x*cs,food.y*cs,cs,cs)
    pen.fillStyle="yellow"
    snake.drawSnake()
}
//this will update the value
function update(){
    snake.updateSnake()
//init_x=init_x+10
}
//game loop
function gameLoop(){
    update()
    draw()
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
init()
const id=setInterval(gameLoop,200)//it will continuously call the function after 100
function gameOver(){
    clearInterval(id)
}