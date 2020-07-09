import csv from "csvtojson";
import fs from "fs";

const readStream = fs.createReadStream("../../assets/source.csv");
const writeStream = fs.createWriteStream("./contentStream.txt");

readStream.pipe(csv()).pipe(writeStream);
