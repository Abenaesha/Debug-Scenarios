"use strict"

var count = 0
var subCount = 0
const fs = require("fs")
const {json2csv} = require("json-2-csv")

/* In this example we can see the processing of some .json files and writing them as a .csv file
 * there are at least four problems here:
 * 1) the commented code crashes when uncommented because the directories already exist
 * 2) the program crashes for another reason, what is it?
 * 3) the timing of this needs to be changed to look for files every 15 seconds
 * 4) the output to CSV is messy, can it be tidied up so that each inventory item appears on it's own line?
 * 5) feel free to optimise the code in any other way
 */

const mainCode = () => {
	console.log("Main code execution")
	count += 1
	console.log("main count: " + count)
	writeInventoryToArray1(
		"./data/jsonData",
		"./data/csvData",
		"./data/Processed"
	)
	setTimeout(testSubFunction, 2000)
}

const writeInventoryToArray1 = (
	folderSource,
	folderOutput,
	folderProcessed
) => {
	fs.readdir(folderSource, (err, files) => {
		files.forEach((file) => {
			let fileType = file.indexOf(".json")
			if (fileType !== -1) {
				fs.readFile(folderSource + "/" + file, (err, data) => {
					if (err) {
						console.log(err)
					} else {
						let JSONFile = JSON.parse(data)

						// ------ with library -------
						// json2csv( JSONFile, ( err, csv ) => {
						// 	if (err) console.log(err);

						// 	if (!fs.existsSync(folderOutput)) {
						// 		fs.mkdirSync( folderOutput, ( err ) => {
						// 			console.log( err );
						// 		} );
						// 	} else {
						// 		fs.appendFileSync(`${folderOutput}/Output.csv`, csv)
						// 	};
						// })
						// ------------------------------

						let csvData = convertJSONToCSV(JSONFile)
						let csvWithLineBreak = csvData.split(", ").join("\n")
						console.log(csvWithLineBreak)

						if (!fs.existsSync(folderOutput)) {
							fs.mkdirSync(folderOutput, (err) => {
								console.log(err)
							})
						} else {
							fs.appendFileSync(`${folderOutput}/Output.csv`, csvWithLineBreak)
						}

						if (!fs.existsSync(folderProcessed)) {
							fs.mkdir(folderProcessed, (err) => {
								console.log(err)
							})
						} else {
							fs.rename(
								`${folderSource}/${file}`,
								`${folderProcessed}/${file}`,
								(err) => {
									if (err) console.log(err)
								}
							)
						}
					}
				})
			}
		})
	})
}

const convertJSONToCSV = (obj) => {
	let arrOfObj = []
	arrOfObj.push(obj)
	let toCSV = arrOfObj.map((row) => {
		return Object.values(row)
	})
	toCSV.unshift(Object.keys(arrOfObj[0]))
	return toCSV.join(", ")
}

const testSubFunction = () => {
	subCount += 1
	console.log("sub function execution")
	console.log("sub count: " + subCount)
	performNext()
}

const performNext = () => {
	if (count >= 10) {
		console.log("Exit loop")
	} else {
		setTimeout(mainCode, 15000)
	}
}

console.log("code execution before main code loop")
mainCode()
console.log("code execution outside of function calls")
