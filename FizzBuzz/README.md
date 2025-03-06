# FizzBuzz Documentation

### What I did
I made a few lines of code that list numbers from 1 to 100, and any number divisable by 3 is replaced by "Fizz", any number divisable by 5 is replaced by "Buzz", and any number divisable by both is replaced by "FizzBuzz".

### How I did it
I regretted starting this assignment late because what made sense to me during the lecture was completely forgotton, so I had to use both the code along and the "Eloquent Javascript" book heavily thoughout my process. 

In the code along, it explained how to create a loop, and the book helped me find the start of the coding process. The book shows this pattern in the "For Loops" section of "Program Structure" chapter:

`for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
}`

I matched this string of code with the codealong we did for loops and figured out that what I had to do start with was this line of code:

`for (let i = 1; i <= 100; i++)`

This shows that the intiger list starts on one and the entire list will be less than or equal to 100. The "i++" means that "i + = 1" and I found this in the book underneath the line of code I found.

After this intial line of code that lays the foundations for the next lines, I started setting the parameters. I started by setting the parameters for "FizzBuzz" because it seemed easier to break things down rather than build them up.

"FizzBuzz" needed to be printed whenever a number was divisible by both 3 and 5, so I just replicated this string of code that was in the code along:

`if (i % 7 === 0 && i % 5 === 0)
    console.log(i);`

This line of code took into account all parameters needed to print "FizzBuzz".

The parameters after this were super simple because I was basically just breaking down the line of code that prints "FizzBuzz". The rest of the code I made looks like this:

`else if (i % 3 === 0) {
    console.log ("Fizz");
} else if (i % 5 === 0) {
    console.log ("Buzz");
} else {
    console.log (i);`

The first line prints "Fizz" when an integer in the list is divisable by 3, and the third line prints "Buzz" when an integer in the list is divisable by 5. Lastly, the final two lines of code just print the integer as it is if it does not match any of the prerequisites to print the words.

At the end of the coding session, my code looked like this:

`for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log ("FizzBuzz");
} else if (i % 3 === 0) {
    console.log ("Fizz");
} else if (i % 5 === 0) {
    console.log ("Buzz");
} else {
    console.log (i);
}
}`

The hardest part about getting this final result were the brackets. I struggled with where to put them for a while. I kept trying to replicate the code along, but I just kept missing where they supposed to go because I didn't understand them. It a bit of trial and error until I realized that there needs to be another bracket at the bottom to encompass the totality of the code. 

I believe that's all of the most important details, but a lot of this was done through trial and error. I had both the code along and the book, but I had to try and struggle with some things before it clicked in my mind where they should go.