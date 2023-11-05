let song;
let fft;
let colors = [];
var nums1 = [10,100, 210, 320,470, 500, 630, 700,790];
var nums2 = [30,100, 210, 300, 400, 550, 630, 750,790];

var n=0;

var posY =[];
var posX =[];
var fillColors =[];

function preload() {
  // Replace 'song.mp3' with the path to your audio file
  song = loadSound("song.mp3");


}



function setup() {
    createCanvas(800,800);
    loop();
    noStroke();

    //fill(255, 229, 6);
    let grayColor = color(150);  // Gray
    let blueColor = color(21, 29, 176);  // Blue
    let redColor = color(161, 7, 2);  // Red
  
    colors.push(grayColor);
    colors.push(blueColor);
    colors.push(redColor);
   
    //生成随机数据
   for(var i=0;i<15;i++)
   {
     posY.push(random(0,height / 2));
     posX.push(random(0,width / 2));
     fillColors.push(random(colors));
   }

    fft = new p5.FFT();
    //song.loop();
}

//click to start the music
function mousePressed() {
  if (!song.isPlaying()) {
    song.loop();
  }
}

function draw() {
background(250);

fft.analyze();
let eBass = fft.getEnergy("bass");
let diamBass = map(eBass, 0, 255, 0, 15);
console.log(diamBass);

// Vertical rectangles
for (let n = 1; n < 10; n++) 
{
   
    if (n == 2 || n == 4 || n == 7) {
      let x = width / 40 * n * 5;
      let y = 0;
      let w = width / 50+diamBass;
      let h = height / 2;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for(let k = 0; k<15; k++){
          //rect(x,random(0,h),w,20);
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
      //垂直条
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






  // Horizontal rectangles
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