const CSVToJSON = require("csvtojson");
const fs = require("fs");

async function convertToJson() {
  try {
    const source = await CSVToJSON().fromFile("../assets/source.csv");
    writeSourceTotxt(source);
  } catch (error) {
    console.log(error);
  }
}

function writeSourceTotxt(payload) {
  const filePath = "content.txt";
  fs.openSync(filePath, "w");
  payload.forEach((element) => {
    fs.appendFile("content.txt", `${JSON.stringify(element)}\n`, (err) => {
      if (err) return console.log(err);
    });
  });
  console.log("Content Updated in : " + filePath);
  fs.closeSync(fs.openSync("content.txt", "w"));
}

convertToJson();
