let count = 0;
let wordCount = 0;


/* In this example we have two functions that are called and run 
 * every second for a set amount of times. In reality these functions
 * could take anywhere from 30 seconds to 10 minutes to complete and we want to make
 * it so that the repeat a word function does not start until the countToNumberFrom1 function
 * finishes. Can you adapt the code to make the functions run in sequence?
 */

function countToNumberFrom1(number) {
    setTimeout(function countToNumberDelay() {
        count += 1;
        console.log(count);
        if (count < number) {
            countToNumberFrom1(number);
        }
    }, 1000);
}

function repeatAWord(word,number) {
    setTimeout(function repeatAWordDelay() {
        wordCount += 1;
        console.log(word);
        if (wordCount < number) {
            repeatAWord(word,number);
        }
    }, 1000);
}


countToNumberFrom1(10);
repeatAWord("Hello",10);
