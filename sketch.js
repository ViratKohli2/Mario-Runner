var PLAY=1;
var END=0;
var gameState=PLAY;
var mario,marioImage;
var ground, groundImage;
var obstacle,obstacleImage;
var back,background1;
var brickImage,brick, brickGroup;
var coin,coinImage,coinGroup;
var obstaclesGroup;
var invisibleGroud;
var collided,collidedImage;
var gameoverImg,gameover
var credit=0
var jumpSound, dieSound

function preload(){
//groundImage = loadImage("ground2.png");
   marioImage = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
back = loadImage("bg2.jpg")
  brickImage= loadImage("brick.png")
  coinImage = loadImage("coin 3.png")
  collidedImage = loadImage("collided.png");
  gameoverImg=loadImage("gameOver.png")
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3")
}


function setup(){
  createCanvas(700,370);
 
  background1 = createSprite(200,210,500,200)
  background1.addImage(back)


  mario = createSprite(60,320,20,50);
  mario.addAnimation("mario",marioImage)
 
  mario.scale=2

  mario.depth= background1.depth;
  mario.depth+=1;
  
 /*
   ground = createSprite(200,370,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;*/
  
   invisibleGround = createSprite(200,360,400,20)
  invisibleGround.visible = false   

  collided = createSprite(60,300,20,50)
  collided.addImage("collided",collidedImage)
  collided.scale=2;
  collided.visible = false
  
  gameover= createSprite(350,170,10,10);
  gameover.addImage("gameoverImage",gameoverImg);
  gameover.visible=false;
  
  obstaclesGroup = new Group();
  brickGroup=new Group();
  coinGroup=new Group();
}

function draw(){

  background("white")
  
  textSize(15);
  fill("red")
  text("POINTS: "+credit,300,15);
  
  //background1.depth=text.depth;
  //background.depth-=1;
  if(gameState===PLAY){

    

   background1.velocityX = -4;
  
  if(keyDown("Space")&&(mario.y>150)){
  mario.velocityY = -8
  jumpSound.play();
  }
     
  mario.velocityY = mario.velocityY+0.8
  
 /* if (ground.x < 0){
    ground.x = ground.width/2;
      
      
  }*/
  
 if (background1.x < 0){
    
    background1.x = background1.width/2;
          
  }
   addcoins();
  spawnobstacle();
  addbrick();
    if(coinGroup.isTouching(mario)){
      coinGroup.destroyEach();
      credit=credit+10;
      
    }
  
  mario.collide(invisibleGround);
  if(obstaclesGroup.isTouching(mario) ){
    dieSound.play();
    gameState=END

  }
  
  
}
  if(gameState===END){

  
   mario.visible = false
    collided.visible = true
  //mario.changeAnimation("collided",collidedImage)
   // ground.velocityX = 0
    mario.velocityX = 0
    background1.velocityX=0
    obstaclesGroup.velocityX = 0
    coin.velocityX = 0
    brick.velocityX = 0
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.destroyEach();
    brickGroup.setLifetimeEach(-1);
    brickGroup.setVelocityXEach(0);
    brickGroup.destroyEach();
    coinGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
    
     
    coinGroup.destroyEach();  
    gameover.visible=true;
  
}
  drawSprites(); 
}

function spawnobstacle() {
  if(frameCount%120===0){
  obstacle = createSprite(600,320,10,40)
  obstacle.velocityX = -4
    obstacle.addAnimation("obstacle",obstacleImage)
     obstacle.lifetime = 160;
    obstaclesGroup.add(obstacle)
  } 
}

function addbrick () {
if(frameCount%60===0){
  brick = createSprite(600,170,30,10);
 brick.addImage("brick1",brickImage);
  brick.velocityX = -4
      brick.y=round(random(150,190))
  brick.lifetime = 160;
  brickGroup.add(brick);
}
}

function addcoins() {
  if(frameCount%120===0) {
    coin = createSprite(brick.x,brick.y-10,10,10);
    coin.addImage("coin1",coinImage);
    coin.velocityX = -4
    coin.y=round(random(120,150))
    coin.lifetime = 160;
    coin.scale = 0.1
    coinGroup.add(coin);
  }
}