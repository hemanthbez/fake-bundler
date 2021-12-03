// @ts-check

const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} content
 */
function parseForImport(content) {
  const lines = content.split(/\r?\n/);
  const imports = lines.filter((l) => l.startsWith("--import ")).map((l) => l.replace("--import ", ""));
  const parsed = lines.filter((l) => !l.startsWith("--import ")).join("\n");

  return {
    imports,
    parsed,
  };
}

/**
 * a iterative graph traversal "bundler" that will take an entry point, and a src path
 * outputs a string that is the content of all the files in reverse traversal order
 * @param {string} entry 
 * @param {string} src 
 * @returns string
 */
module.exports = function bundle(entry, src) {
  // TODO: write a iterative graph traversal "bundler" here
  
  // console.log("entry --> "+ entry);
  // console.log("src --> "+ src);

  const buffer = fs.readFileSync(path.join(src, entry));
  // console.log('buffer --> ' + buffer.toString());

  const fileDataString = buffer.toString();

  let parsedOutputArray = [];

  let fileDataParsed = parseForImport(fileDataString);
  let fileDataParsedImports = fileDataParsed.imports,
      fileDataParsedOutput = fileDataParsed.parsed;

  // console.log("fileDataParsedImports --> " + fileDataParsedImports)
  // console.log("fileDataParsedOutput --> " + fileDataParsedOutput)

   if (fileDataParsedImports.length == 0) {
     return fileDataParsedOutput;
   } else {
     fileDataParsedImports.forEach(importEntry => {
      //  console.log("importEntry --> " + importEntry)
       parsedOutputArray.push(bundle(importEntry, src));
    });
  }

  parsedOutputArray.push(fileDataParsedOutput);
  
  return parsedOutputArray.join("\n");
 
}
