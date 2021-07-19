'use strict';

var count = 0;
var subCount = 0;
const fs = require('fs');

/* In this example we can see the processing of some .json files and writing them as a .csv file
 * there are at least four problems here:
 * 1) the commented code crashes when uncommented because the directories already exist
 * 2) the program crashes for another reason, what is it?
 * 3) the timing of this needs to be changed to look for files every 15 seconds
 * 4) the output to CSV is messy, can it be tidied up so that each inventory item appears on it's own line?
 * 5) feel free to optimise the code in any other way
*/

function mainCode() {

    console.log('Main code execution');
    count += 1;
    console.log('main count: ' + count);
    writeInventoryToArray1('C:/DevTest', 'C:/DevTest/Output', 'C:/DevTest/Processed');
    setTimeout(testSubFunction, 2000);

}


function writeInventoryToArray1(folderSource,folderOutput,folderProcessed) {

    fs.readdir(folderSource, (err, files) => {

        files.forEach(file => {

            let fileType = file.indexOf(".json");
            if (fileType != -1) {

                fs.readFile(folderSource + "/" + file, (err, data) => {
                    if (err) {

                        console.log(err);

                    }
                    else {

                        let JSONFile = JSON.parse(data);
                        console.log(files);
                        console.log(file);
                        console.log(JSON.stringify(data));
                        console.log(err);
                        console.log(JSONFile);
                        //fs.mkdirSync(folderProcessed, (err) => {
                        //    console.log(err);
                        //});
                        //fs.mkdirSync(folderOutput, (err) => {
                        //    console.log(err);
                        //});
                        fs.appendFileSync(folderOutput + "/Output.csv", JSON.stringify(JSONFile));
                        fs.rename(folderSource + "/" + file, folderProcessed + "/" + file, (err) => { });

                    }
                })
            }
        })
    })
}

function testSubFunction() {

    subCount += 1;
    console.log('sub function execution');
    console.log('sub count: ' + subCount);
    performNext();

}

function performNext() {

    if (count >= 10) {
        console.log('Exit loop');
    }
    else {
        setTimeout(mainCode, 2000);
    }

}



console.log('code execution before main code loop');
mainCode();
console.log('code execution outside of function calls');
