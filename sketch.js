const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con;

var fruitImg, rabbitImg, bgImg;
var cutButton, cutButton2, cutButton3;
var blink, eat, sad;
var bunny;

var backgroundMusic, cutSound, sadSound, eatingSound, airSound
var blower, muteButton

function preload(){
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
  bgImg = loadImage("assets/background.png");

  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  sad.looping = false;
  eat.looping = false;

  backgroundMusic = loadSound('assets/sound1.mp3')
  cutSound = loadSound('assets/rope_cut.mp3')
  sadSound = loadSound('assets/sad.wav')
  eatingSound = loadSound('assets/eating_sound.mp3')
  airSound = loadSound('assets/air.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  frameRate(80);
  backgroundMusic.play()
  backgroundMusic.setVolume(0.5)

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(width/2 ,height - 20, width, 20);

  rope = new Rope(2,{x:width/2,y:30});
  rope2 = new Rope(3,{x:width/2-400, y:30})
  rope3 = new Rope(3,{x:width/2+400, y:30})
  
  fruit = Bodies.circle(width/2,300,20);
  Matter.Composite.add(rope.body,fruit);
  Matter.Composite.add(rope2.body,fruit);
  Matter.Composite.add(rope3.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  cutButton = createImg('assets/cut_btn.png');
  cutButton.position(width/2-30,30);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);

  cutButton2 = createImg('assets/cut_btn.png');
  cutButton2.position(width/2-400,30);
  cutButton2.size(50,50);
  cutButton2.mouseClicked(drop2);

  cutButton3 = createImg('assets/cut_btn.png');
  cutButton3.position(width/2+370,30);
  cutButton3.size(50,50);
  cutButton3.mouseClicked(drop3);

  //blower = createImg('assets/balloon.png')
  //blower.position(75,250)
  //blower.size(100,100)
  //blower.mouseClicked(airBlow)

  muteButton = createImg('assets/mute.png')
  muteButton.position(1475,10)
  muteButton.size(30,30)
  muteButton.mouseClicked(mute)
  
  bunny = createSprite(width/2,650,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50) 
}

function draw(){
  background(51);

  image(bgImg,width/2,height/2,width,height);

  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()
    
  Engine.update(engine);
  
  ground.show(); 

  if (collide(fruit,bunny) === true){
    bunny.changeAnimation("eating")
    eatingSound.play()
  }

  if (fruit != null && fruit.position.y >= 650){
    bunny.changeAnimation("crying")
    sadSound.play()
    fruit = null
  }
  
  drawSprites()
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cutSound.play()
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = nul;
  cutSound.play();
}

function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = nul;
  cutSound.play();
}

function collide(body,sprite){
  if (body!= null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (d <= 80){
      return true
      World.remove(world,fruit)
      fruit = null
    }
    else {
      return false;
    }
  }
}

function mute() {
  if (backgroundMusic.isPlaying()){
    backgroundMusic.stop()
  }
  else {
    backgroundMusic.play()
  }
}

function airBlow() {
  airSound.play()
  Matter.Body.applyForce(fruit,{x:0 , y:0},{x:0.01, y:0})
}