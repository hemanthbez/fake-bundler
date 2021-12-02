// @ts-check

const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} content
 * @returns
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
  let result = [];
  let visited = new Set();
  let stack = [entry];

  while (stack.length > 0) {
    const mod = stack.pop();

    if (!visited.has(mod)) {
      visited.add(mod);
      const content = fs.readFileSync(path.join(src, mod), "utf-8");
      const { imports, parsed } = parseForImport(content);

      result.unshift(parsed);

      for (const imported of imports) {
        stack.push(imported);
      }
    }
  }

  return result.join('\n');
}
