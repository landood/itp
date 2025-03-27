let SoundP, SoundO, SoundI;

function preload() {
  soundFormats('wav', 'mp3');  
  SoundP = loadSound('aughhhhhhh-meme-vocal.wav', soundLoaded);
  SoundO = loadSound('oh-my-god-singing-meme-vocal.wav', soundLoaded);
  SoundI = loadSound('what-the-dog-doing-meme.wav', soundLoaded);
}

function setup() {
  createCanvas(400, 200);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Move your cursor to the 'Preview' section\nPress 'P', 'O', or 'I' to play sound", width / 2, height / 2);
}

function soundLoaded() {
  console.log("Sound successfully loaded!");
}

function keyPressed() {
  console.log("Key pressed:", key);

  if (key.toLowerCase() === 'p') {
    playCustomSound(SoundP);
  } else if (key.toLowerCase() === 'o') {
    playCustomSound(SoundO);
  } else if (key.toLowerCase() === 'i') {
    playCustomSound(SoundI);
  }
}

function playCustomSound(sound) {
  if (sound.isLoaded()) {
    sound.play();
    console.log("Sound played.");
  } else {
    console.log("Sound not loaded yet.");
  }
}