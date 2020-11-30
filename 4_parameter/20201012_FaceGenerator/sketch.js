let eyesSlider, mouthSlider, eyeChoice, mouthChoice;
let eyesImg = 'img/eyes/eyes_';
let mouthImg = 'img/mouths/mouth_';

function preload() {
  loadImage('img/eyes/eyes_1.png');
  loadImage('img/eyes/eyes_2.png');
  loadImage('img/eyes/eyes_3.png');
  loadImage('img/eyes/eyes_4.png');
  loadImage('img/eyes/eyes_5.png');
  loadImage('img/eyes/eyes_1.png');
  loadImage('img/mouths/mouth_1.png');
  loadImage('img/mouths/mouth_2.png');
  loadImage('img/mouths/mouth_3.png');
  loadImage('img/mouths/mouth_4.png');
  loadImage('img/mouths/mouth_5.png');
  loadImage('img/mouths/mouth_6.png');
}

function setup() {
  imageMode(CENTER);
  createCanvas(400, 400);
  face = loadImage('img/blankface.png');

  eyesSlider_label = createP("Minifig Eyes")
  eyesSlider = createSlider(1, 6, 1, 1);

  mouthSlider_label = createP("Minifig Mouth")
  mouthSlider = createSlider(1, 6, 1, 1);

  eyeChoice = eyesSlider.value();
  mouthChoice = mouthSlider.value();

  eyes = loadImage(eyesImg + eyeChoice + '.png');
  mouth = loadImage(mouthImg + mouthChoice + '.png');

}

function draw() {
  eyeChoice = eyesSlider.value();
  mouthChoice = mouthSlider.value();

  image(face, width / 2, height / 2);
  image(eyes, width / 2, height / 2 - 30);
  image(mouth, width / 2, height / 2 + 45);

}

// function mouseReleased() {
//   updateImage();
// }
