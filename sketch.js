// Global variables
let song;  // Will hold the sound file
let fft;  // Will be used for analyzing the sound frequencies
let colors = [];  // Array to store different color objects
var nums1 = [10,100, 210, 320, 470, 500, 630, 700, 790];  // Pre-defined x positions for some of the rectangles
var nums2 = [30, 100, 210, 300, 400, 550, 630, 750, 790];  // Pre-defined y positions for some of the rectangles

var posY = [];  // Will hold random y positions for the moving rectangles
var posX = [];  // Will hold random x positions for the moving rectangles
var fillColors = [];  // Will hold random colors for the moving rectangles

// Preload is called before setup, used to load external files such as images and sounds
function preload() {
  // Loads the sound file before the sketch starts
  song = loadSound("song.mp3");
}

// Setup function is called once when the sketch starts
function setup() {
    createCanvas(800, 800);  // Creates a canvas of 800x800 pixels
    loop();  // Ensures that the draw function is continuously called
    noStroke();  // Shapes drawn will not have an outline

    // Define three colors and add them to the colors array
    let grayColor = color(150);  // Gray
    let blueColor = color(21, 29, 176);  // Blue
    let redColor = color(161, 7, 2);  // Red
    colors.push(grayColor);
    colors.push(blueColor);
    colors.push(redColor);

    // Initialize random positions and colors for small rectangles
    for (var i = 0; i < 15; i++) {
        posY.push(random(0, height / 2));
        posX.push(random(0, width / 2));
        fillColors.push(random(colors));
    }

    fft = new p5.FFT();  // Creates a new FFT object for analyzing the sound
}

// Function that handles mouse press events
function mousePressed() {
  // If the song is not playing, start playing and looping it
  if (!song.isPlaying()) {
    song.loop();
  }
}

// Draw function is called in a loop after setup
function draw() {
    background(250);  // Set the background color to a light gray

    fft.analyze();  // Analyze the sound to get frequency data
    let eBass = fft.getEnergy("bass");  // Get the energy (amplitude) of the bass frequencies
    let diamBass = map(eBass, 0, 255, 0, 15);  // Map the bass energy to a new range for diamBass
    console.log(diamBass);  // Log the diamBass value to the console for debugging

// Draw the vertical rectangles modulated by the bass frequency
for (let n = 1; n < 10; n++) {
    if (n == 2 || n == 4 || n == 7) {
      let x = width / 40 * n * 5;
      let y = 0;
      let w = width / 50+diamBass;
      let h = height / 2;
      rect(x, y, w, h);

      //fill in small rects in random 3 colors
      for(let k = 0; k<15; k++){
          rect(x,posY[k],w,20);
          fill(fillColors[k]);
      }
    }
    else {
      let x = width / 50 * n * 5;
      let y = 0;
      let w = width / 50+diamBass;
      let h = height;
      fill(255, 229, 6);
      rect(x, y, w, h);

      //fill in small rects in random 3 colors
      for(let k = 0; k<15; k++){
          //rect(x,random(0,h),w,20);
          rect(x,posY[k],w,20);
          fill(fillColors[k]);
      }
    }
    fill(255, 229, 6);
}

// Draw the Horizontal rectangles modulated by the bass frequency
  for (let j = 1; j < 8; j++) {
    if (j == 1 || j == 5 || j == 6) {
        let x = 0;
        let y = height/8 * j;
        let w = width/2;
        let h =  height/40+diamBass;
        rect(x,y,w,h);

      //fill in small rects in random 3 colors
      for(let k = 0; k< 15; k++){
        //rect(random(0,w),y,20,h);
        rect(posX[k],y,20,h);
        fill(fillColors[k]);
        }
    } else {
        x = 0;
        y = height/8 * j;
        w = width;
        h = height/40+diamBass;
      rect(x, y, w, h+diamBass);

      //fill in small rects in random 3 colors
      for(let k = 0; k < 15; k++){
        //rect(random(0,w),y,20,h)
        rect(posX[k],y,20,h)
        fill(fillColors[k]);
        }
    }
    fill(255, 229, 6);
  }

// This part of the code creates additional static rectangles at specific positions
// with colors from the `colors` array and predefined sizes. These are not
// modulated by the music and form a static part of the visual.
  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[1]);//blue
    rect(nums1[i],nums2[i]*3,100,70);
  }

  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]);//red
    rect(nums1[i],nums2[i]*2,100+50,80);
  }

  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]);//red
    rect(nums1[i]*2,nums2[i],60,50);
  }

  for (let i = 0; i < 6; i++) {
    noStroke();
    fill(colors[2]);//red
    rect(nums1[i]*2,nums2[i],60,50);
  }
  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[0]);//gray
    rect(nums1[i]*2+20,nums2[i]+10,30,30);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(255, 229, 6);//yellow

    rect(nums1[i]+200,nums2[i]+200,40,80);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[1]);//blue
    rect(nums1[i*2]+220,nums2[i]+400,100,80);
  }
}