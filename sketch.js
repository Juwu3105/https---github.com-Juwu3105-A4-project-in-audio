let song;
let fft;
let colors = [];
let staticDrawn = false;

function preload() {
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(800, 800);
  noLoop(); 

  let grayColor = color(150); // Gray
  let blueColor = color(0, 0, 255); // Blue
  let redColor = color(255, 0, 0); // Red

  colors.push(grayColor);
  colors.push(blueColor);
  colors.push(redColor);

  fft = new p5.FFT(0.8, 256); 
}

function drawStaticElements() {
}

function draw() {
  if (!staticDrawn) {
    drawStaticElements();
    staticDrawn = true;
  }

  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    fill(i * (255 / spectrum.length), 255, 255); 
    rect(i * (width / spectrum.length), y, width / spectrum.length, height - y);
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.loop();
    loop(); // Continue the drawing loop
  }
}

function drawStaticElements() {
background(250);

// Vertical rectangles
for (let i = 1; i < 10; i++) {
    if (i == 2 || i == 4 || i == 7) {
    let x = width / 40 * i * 5;
    let y = 0;
    let w = width / 50;
    let h = height / 2;
    rect(x, y, w, h);

    for(let k = 0; k<15; k++){
        rect(x,random(0,h),w,20);
        fill(random(colors));
    }
    } else {
    let x = width / 50 * i * 5;
    let y = 0;
    let w = width / 50;
    let h = height;
    fill(255, 229, 6);
    rect(x, y, w, h);

    for(let k = 0; k<15; k++){
        rect(x,random(0,h),w,20);
        fill(random(colors));
    }
    }
    fill(255, 229, 6);
    
}


  // Horizontal rectangles
  for (let j = 1; j < 8; j++) {
    if (j == 1 || j == 5 || j == 6) {
        let x = 0;
        let y = height/8 * j;
        let w = width/2;
        let h =  height/40;
        rect(x,y,w,h);

      for(let k = 0; k< 15; k++){
        rect(random(0,w),y,20,h);
        fill(random(colors));
        }
    } else {
        x = 0;
        y = height/8 * j;
        w = width;
        h = height/40;
      rect(x, y, w, h);

      for(let k = 0; k < 15; k++){
        rect(random(0,w),y,20,h)
        fill(random(colors));
        }
    }
    fill(255, 229, 6);
  }
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