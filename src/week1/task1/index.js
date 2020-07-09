const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Enter Any value?`, (name) => {
  const res = name
    .split("")
    .reverse((a, b) => {
      return a - b;
    })
    .join("");
  console.log(res);
  readline.close();
});
