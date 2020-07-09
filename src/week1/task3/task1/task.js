import readline from "readline";

export function readLineTask() {
  const readlineRef = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineRef.question(`Enter Any value?`, (name) => {
    const res = name
      .split("")
      .reverse((a, b) => {
        return a - b;
      })
      .join("");
    console.log(res);
    readlineRef.close();
  });
}
