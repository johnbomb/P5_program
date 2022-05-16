var song // A globle variable for the song
var img // A globle variable for the backround image
var fft // A globle variable for the wave form to show
var particles= [] // A globle variable for the particles and a empty array to keep track of particles 
 

function preload() { // always the files to be loaded first before anything else happens
  song = loadSound('Trap-Power-Intro-4.mp3') // Loads our song so it can by played

  img = loadImage('andy-holmes-unsplash.jpg') // Loads the image so it can be showed in the background
}


function setup() { //  used to define initial environment properties
  createCanvas(700, 700); // adds size of the usable canvas
  angleMode(DEGREES) // to show the wave as a circle
  imageMode(CENTER) // puts image in the center of the canvas
  fft = new p5.FFT() //will anylize the song in every frame and return values
  img.filter(BLUR, 5) // blurs the image for better efffect

}



function draw() { // continuously runs all lines of code in this function
  background("#003366"); // adds color to background
  stroke("#ffff00"); //color of the wave is yellow
  strokeWeight(4) //
  noFill()// removes the fill
  
  
  translate(width /2, height /2)// shows the circle in the center
  image(img, 0, 0, width, height)// 
  textSize(25);// add size of the text
  textFont ("Georgia"); // adds the font
  textStyle(ITALIC);// adds style of the text
  
  text("click to play/stop",-85,15);// adds the position of where "click to play/stop" will show on the canvas
  
  fft.analyze() // this method allows "amp=fft.getEnergy to work properly"
  
  amp = fft.getEnergy(20, 210) // gives a frequency range for the particles to interact with.
  
  var wave = fft.waveform() // will store all waveform data
  beginShape() // start of code that will create the shape
  for (var i = 0; i <width; i++){ //this loop will put a points from the waveform across the width of canvas or x axis in this case its 700.
var index = floor(map(i,0,width,0,wave.length)) //This makes the wave data a whole and fits the wave length showed with our width of the canvas. 

var r = map(wave[index], -1, 1, 150, 350) //

var x = r * sin(i) // this converts all x axis data into a circle
var y = r * cos(i) // this converts all y axis data into a circle
    vertex(x, y) 
    
  }
  endShape() //  start of code that will create the shape "circle"

  var p = new Particle() // this declars the particle in the draw function so it will show every frame continuously
  particles.push(p) // this pushes the partcle varable into the empty array "var particles= []" to keep track of the particles

  for(var i = particles.length -1; i >= 0; i--){ //
    if(!particles[i].edges()) { // this itterates the array backwards allows thr the particles to appear in bounds with the canvas
      
      particles[i].update(amp > 210) // particles update everyframe based on the beat of the songs amplitude being geater then 210
    particles[i].show() // shows the particles after the update.
    } else{
      particles.splice(i, 1) 
    }
      
    }
      

}





function mouseClicked(){ // A function that that takes mouse click inputs to play or stop the song.
  if (song.isPlaying()) { // if statement to make the function work.
      song.pause() //pauses the song if song is playing.
      noLoop() // stops the draw function from continuing 
  }else { // else statment to play if clicked when paused
    song.play() // plays the song if clicked 
      loop() // song will loop when playing
  }
}

class Particle { // creates the particles objects
  constructor(){
    this.pos = p5.Vector.random2D().mult(250) // This randomly places the particles around the radius of the circle
    this.vel = createVector(0, 0) // speed of particles start a 0
    this.acc = this.pos.copy().mult(random(0.001, 0.0001)) // particles will randomly accelerate in different directions. multplying it by a small number so it doesn't move too fast
    
    this.w =random(2, 4) // gives the particles it's size randomly
    this.color = [random(200, 255), random(200, 255), random(200, 255)] // collors
  
  } 
 update(cond){ // updates the particles speed every frame
   this.vel.add(this.acc)// adding the acceleration to the velocity to the particles 
    this.pos.add(this.vel) //adding to velocity to the position of the particles so they can move
 if (cond) { //  adds more velocity
   this.pos.add(this.vel)
   this.pos.add(this.vel)
   this.pos.add(this.vel)
 }
 
 }
  edges() { //this method controls what particles are showing on the canvis
    
    if (this.pos.x < -width /2 || this.pos.x > width /2 || this.pos.y <- height /2 || this.pos.y > height /2) { // this statement will keep the particles on the canvas if in bounds and remove them when they move off the canvas.
      return true 
    } else{
      return false 
    }
  
  
  
  
  
  }
  
   
  
                                                    
  
  show(){
   noStroke() // removes the stroke so it doesn't look messy
   fill(this.color) // this gives the particles random color from "this.color = [random(200, 255)"
   ellipse(this.pos.x, this.pos.y, this.w) // gives position to the circle 
 }

}
