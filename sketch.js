//memory of objects
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var reset,reset1,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7,cloudi,cloud;
var score=0;
//var message='have a great day'
var obstacleGroup,cloudGroup,gamestate;
var PLAY=0,END=1;
var jump;

//animation of objects
function preload() {
   trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
   trex_collided = loadAnimation("trex_collided.png");
   groundImage = loadImage("ground2.png")
   cloudImage = loadImage("cloud.png")
   obstacle1=loadImage('obstacle1.png')
   obstacle2=loadImage('obstacle2.png')
   obstacle3=loadImage('obstacle3.png')
   obstacle4=loadImage('obstacle4.png')
   obstacle5=loadImage('obstacle5.png')
   obstacle6=loadImage('obstacle6.png') 
   jump=loadSound('zapsplat_cartoon_impact_bounce_thud_002_56672.mp3')
   
}

   //all the shapes and positions of objects
  function setup() {
  createCanvas(600, 200);
  
 
  var message='hi'
  gamestate=PLAY
  
  obstacleGroup=createGroup()
  cloudGroup=createGroup()
  
  invisibleGround = createSprite(200,191,400,20);
  invisibleGround.visible=false
 
  //creatspawnClouds()e a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
 // trex.debug=true
  trex.setCollider('rectangle',0.2,0.2,80,100)
  reset=createSprite(300,100,25,25)
  reset.visible=false
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  }  
//forever loop (REPEATS INSTRUCTIONS)
function draw() {
    
        background(250);
  
  
  if (gamestate===PLAY)
      {
      
    //  if(mousePressedOver(trex))
     //   {console.log('trex is clicked')
          ground.velocityX = -4;
       reset.visible=false
       
        spawnClouds()
     
        spawnObstacles() 
      trex.velocityY = trex.velocityY + 0.8   
      textSize(20)
      text('score='+score,400,50)
      score=score+Math.round(frameCount/10)
      obstacleGroup.visible=true
  if (ground.x < 0) {
      ground.x = ground.width / 2; }

  if(trex.isTouching(ground) &&keyDown("space")){
     trex.velocityY = -12;
  
  }}
      
     trex.collide(invisibleGround);   
  
    if (trex.isTouching(obstacleGroup) ){
    gamestate=END}
 
  
    else if (gamestate===END){ 
    textSize(25)
    text('GAME OVER ' ,230,60)
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    ground.velocityX=0
    obstacleGroup.visible=false
    obstacleGroup.setLifetimeEach(1)
    score=0
    reset.visible=true
    trex.changeAnimation('trex_collided',trex_collided)}
    drawSprites();
    if(mousePressedOver(reset)){
      gamestate=PLAY
    }
  }

function spawnClouds()      {
  if (frameCount%100===0){
    var cloudSpawn;
cloudSpawn= Math.round(random(1,600))
 // console.log('anything'+  ' everything' +' 759'+  score)
cloud=createSprite(cloudSpawn,50,15,15)
  cloud.addImage("cloud",cloudImage)
cloud.scale=0.2
  cloud.velocityX=-3

cloud.lifetime=200
cloudGroup.add(cloud)}
}
function spawnObstacles(){

 if (frameCount%60===0){
  var obstacle,r
  obstacle= createSprite(480,160,20,30)
r =Math.round(random(1,6))
   switch(r)
  {
    case 1:obstacle.addImage('obstacle1',obstacle1)
        obstacle.scale=0.09  
        break
    case 2:obstacle.addImage('obstacle2',obstacle2)
          obstacle.scale=0.09  
          break      
    case 3:obstacle.addImage('obstacle3',obstacle3)
           obstacle.scale=0.12
           break         
    case 4:obstacle.addImage('obstacle4',obstacle4)
          obstacle.scale=0.05 
          break
    case 5:obstacle.addImage('obstacle5',obstacle5)
          obstacle.scale=0.05  
          break 
    case 6:obstacle.addImage('obstacle6',obstacle6)
           obstacle.scale=0.12
        break  } 
        
  obstacle.velocityX=-6
  obstacleGroup.add(obstacle) } 
}


