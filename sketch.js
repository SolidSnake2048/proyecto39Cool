var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var obstacle1,obstacle2,obstacle3;
var ob1Image,ob2Image,ob3Image;
var backImage;
var finish;
var edges;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  backImage=loadImage("fondoTrex.jpg");

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");

  groundImage=loadImage("ground2.png");

  ob1Image=loadImage("obstacle1.png");
  ob2Image=loadImage("obstacle2.png");
  ob3Image=loadImage("obstacle3.png");
}
function setup(){
      createCanvas(600,200);
      trex=createSprite(300,160,30,30);
      trex.scale=0.6;
      trex.addAnimation("running",trex_running);
      trex.addAnimation("iddle",trex_collided);
      trex.setCollider("circle",1,0,50)
      trex.debug=false;

      ground=createSprite(500,180,10000,10);
      ground.addImage("ground",groundImage);

      invisibleGround=createSprite(500,190,10000,10);
      invisibleGround.visible=false;
      
      obstacle1=createSprite(400,155,20,40);
      obstacle1.addImage("ob1",ob1Image);

      obstacle2=createSprite(600,155,20,40);
      obstacle2.addImage("ob2",ob2Image);

      obstacle3=createSprite(800,155,20,40);
      obstacle3.addImage("ob3",ob3Image);
      obstacle3.scale=0.7;

      finish=createSprite(1200,180,150,20);

      trex.shapeColor="red";
      ground.shapeColor="blue";
      obstacle1.shapeColor="green";
      obstacle2.shapeColor="green";
      obstacle3.shapeColor="green";
      finish.shapeColor="green";

      edges=createEdgeSprites();
}
function draw(){
      background(backImage);

      text("Presiona D para avanzar",20,30);
      text("Presiona A para retroceder",20,50);
      text("Presiona W para brincar",20,70);

      textSize(30);
      text("META",1180,150);

      camera.position.x=trex.x;
      //camera.position.y=trex.y;
      if(gameState==PLAY){
        if(keyDown("D")){
          trex.velocityX=5;
        }
        else{
          trex.velocityX=0;
        }
        if(keyDown("A")){
          trex.velocityX=-5;
        }
        trex.velocityY=trex.velocityY+1;
        if(keyDown("W")&&trex.y>=height-180){
            trex.velocityY=-12;
        }
      }

      if(gameState==END){
        trex.visible=false;
        trex.velocityX=0;
        trex.velocityY=0;

        ground.visible=false;

        obstacle1.visible=false;
        obstacle2.visible=false;
        obstacle3.visible=false;

        finish.visible=false;
      }

      if(trex.isTouching(finish)){
        textSize(50);
        fill("green");
        text("Ganaste!",1000,100);
        gameState=END;
      }

      if(trex.isTouching(obstacle1)){
        textSize(50);
        fill("red");
        text("Perdiste!",300,100);
        gameState=END;
      }
      if(trex.isTouching(obstacle2)){
        textSize(50);
        fill("red");
        text("Perdiste!",400,100);
        gameState=END;
      }
      if(trex.isTouching(obstacle3)){
        textSize(50);
        fill("red");
        text("Perdiste!",600,100);
        gameState=END;
      }

      trex.collide(invisibleGround);

      //trex.collide(obstacle1);
      //trex.collide(obstacle2);
      //trex.collide(obstacle3);
      drawSprites();
}

