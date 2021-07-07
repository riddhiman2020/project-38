var dogImg,stoneImg,stone,dog,coin,coinImg;
var forestImg,forest;
var invisibleGround;
var score;

function preload(){
    dogImg=loadImage("dogimg.png");
    forestImg=loadImage("forest.png");
    stoneImg=loadImage("stone.png");
    coinImg=loadImage("gold coin.png")
}

function setup(){
    createCanvas(1000,500)

    forest=createSprite(500,100,100,100)
    forest.addImage(forestImg);
    forest.scale=0.4

    dog=createSprite(200,420,10,10);
    dog.addImage(dogImg);
    dog.scale=0.3;

    stonesGroup = createGroup();
    coinsGroup = createGroup();

    invisibleGround = createSprite(500,500,1000,10);
    invisibleGround.visible = false;

    dog.setCollider("rectangle",0,0,dog.width/2,dog.height/2);
    dog.debug = false

    score=0;
}

function draw(){
    background('255');

    if(keyDown("space")&& dog.y >= 418) {
        dog.velocityY = -20;
    }

    dog.velocityY=dog.velocityY + 0.8;

    if(coinsGroup.isTouching(dog)){
        score=score+1;
        coinsGroup.destroyEach();
    }

    dog.collide(invisibleGround);

    spawnStones();
    spawnCoins();
    drawSprites();

    if(stonesGroup.isTouching(dog)){
        background(0);
        textSize(23);
        text("YOU LOST",500,250);
        stonesGroup.setLifetimeEach(-1);
        stonesGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(-1);
        coinsGroup.setVelocityXEach(0);
  }
  textSize(40);
  text("Score: "+ score, 500,100);
}

function spawnStones() {
    if (frameCount % 110 === 0) {
        stone = createSprite(1100,420,40,10);
        stone.addImage(stoneImg)
        stone.scale=0.03;
        //stone.debug=true;
        stone.velocityX = -20;
      
       //assign lifetime to the variable
      stone.lifetime = 100;

      stonesGroup.add(stone)
    }
  }

  function spawnCoins() {
    if (frameCount % 240 === 0) {
        coin=createSprite(1100,400,10,10)
        coin.addImage(coinImg);
        coin.scale=0.07
        //coin.debug=true;
        coin.velocityX = -20;
      
       //assign lifetime to the variable
      coin.lifetime = 100;

      coinsGroup.add(coin)
    }
  }