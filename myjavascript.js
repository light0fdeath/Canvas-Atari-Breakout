var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var br = 13;
var cw = canvas.width;
var ch = canvas.height;

var x = cw/4;
var y = ch-30;

var dx = 2;
var dy = -2;

var pw=90;
var ph=13;
var paddleX = (cw-pw)/2;
var rightPressed = false;
var leftPressed  = false;

var name = prompt("Please Enter your name", "");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var score = 0;

function drawscore(){
    ctx.font = "21px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("Score: "+score, 20, 25);
}

var lives = 3;

function drawlives(){
    ctx.font = "21px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("Lives: "+lives, cw-95, 25);
}


var brickRowcount = 3;
var brickColcount = 5;
var brickWidth = 85;
var brickHeight = 25;
var brickPadding = 40;
var brickOffsettop = 30;
var brickOffsetleft = 25;

var bricks = [];
for(i=0; i<brickColcount; i++){
    bricks[i]=[];
    for(j=0; j<brickRowcount; j++){
        bricks[i][j]= { x: 0 , y: 0, status: 1};
    }
}

function drawBricks(){
    for(i=0; i<brickColcount; i++){
        for(j=0; j<brickRowcount; j++){
            if(bricks[i][j].status == 1){
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetleft;
            var brickY = (j*(brickHeight+brickPadding))+brickOffsettop;
            bricks[i][j].x=brickX;
            bricks[i][j].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY+10, brickWidth, brickHeight);
            ctx.fillStyle = "#E1F5FE";
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}


function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed=true;
    }
    else if(e.keyCode == 37){
        leftPressed=true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed=false;
    }
    else if(e.keyCode == 37){
        leftPressed=false;      
    }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX-canvas.offsetLeft;
    if(relativeX > 0 && relativeX < cw){
        paddleX = relativeX - pw/2;
    }
}

function collisionDetection(){
    for(i=0; i<brickColcount; i++){
        for(j=0; j<brickRowcount; j++){
            var b = bricks[i][j];
            if(b.status == 1){
            if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                dy = -dy;
                b.status = 0;
                score++;

                if(score==15){
                    alert("Congrats "+ name +" "+ " You won");
                    document.location.reload();
                }
            }
            }
        }
    }
}

function drawpaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, ch-ph, pw, ph);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawball(){
    ctx.beginPath();
    ctx.arc(x, y, br, 0, Math.PI*2, false);
    ctx.fillStyle = "#A0FA3A";
    ctx.fill();
    ctx.closePath();

}
    
function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawball();
    drawpaddle();
    drawBricks();
    drawscore();  
    drawlives(); 
    collisionDetection();
   
    if(x+dx > cw-br || x+dx < br){
        dx = -dx;
    }
    if(y+dy < br){
        dy = -dy;
    }
    else if (y+dy > ch-br){
        if(x>paddleX && x<paddleX+pw){
            dy = -dy;
        }
        else{
            lives--;
            if(!lives){
                alert("Game over "+ name + ". Better Luck Next time.");
                document.location.reload();
            }
            else {
                x = cw/2;
                y = ch-30;
                dx = 3;
                dy = -3;
                paddleX = (cw-pw)/2;
                }
        }
    }
    if(rightPressed && paddleX < cw-pw) {
            paddleX += 7;
        }
    else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        
    x += dx;
    y += dy;
}

setInterval(draw, 10);
