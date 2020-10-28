function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



var canvas = document.querySelector('#canvas-overlay');
var canvasContext = canvas.getContext('2d');

function init() {
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();
}

init();

function resizeCanvases() {
  canvas.width = canvas.width = window.innerWidth;
  canvas.height = canvas.height = window.innerHeight;

}


const arr  = new Uint8ClampedArray(4 * canvas.width * canvas.height);
const fire = new Uint8ClampedArray(canvas.width * canvas.height);

        
var colors = [];
function generateColorPallete(colors) {  
  for (var i = 0; i < 256; i++) {
    var color = [];
    color[0] = 0;
    color[1] = 0;
    color[2] = 0;
    colors[i] = color;
  }
  for (var i = 0; i < 32; ++i) {
    colors[i][2] = i << 1;

    colors[i + 32][0] = i << 3;
    colors[i + 32][2] = 64 - (i << 1);

    colors[i + 64][0] = 255;
    colors[i + 64][1] = i << 3;

    colors[i + 96][0] = 255;
    colors[i + 96][1] = 255;
    colors[i + 96][2] = i << 2;
    colors[i + 128][0] = 255;
    colors[i + 128][1] = 255;
    colors[i + 128][2] = 64 + (i << 2);
    colors[i + 160][0] = 255;
    colors[i + 160][1] = 255;
    colors[i + 160][2] = 128 + (i << 2);
    colors[i + 192][0] = 255;
    colors[i + 192][1] = 255;
    colors[i + 192][2] = 192 + i;
    colors[i + 224][0] = 255;
    colors[i + 224][1] = 255;
    colors[i + 224][2] = 224 + i;
  } 
}

generateColorPallete(colors);

function randomButtomRow(fire) {
  for (let i = 0; i < canvas.width; i += 1){
    fire[(canvas.height - 1) * canvas.width + i] = getRandomInt(255);
  }
}

function renderFireToArr(fire, arr) {
  for (let y = 0; y < canvas.height; y += 1){
    for (let x = 0; x < canvas.width; x += 1){
      let color = colors[fire[y * canvas.width + x]];
      arr[y * 4 * canvas.width + (x * 4) + 0] = color[0];
      arr[y * 4 * canvas.width + (x * 4) + 1] = color[1];
      arr[y * 4 * canvas.width + (x * 4) + 2] = color[2];
      arr[y * 4 * canvas.width + (x * 4) + 3] = 255;
    }
  }
}

function simulateFire(fire) {
  for (let y = 0; y < canvas.height; y += 1){
    for (let x = 0; x < canvas.width; x += 1){
      fire[y * canvas.width + x] = 
     (((fire[((y + 1) % canvas.height) * canvas.width + ((x - 1) % canvas.width)] +
        fire[((y + 1) % canvas.height) * canvas.width + ((x)     % canvas.width)] +
        fire[((y + 1) % canvas.height) * canvas.width + ((x + 1) % canvas.width)] +
        fire[((y + 2) % canvas.height) * canvas.width + ((x)     % canvas.width)]) * 32) / 129) % 255;
    }
  }
}

function tick() {
  randomButtomRow(fire);
  simulateFire(fire);
  renderFireToArr(fire, arr);

  let imageData = new ImageData(arr, canvas.width, canvas.height);
  canvasContext.putImageData(imageData, 0, 0);
}

setInterval(tick, 10);