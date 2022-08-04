//Global Variables
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

let maxHealth = 3;

const player = {
    x: 200,
    y: 300,
    width: 32, //need better image
    height: 48, //need better image
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const stormTrooper = {
    x: 750,
    y: 250,
    width: 32, //need better image
    height: 48, //need better image
    frameX: 0,
    frameY: 1,
    speed: 9,
    moving: false
};

class Projectile{
    constructor({position}){
        this.position = stormTrooper.x
    }
}

let fps, fpsInterval, startTime, now, then, elapsed;

const playerSprite = new Image();
playerSprite.src = "jedi.png";

const stormTrooperSprite = new Image ()
stormTrooperSprite.src = "stormtrooper.png"

const background = new Image();
background.src = "background.png";



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer(){
    if (keys[38] && player.y > 100){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[39] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
}

function moveStormTrooper(){}

function handlePlayerFrame(){ //needs adjustment
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
} 

function startAnimation(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        drawSprite(stormTrooperSprite, stormTrooper.width * stormTrooper.frameX, stormTrooper.height * stormTrooper.frameY, stormTrooper.width, stormTrooper.height, stormTrooper.x, stormTrooper.y, stormTrooper.width, stormTrooper.height); //player.x & player.y = start
        movePlayer();
        handlePlayerFrame();
    }
}
startAnimation(25);




 /* new Projectile({
        position: {
        x:775, //start position on right side
        y:250,
    },
    velocity:{
        x:-5, 
        y:0
    }
})*/