//-----------------------------------------Global Variables-----------------------------------------//

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const background = new Image();
background.src = "background.png";

let maxHealth = 3;

//-----------------------------------------Classes-----------------------------------------//

class Player {
    constructor() {
        this.velocity = {
            x: 40,
            y: 100
        }
        const image = new Image()
        image.src = "jedi1.png"
        image.onload = () => {
           this.image = image
           this.width = image.width / 8
           this.height = image.height / 8
           this.position = {
            x: canvas.length / 2,
            y: canvas.height / 2
        }
        }
    }

    draw() {
        if (this.image){
        
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width, 
            this.height
            )
        }
    }
    
    update() {
            if (this.image){
            this.draw()
            this.position.x = this.velocity.x
            this.position.y = this.velocity.y
    }}
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 4
    }

    draw (){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Particle {
    constructor({position, velocity, radius, color}) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
    }

    draw (){
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}

class stromTrooperProjectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.width = 4
        this.height = 10
    }

    draw (){
    
       ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
       ctx.fillstyle = "green" 
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Stormtrooper {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = "storm1.png"
        image.onload = () => {
           this.image = image
           this.width = image.width / 8
           this.height = image.height / 8
           this.position = {
            x: position.x,
            y: position.y
        }
        }

    }
    draw() {
        if (this.image){
        
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width, 
            this.height
            )
        }
    
    }
    

    update({velocity}) {
            if (this.image){
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
    }}
    shoot(stormTrooperProjectiles) {
        stormTrooperProjectiles.push(new stormTrooperProjectile({
            position: {
                x: this.position.x + this.width,
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: -5,
                y: 0
            }
        })
        )
    }

}

class Grid {
    constructor() {
        this.position = {
            x: 0, 
            y: 0  
        }
        this.velocity = {
            x: 0,
            y: -3
        }
        this.troops = []
        const columns = Math.floor(Math.random() * 4 + 1)
        const rows = Math.floor(Math.random() * 4 + 1)

        this.height = columns * 60

        for (let y = 0; y < columns; y++ ) {
            for (let x = 0; x < rows ; x++) {
            this.troops.push(new Stormtrooper({position:{
                x: 750 - x * 293 / 8,
                y: 400 - y * 410 / 8

            }
        })
        )
        }
    }
    
}
    update() {
        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y

        this.velocity.x = 0

        if(this.position.y + this.height >= canvas.height - 100 || this.position.y <= 0) {
            this.velocity.y = -this.velocity.y
            this.velocity.x = -50
        }
    }
} 

//-----------------------------------------Variables after declaring the Classes-----------------------------------------//

const player = new Player()
const projectiles = []
const grids = []
const stormTrooperProjectiles = []
const particles = []

const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

//-----------------------------------------Functions-----------------------------------------//

let frames = 0
let randomInterval = Math.floor(Math.random() * 300 + 300)
// game = {}

function createParticles ({object, color}) {                           
    for (let i = 0; i < 15; i++) {
    particles.push(
     new Particle({
     position: {
         x: stormTrooper.position.x + stormTrooper.width / 2,
         y: stormTrooper.position.y + stormTrooper.height / 2
     },
     velocity: {
         x: (Math.random() - 0.5) * 2,
         y: (Math.random() -0.5) *2
     },
     radius: Math.random() * 3,
     color: color || "#BAA0DE"
 })
 )
}}

function animate () {
    requestAnimationFrame(animate)

    ctx.fillStyle = "#d79c50"
    ctx.fillRect(0, 0, 800, 500)
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    player.update()
    particles.forEach(particle =>{
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        } else {
            particle.update()
        }
    })

    stormTrooperProjectiles.forEach((stormTrooperProjectile, index) => {
        if (stormTrooperProjectile.position.x + stormTrooperProjectile.width <= canvas.width) {
            setTimeout(() => {
                stormTrooperProjectiles.splice(index, 1)
            }, 0)
        }
        stormTrooperProjectile.update()
    })
    projectiles.forEach((projectile, index) => {
        if (projectile.position.x + projectile.radius >= 1000) {
            setTimeout(() => {
                projectiles.splice(index, 1)    
            }, 0)
            projectiles.splice(index, 1)
        } else {
            projectile.update()

            // projectile hits player
        }
        if (stormTrooperProjectiles.position.x + stormTrooperProjectiles.height >= player.position.x && 
            stormTrooperProjectiles.position.y >= player.position.y){
            ///console.log("Lost")
            setTimeout(() => {
            stormTrooperProjectiles.splice(index, 1)
            player.opacity = 0
            // game.over = true
        }, 0)
            createParticles({
                object: player,
                color: "white"
            })
            
        }
    }) 

    grids.forEach((grid, gridIndex) => {
        grid.update()
           //projectiles
     /*if (frames % 100 === 0 && grid.troops.length > 0) {
        grid.troops[Math.floor(Math.random() * grid.invaders.width)].shoot(stormTrooperProjectiles)
    }*/
        grid.troops.forEach((troops, i) =>{ 
            troops.update({velocity: grid.velocity}) 

            //projectiles hitting player

            projectiles.forEach((projectile, j) => { 
                if (
                    projectile.position.x + projectile.radius <= troops.position.x + troops.width/8 && 
                    projectile.position.x + projectile.radius >= troops.position.x - troops.width/8 //%%
                    //projectile.position.y + projectile.radius <= Stormtrooper.poition.y + Stormtrooper.height/8 && 
                    //projectile.position.y + projectile.radius >= Stormtrooper.position.y - Stormtrooper.height/8
                    ) {
                setTimeOut(() => {
                        const stormTrooperFound = grid.troops.find(
                            (Stormtrooper2) => Stormtrooper2 === troops/8
                        )

                        const projectileFound = projectiles.find(
                            projectile2 => projectile2 === projectile)

                        //remove Stormtrooper & projectile
                        if (stormTrooperFound && projectileFound) {
                            createParticles({
                                object: stormTrooper
                            })
                            
                        grid.troops.splice(i, 1)
                        projectiles.splice(j, 1)

                        if (grid.troops.length > 0) {
                            const firstTrooper = grid.troops[0]
                            const lastTrooper = grid.troops[grid.troops.length - 1]
                            grid.height = lastTrooper.position.y + firstTrooper.position.y

                        }
                        }
                    }, 1)
                }
            }) 
        })
    }) 
    
    if (keys.ArrowLeft.pressed && player.position.x >=0){
        player.velocity.x -=5
    } else player.velocity.x - 0
    if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width-100){
        player.velocity.x +=5
    } else player.velocity.x - 0
    if (keys.ArrowUp.pressed && player.position.y >=100){
        player.velocity.y -=5
    } else player.velocity.y - 0
    if (keys.ArrowDown.pressed && player.position.y < canvas.height - player.height){
        player.velocity.y +=5
    } else player.velocity.y - 0
    // enemies
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 300 + 300)                                                                            
        frames = 0    
    }

 
    frames++
   
}

animate()

 window.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
        break
        case "ArrowRight":
            keys.ArrowRight.pressed = true
        break
        case "ArrowUp":
            keys.ArrowUp.pressed = true
        break
        case "ArrowDown":
            keys.ArrowDown.pressed = true
        break
        case " ":
            projectiles.push(new Projectile({
                position: {
                    x:player.position.x + player.width, //start position on right side
                    y:player.position.y + player.height / 2,
                },
                velocity:{
                    x:5, // speed of own projectile
                    y:0
                }
            }))
            keys.space.pressed = true 
            break       
    }
}) 

window.addEventListener("keyup", ({key}) => {
    switch (key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
        break
        case "ArrowRight":
            keys.ArrowRight.pressed = false
        break
        case "ArrowUp":
            keys.ArrowUp.pressed = false
        break
        case "ArrowDown":
            keys.ArrowDown.pressed = false
        break
        case " ":
            keys.space.pressed = false        
    }    
}) 
