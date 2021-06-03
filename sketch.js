var backImage,backgr;
var player, player_running;
var ground,ground_img;

var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup, bananaSound

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  bananaSound = loadSound("banana.wav");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-6;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y >= 150) {
      player.velocityY = -16.5;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    spawnFood();
    spawnObstacles();

  }

  if(foodGroup.isTouching(player)){
    score += 2;
    foodGroup[0].destroy();
    bananaSound.play();

    if(player.scale < 0.18){
      player.scale += 0.02;
    }else{
      player.scale = 0.18;
    }
  
  }

  drawSprites();

  if(gameState!== END){
    textSize(30);
    fill("white");
    text("score: " + score, 50, 50);
  }
  
  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
  
  if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("GameOver!", 300, 220);
    
  }

  
}

function spawnFood(){
  if (frameCount % 80 === 0){
    var banana = createSprite(750, 160, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 500;
    banana.scale = 0.1;
    
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 150 === 0){
    var obstacle = createSprite(750, 310, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 500;
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle", 10, 5, 300, 300)
    obstacleGroup.add(obstacle);
  }
}