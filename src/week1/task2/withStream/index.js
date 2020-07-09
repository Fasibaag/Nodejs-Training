const csv = require("csvtojson");
const fs = require("fs");

const readStream = fs.createReadStream("../../assets/source.csv");
const writeStream = fs.createWriteStream("./contentStream.txt");
readStream.pipe(csv()).pipe(writeStream);
