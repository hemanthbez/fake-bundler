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
  return "the result";
}
