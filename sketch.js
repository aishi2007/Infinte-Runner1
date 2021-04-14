
var girl , girl_running
var coin ,coinImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,food,rocks
var score
var survivalTime=0;
var canvas;
function preload(){
  
  
  girl_running =loadAnimation("girl_1.png","girl_2.png","girl_3.png","girl_4.png")
  
  coinImage = loadImage("Coin.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth- 20,windowHeight-30);
 
  girl=createSprite(80,315,windowWidth,windowHeight);
 girl.addAnimation("running",girl_running);
 girl.scale=0.3;

 ground=createSprite(400,350,windowWidth/2*4,20);
 ground.velocityX=-4;
 ground.x=ground.width/2;
 console.log(ground.x);

  FoodGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}


function draw() {
  background("white");
  
  camera.y=girl.y;
  
  if(keyDown("space") && girl.y>=210){
  girl.velocityY=-10;
  
  }
   
  if (ground.x < 0){
  ground.x = ground.width/2;
   }
  girl.velocityY = girl.velocityY + 0.5
  girl.collide(ground);
  
  if(girl.isTouching(FoodGroup)){
    reset(); 
  }
  
  if(obstacleGroup.isTouching(girl)){
    girl.scale=0.3;
  }
  obstacleGroup.collide(ground);
  food();
  obstacle();
  drawSprites();
  
 stroke("white") 
 textSize(40);
 fill("red")
 text("THE MARATHON GAME",550,50)

 stroke("white")
 textSize(16);
 fill("green")
 text("**Collect Coins To Increase Your Speed",800,100)

  stroke("white");
  textSize(16);
  fill("blue");
  text("Score: "+score,50,50)
  
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,200,50);
  
}


function food(){
  if(frameCount%80===0){
  var coin=createSprite(windowWidth-200,Math.round(random(120,200)),windowWidth/2+40, windowHeight/2-80);
  coin.addImage("eating",coinImage)
  coin.scale=0.08;
  coin.velocityX=-6;
  coin.lifetime = 200;
  FoodGroup.add(coin);
  }
}

function obstacle(){
  if(frameCount%300 ===0){
  var rocks=createSprite(windowWidth-200,Math.round(random(310,310)),20,20);
  rocks.addImage("obstacles",obstacleImage)
  rocks.scale=0.08;
  rocks.velocityX=-6;
  rocks.lifetime = 200;
  obstacleGroup.add(rocks);
  }
}

function reset(){
  
  FoodGroup.destroyEach();
  score=score+2;
  
  switch(score){
  case 10: girl.scale=0.4;
      break;
  case 20: girl.scale=0.5;
      break;
  case 30: girl.scale=0.6;
      break;
  case 40: girl.scale=0.7;
      break;
  default:break;
  }
}