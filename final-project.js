const canvas = document.getElementById("stadium");
const context = canvas.getContext("2d");

const user = {
    x: 450,
    y: 30,
    width:10,
    height:100,
    color: "White",
    score:0
}


const comp = {
    x: 10,
    y: canvas.height/2,
    width:30,
    height:20,
    color: "blue"
}

const obstacle1 = {
    x: 300,
    y: canvas.height-230,
    width:20,
    height:200,
    color: "red"
}

const obstacle2 = {
    x: 200,
    y: 0,
    width:20,
    height:180,
    color: "green"
}

const obstacle3 = {
    x: 400,
    y: 70,
    width:20,
    height:200,
    color: "yellow"
}

const obstacle4 = {
    x: 475,
    y: canvas.height-200,
    width:20,
    height:200,
    color: "pink"
}

const obstacle5 = {
    x: 100,
    y: canvas.height-200,
    width:20,
    height:150,
    color: "purple"
}

let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5]
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
 
function render(){
    //draw canvas
    drawRect(0,0,canvas.width,canvas.height, "gray")

    //draw moving object
    drawRect(comp.x,comp.y,comp.width,comp.height, comp.color)

    //draw obstacles
    for(var i=0;i<obstacles.length;i++){
        var obstacle = obstacles[i];
        drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height, obstacle.color)
    }
    //draw score
    drawText("Score: "+user.score,user.x, user.y, "white");
}

function clear(){
    drawRect(0,0,canvas.width,canvas.height, "gray")
}

function update(){
    for(var i=0;i<obstacles.length;i++){
        var obstacle = obstacles[i];
        if(isCrashedWith(obstacle)){
            stop();
            return;
        }
    }
    if(comp.x>=canvas.width-comp.width){
        stop();
        return;
    }
    comp.x++;
    user.score = parseInt(comp.x/10);
}

function game(){
    clear();
    update();
    render();
}

render();

const framePerSecond = 50;
let timer 
function init(){
    stop();
    comp.x=10;
    timer = setInterval(game, 1000/framePerSecond);
}

function stop(){
    clearInterval(timer);
}

function isCrashedWith(obstacle){
    var left = comp.x;
    var right = comp.x + comp.width;
    var top = comp.y;
    var bottom = comp.y+comp.height;

    var oleft = obstacle.x;
    var oright = obstacle.x + obstacle.width;
    var otop = obstacle.y;
    var obottom = obstacle.y+obstacle.height;

    var crash = true;

    if ((bottom < otop) || (top > obottom) || (right < oleft) || (left > oright)) {  
        crash = false;  
    }  
    return crash;
}

function moveup() {  
    comp.y -= 10;       
}  
  
function movedown() {  
    comp.y += 10;  
}

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft"){
       //alert("Left key");
    } else if (event.key == "ArrowUp"){
        moveup();
    } else if (event.key == "ArrowRight"){
       //alert("Right key");
    } else if (event.key == "ArrowDown"){
        movedown();
    }
 });

 function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "25px fantasy";
    context.fillText(text,x, y)
}
