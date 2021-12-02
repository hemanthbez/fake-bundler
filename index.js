// @ts-check
const path = require("path");
const bundle = require("./bundle");

const result = bundle("./a.txt", path.join(__dirname, "src"));

if (
  result ===
  `This is a text file named "c.txt"
This is a test file named "d.txt"
This is a text file named "b.txt"
This is a text file named "a.txt"`
) {
  console.log("success");
} else {
  console.log("failure");
}
