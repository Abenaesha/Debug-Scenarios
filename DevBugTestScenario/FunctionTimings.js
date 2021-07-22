let count = 0
let wordCount = 0

/* In this example we have two functions that are called and run
 * every second for a set amount of times. In reality these functions
 * could take anywhere from 30 seconds to 10 minutes to complete and we want to make
 * it so that the repeat a word function does not start until the countToNumberFrom1 function
 * finishes. Can you adapt the code to make the functions run in sequence?
 */

const countToNumberFrom1 = (number) => {
	setTimeout(() => {
		count++
		console.log(`count:  ${count}`)
		count < number ? countToNumberFrom1(number) : repeatAWord("Hello", 10)
	}, 250)
}

const repeatAWord = (word, number) => {
	setTimeout(() => {
		wordCount++
		console.log(`word:  ${word}`)
		if (wordCount < number) {
			repeatAWord(word, number)
		}
	}, 250)
}
countToNumberFrom1( 10 )


/*
Recursive Method

const countToNumberFrom1 = (count, number) => {
	setTimeout(() => {
  let nextNum = count += 1;
    console.log(`count: ${count}`)
    if (nextNum < number) {
      countToNumberFrom1(nextNum, number)
    } else {
      repeatAWord('Hello', 10)
    }
	}, 250)
}

countToNumberFrom1(0, 10)


-----------------------------


const countToNumberFrom1 = (number) => {
	setTimeout(() => {
  let nextNum = number - 1;
    count++;
    console.log(`count: ${count}`);
    nextNum > 0 ? countToNumberFrom1(nextNum) : repeatAWord('Hello', 10)
    }
	}, 250)
}

const repeatAWord = (word, number) => {
	setTimeout(() => {
    let nextNum = number - 1;
		console.log(`word:  ${word}`)
		if (nextNum > 0) {
			repeatAWord(word, nextNum)
		}
	}, 250)
}
countToNumberFrom1(10)
*/
