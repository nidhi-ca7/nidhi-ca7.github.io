const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");

const user = {
    x: 0,
    y: canvas.height/2 - 100/2,
    width:10,
    height:100,
    color: "White",
    score:0
}

const comp = {
    x: canvas.width-10,
    y: canvas.height/2 - 100/2,
    width:10,
    height:100,
    color: "White",
    score:0
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius:10,
    speed:5,
    velocityX:5,
    velocityY:5,
    color:"white"

}

const net = {
    x:canvas.width/2 - 2.2,
    y:0,
    width:2,
    height:10,
    color:"white"
}


function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
 

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}


function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text,x, y)
}

function drawNet(){
    for(let i=0; i<=canvas.height;i+=15){
        drawRect(net.x, net.y+i, net.width, net.height,net.color)
    }
}

function render(){
    var grd = context.createLinearGradient(0, 0, 500, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "blue");
    drawRect(0,0,canvas.width,canvas.height, grd)
    drawText(user.score,canvas.width/4, canvas.height/5, "blue");
    drawText(comp.score,3*canvas.width/4, canvas.height/5, "red");
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(comp.x,comp.y,comp.width,comp.height,comp.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
    drawNet();
    filldots();
}

function filldots(){
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          context.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(
            255 - 42.5 * j
          )})`;
          context.beginPath();
          context.arc(12.5 + j * 25, 12.5 + i * 25, 4, 0, 2 * Math.PI, true);
          context.stroke();
    }
    }
}

function game(){
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);


function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    let computerLevel = 0.1;
    comp.y += (ball.y - (comp.y + comp.height/2)) * computerLevel;
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius<0){
        ball.velocityY = -ball.velocityY;
    }
    
    let player = (ball.x + ball.radius<canvas.width/2)?user:comp;

    if(collision(ball, player)){
        //ball.velocityX = -ball.velocityX;
        let collidePoint = (ball.y =(player.y+player,height/2));
        collidePoint = collidePoint/(player.height/2);
        let angleRad = (Math.PI/4)* collidePoint;
        let direction = (ball.x + ball.radius< canvas.width/2)?1:-1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    if(ball.x - ball.radius < 0){
        comp.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }
}

function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

canvas.addEventListener("mousemove", movePaddle);
function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2; 
}
