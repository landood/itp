# Midterm Documentation

### What I Did
For this midterm, I created code that works with p5.js to keymap and play three individual soundfiles.

### How I Did It
The first thing I did was input the code-along into the p5.js, and studied it to try and understand the language being used and the order. At first, my idea to complete this project was just to copy and past the code 2 times and then replace the key mappings on them, but obviously, that didn't work.

I knew that my next step was to look for larger parts of the code to either alter or build upon starting with the very first statement:

`let myFirstSound;`

The reason this line was problematic was because it only accounted for the label of one sound when I needed three, so I replaced it with:

`let SoundP, SoundO, SoundI;`

The reason I wrote this line as such was to represent not only the three sounds I was going to use but also the keys I was going to map them to.

Continuing on, I had to also alter how many variable the preload function affected because on the code-along, it only affects one variable. The answer was pretty simple; all I had to do was repeat the "loadSound" line two more times and replace "myFirstSound" with the variables I used in the first line. The end result looked like this:

`function preload() {
  soundFormats('wav', 'mp3');  
  SoundP = loadSound('aughhhhhhh-meme-vocal.wav', soundLoaded);
  SoundO = loadSound('oh-my-god-singing-meme-vocal.wav', soundLoaded);
  SoundI = loadSound('what-the-dog-doing-meme.wav', soundLoaded);
}
`

The next part is my favorite because it was the one that took the smallest amount of work. The first bit of the coding took a little bit because I had to remind myself how read and understand the language after the break, but all I had to do on this next part was replace the text variable. In the end, it looked like this:

`function setup() {
  createCanvas(400, 200);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Move your cursor to the 'Preview' section\nPress 'P', 'O', or 'I' to play sound", width / 2, height / 2);
}`

The next few lines were directly copied so there were no issues with those.

The next part took me a while to figure out, but the answer was way simpler than I thought. The way I solved this puzzle was by building off the code along and creating an "else-if" statement like so:

`function keyPressed() {
  console.log("Key pressed:", key);

  if (key.toLowerCase() === 'p') {
    playCustomSound(SoundP);
  } else if (key.toLowerCase() === 'o') {
    playCustomSound(SoundO);
  } else if (key.toLowerCase() === 'i') {
    playCustomSound(SoundI);
  }
}`

After finishing it, the answer in hindsight seemed simple, but this was the hardest part of the assignment for me because I struggled with the idea of the "else if" statment being used for anything other than a list of items that happen in a row, but within what I was doing for this assignment, all the variables are considered equal. This was a head scratcher for me, but after going back to the book to see if I had missed any functions I could use, I relealize the the presence of an "if" usually implies the possibility of an "else if".

Finally, the last part is basically the same except I had to replace myFirstSound because I didn't declare my sounds that way. 