# Final

## What I Did
For my final, I built an additive synthesizer with key mapping capability.

## How I Did It

### Step 1: MidiToFreq()
The first step to building my final was creating the code to be able to play frequencies. Although I was a little worried about how difficult it might be to begin programming anything other then downloaded wavs, this worry was dispelled quickly as I scoured the p5.js tutorials. As soon as I typed "frequency" into the search bar, the tutorial I needed appeared. The tutorial was called "midiToFreq()", and it showed me this code:

`let midiNotes = [60, 64, 67, 72];
let noteIndex = 0;
let midiVal, freq;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(startSound);
  osc = new p5.TriOsc();
  env = new p5.Envelope();
}

function draw() {
  background(220);
  text('tap to play', 10, 20);
  if (midiVal) {
    text('MIDI: ' + midiVal, 10, 40);
    text('Freq: ' + freq, 10, 60);
  }
}

function startSound() {
  // see also: userStartAudio();
  osc.start();

  midiVal = midiNotes[noteIndex % midiNotes.length];
  freq = midiToFreq(midiVal);
  osc.freq(freq);
  env.ramp(osc, 0, 1.0, 0);

  noteIndex++;
}`

This was code that converted midi assignments (60=c,62=d, 64=e, etc.) into the frequencies that matched the notes. This was exactly what I needed to begin my project, so I experimented with the tutorial and tried to understand the code the best I could. Already I had fulfilled the lowest bar I had set for myself.

### Step 2: Key Mapping Frequencies
Figuring out key mapping should have been a simple process, but instead of trying the simplist answer first, I instead ended up spiraling down a hole of other people's sketches and tutorials before realizing that I had literally been taught the answer weeks ago. That said, I did learn a lot from the sketches I looked at, specifically Troy Peter's sketch. This sketch was broken down for me through notes in the sketch which explained what each chunk of the code was doing. This helped me to understand how to integrate amplitude into my code and gave me a way to control the frequencies with sliders. Here is the code:

`// Additive Synthesis - p5.js

let oscillators = [];
let numOscillators = 10;
let frequencySlider;
let amplitudeSliders = [];

function setup() {
  createCanvas(400, 200);
  
  // Create frequency slider
  frequencySlider = createSlider(100, 1000, 440, 1);
  frequencySlider.position(10, 10);
  
  // Create amplitude sliders for each oscillator
  for (let i = 0; i < numOscillators; i++) {
    let amplitudeSlider = createSlider(0, 1, 0, 0.01);
    amplitudeSlider.position(10, 40 + i * 30);
    amplitudeSliders.push(amplitudeSlider);
    
    // Create oscillator objects
    let oscillator = new p5.Oscillator();
    oscillator.setType('sine');
    oscillator.start();
    oscillators.push(oscillator);
  }
}

function draw() {
  background(220);
  
  // Get frequency value from the slider
  let frequency = frequencySlider.value();
  
  // Set the frequency for each oscillator
  for (let i = 0; i < numOscillators; i++) {
    oscillators[i].freq(frequency * (i + 1));
    
    // Get amplitude value from the corresponding slider
    let amplitude = amplitudeSliders[i].value();
    oscillators[i].amp(amplitude);
    
    // Display the amplitude value for each oscillator
    fill(0);
    textSize(12);
    text(`Oscillator ${i + 1} Amplitude: ${amplitude}`, amplitudeSliders[i].x + amplitudeSliders[i].width + 10, amplitudeSliders[i].y + 15);
  }
  
  // Display the frequency value
  fill(0);
  textSize(12);
  text(`Frequency: ${frequency} Hz`, frequencySlider.x + frequencySlider.width + 10, frequencySlider.y + 15);
}`

After a while of taking a break from the project, I came back with the right idea in mind. When we first used p5.js we were already introduced to key mapping; although it was used with wav files instead of frequencies, the same principal could be applied to my code. At first, I thought about mapping a frequency to each key, but as I was trying to find the frequency of each note, I realized that I could instead assign each key to to a midi note since the midi notes were already connected to the frequencies. At the end of the process had something that looked like this:

`let keyToMidi = {
  'a': 60, 
  's': 62, 
  'd': 64, 
  'f': 65, 
  'g': 67, 
  'h': 69, 
  'j': 71, 
  'k': 72  
};`

What this chunk of code allows me to do is play a major scale using the keys a-k. Although it's simple, it gets the job done with no issues. I followed this part with another chunk of code that created a graphic with the instructions to the synth. The code looked like this:

`function draw() {
  background(0);
  fill(255);
  text("Play notes with A–K keys", width / 2, height / 2);
}`

Once again, although it was simple, it got the job done.

### Part 3: Understanding Oscillators
Now at this point in my project, I still didn't have actual sound. I had concepts to create sound within my code, but nothing actually produced any sound at all. This is where I began to figure out how to use oscillators. This was the part I had worried about since starting this project because I had zero clue about how I was going to get sound. Luckily, when I was working on trying to map the midi values to my keys, the two sketches I had come across both showed how they used oscillators and made sound. This was a tremendous help because: 1) I knew exactly which part of the code I should study (oscillators) and 2) I could steal chunks of their code to use for myself. At the end of my process working with the oscillators I had something that looked like this:

`function keyPressed() {
  let midiNote = keyToMidi[key];
  if (midiNote && !activeOscillators[key]) {
    let freq = midiToFreq(midiNote);

    let osc = new p5.Oscillator('sine');
    osc.freq(freq);
    osc.amp(0.5);
    osc.start();

    activeOscillators[key] = osc;
  }
}

function keyReleased() {
  if (activeOscillators[key]) {
    activeOscillators[key].amp(0, 0.3);
    activeOscillators[key].stop(0.3);
    delete activeOscillators[key];
  }
}`
	
### Part 4: How I Got The Oscillator Code (Interlude)
Obviously, the finished code I came out with when I was done working with the oscillators was a massive chunk of the project, so there was a lot more that went into it rather than just copying and pasting code from other creators. That said, despite my own inexperience with coding language, the process was much simpler than I thought it would be due to my musical knowledge. After I hit a roadblock trying to make sound I realized that I should take a step back and go back to basics. I knew that oscillators needed a frequency, a type of wave, an amplitude, and a signal that can be turned on and off, so after breaking down what I already knew about oscillators, I began to study how I could convert these ideas to code. Luckily for me, p5.js reference had absolutely everything I needed. It had functions called osc.amp, p5.SinOsc, OscSet, and the rest of what I needed was found in the tutorials and demos. This led me to begin working on the additive part of the code.

### Part 5: Additive Synthesis
Although I had created a synth using MidiToFreq() and figured out the oscillators, it wasn't an additive synth because it didn't have multiple frequencies stacked on top of each other to make sound, so my search for an answer to this problem led me to a line of code in "troyapeterson"'s additive synth sketch:

`for (let i = 0; i < numOscillators; i++) {
    oscillators[i].freq(frequency * (i + 1));`
	
This line of code came with the explanation that it was setting the frequency for each oscillator, and it made me realize that this line of code would be the back bone of the additive part of the code. After days of trying to understand how I could impliment this code, I made this:

`function harmonics(baseFreq, count) {
  let freqs = [];
  for (let i = 1; i <= count; i++) {
    freqs.push(baseFreq * i);
  }
  return freqs;
}`

How this chunk of code works is by basically creating harmonics that are multiples of a base frequency that matches the midi notes. Now, there was still a lot of work to do, and the reason it took me days to make this chunk is because it was connected to other sections of my code that I will show in this upcoming section.

### Part 6: More Additive Synthesis (this part hurt my brain)
So you may have noticed that my coding process for this final went like this: I deep dived into research material, messed around with functions I found, realized I'm overcomplexing everything, got excited when I realized building the code is exactly like working a synth, began to build momentum by breaking everything down into parts, and now, this is where all of that broke down because I ended up having to edit previous code I wrote to include the harmonics I wanted to. At first, I didn't want to do this. It didn't make sense to me, and I was fustrated that things weren't going my way. After a while of avoiding what I needed to do, I came back refreshed and realized what I needed to do. Once again, it was simpler than I thought. Instead of treating additive synthesis as a section of it's own, I had to treat it frequencies (DUH!). Since this was me going back into my code and basically adding lines here and there as well as editing stuff, by the time I was done, everything was finished and the code looked like this:

`let activeOscillators = {}; 
let amplitudes = [0.5, 0.25, 0.125, 0.0625];
let keyToMidi = {
  'a': 60,
  'w': 61,
  's': 62,
  'e': 63,
  'd': 64, 
  'f': 65,
  't': 66,
  'g': 67,
  'y': 68,
  'h': 69,
  'u': 70,
  'j': 71, 
  'k': 72  
};

function setup() {
  createCanvas(400, 200);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(0);
  fill(255);
  text("Play notes with A–K keys", width / 2, height / 2);
}

function keyPressed() {
  let midiNote = keyToMidi[key];
  if (midiNote && !activeOscillators[key]) {
    let freqs = harmonics(midiToFreq(midiNote), amplitudes.length);
    let oscSet = [];

    for (let i = 0; i < freqs.length; i++) {
      let osc = new p5.Oscillator('sine');
      osc.freq(freqs[i]);
      osc.amp(amplitudes[i]);
      osc.start();
      oscSet.push(osc);
    }

    activeOscillators[key] = oscSet;
  }
}

function keyReleased() {
  if (activeOscillators[key]) {
    activeOscillators[key].forEach(osc => {
      osc.amp(0, 0.3);
      osc.stop(0.3);
    });
    delete activeOscillators[key];
  }
}

function harmonics(baseFreq, count) {
  let freqs = [];
  for (let i = 1; i <= count; i++) {
    freqs.push(baseFreq * i);
  }
  return freqs;
}`

Now, this will take quite a bit of explanation as to what I did and added, so it's time for a sequel.

### Part 6 1/2: The Sequel
I will start by explaining this code:

`let amplitudes = [0.5, 0.25, 0.125, 0.0625];`

This is a super simple line that gives the sound more of a sense of timbre. It gives each frequency a different amplitude which emphasizes some frequencies more than others. Now this was just something I added after I finished building the harmonics. The next chunk of code I explain will be much more integral.

`function keyPressed() {
  let midiNote = keyToMidi[key];
  if (midiNote && !activeOscillators[key]) {
    let freqs = harmonics(midiToFreq(midiNote), amplitudes.length);
    let oscSet = [];

    for (let i = 0; i < freqs.length; i++) {
      let osc = new p5.Oscillator('sine');
      osc.freq(freqs[i]);
      osc.amp(amplitudes[i]);
      osc.start();
      oscSet.push(osc);
    }

    activeOscillators[key] = oscSet;
  }
}`

Now what I added to this chunk of code were basically just a few lines that include harmonics to the frequencies being played, but I'll explain them in part

`let freqs = harmonics(midiToFreq(midiNote), amplitudes.length);`

This line allows the code to create harmonic frequencies based off the original base frequency being played. There's more that goes into this, but this is the first line of code that starts it.

`for (let i = 0; i < freqs.length; i++) {
      let osc = new p5.Oscillator('sine');
      osc.freq(freqs[i]);
      osc.amp(amplitudes[i]);
      osc.start();
      oscSet.push(osc);
    }`
	
Now this chunk is an altered version of the code I wrote for the oscillators. What I did when I edited it was give each harmonic an oscillator that follows the amplitude set by the amplitude line at the beginning of the sketch. It also stores all of the frequencies in an oscSet.

The next chunk I will talk about is this:

`function keyReleased() {
  if (activeOscillators[key]) {
    activeOscillators[key].forEach(osc => {
      osc.amp(0, 0.3); // fade out over 0.3s
      osc.stop(0.3);   // stop after fade
    });
    delete activeOscillators[key];
  }
}`

This chunk just ends and fades out the frequencies. I wanted to impliment ADSR but didn't have the time. 

### Part 7: The End?
With the time I had been given, this was what I had been able to accomplish, but I don't plan on being completely finished with this patch. I would love to add adsr, midi implimentation, and work with other waves and such. What I'm most interested in doing with this work though is using what I've learned to translate it to other programs like supercollider or even non-coding programs like max or ableton. Due to how nitty gritty coding is, it actually ended up teaching me a lot about how to work a synth despite me having used synths for years now.






