var play=1
var end=0
var gameState=play
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var cacto, cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var score=0
var cactoGp, nuvemGp
var record=0
var trexCollide
var gameover, gameoverImg
var restart, restartImg
var jumpsound, pointsound, deadsound


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cactoImg1 = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
trexCollide = loadAnimation("trex_collided.png")
gameoverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")
jumpsound = loadSound("jump.mp3")
pointsound = loadSound("checkPoint.mp3")
deadsound = loadSound("die.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollide)
  trex.scale = 0.5;

 // trex.debug=true
 trex.debug=false 
// trex.setCollider("rectangle",0,0,80,200,40)
trex.setCollider("circle",0,0,30)


  ground = createSprite(width/2, height-10, width, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(width/2, height-5, width, 20);
  invisibleGround.visible = false;

gameover = createSprite(width/2,height-100)
gameover.addImage(gameoverImg)
gameover.scale=0.5 

restart = createSprite(width/2,height-60)
restart.addImage(restartImg)
restart.scale=0.5

gameover.visible=false
restart.visible=false

 cactoGp=new Group()
nuvemGp= new Group()

}

function draw() {
  background(180);

  text("Score: "+score, width-100, height-150)
text ("Record: "+record, width-100, height-130)

if (gameState===play){
  score+=Math.round(getFrameRate()/60)
if (score>0&&score%100===0){
pointsound.play()
}

  ground.velocityX = -(9+score/100);


if (touches.length>0||keyDown("space") && trex.y >= height-30) {
    trex.velocityY = -12;
    jumpsound.play()
    touches=[]     
  }


  if (ground.x < 800) {
    ground.x = ground.width / 2;
  }

   spawnClouds();
  createCactus();


}

if (trex.isTouching(cactoGp)){
gameState=end
//deadsound.play()
}

if (gameState===end) {
  trex.changeAnimation("collided", trexCollide)
  cactoGp.setLifetimeEach(-1)
nuvemGp.setLifetimeEach(-1)
nuvemGp.setVelocityXEach(0)
cactoGp.setVelocityXEach(0)
ground.velocityX=0
gameover.visible=true
restart.visible=true

if (record<score){
  record=score;
}

if (mousePressedOver(restart)){
  reset()
}

}




  //dando gravidade
  trex.velocityY = trex.velocityY + 0.8


  trex.collide(invisibleGround);

  //gerar nuvens


  drawSprites();
}

function spawnClouds() {
  //escreva aqui o código para gerar nuvens
  if (frameCount % 80 === 0) {
    cloud = createSprite(width, random(height-190, height-100), 40, 10);
    cloud.addImage(cloudImage)
    cloud.depth = trex.depth - 1
    cloud.scale = random(0.4, 1.4);
    cloud.velocityX = -(4+score/100);
    cloud.lifetime = width/cloud.velocityX

    nuvemGp.add(cloud);
    
  }

  
}

function createCactus() {
  if (frameCount % 80 === 0) {
    cacto = createSprite(width, height-30, 40, 10);
    cacto.velocityX = -(5+score/100)
    cacto.scale = 0.5;
    cacto.lifetime = width/cacto.velocityX
    cacto.depth = trex.depth

    cactoGp.add(cacto);

    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1)
        break;
      case 2: cacto.addImage(cactoImg2)
        break;
      case 3: cacto.addImage(cactoImg3)
        break;
      case 4: cacto.addImage(cactoImg4)
        break;
      case 5: cacto.addImage(cactoImg5)
        break;
      case 6: cacto.addImage(cactoImg6)
        break;

    }

  }
}

function reset(){
gameState = play; 
gameover.visible = false; 
restart.visible = false; 
cactoGp.destroyEach(); 
nuvemGp.destroyEach(); 
trex.changeAnimation("running", trex_running); 
score = 0;
}
