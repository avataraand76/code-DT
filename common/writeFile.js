const fs = require("fs");
const path = require("path");
exports.writeFile = (pathFile, content) => {
  const filePath = path.join(__dirname, pathFile);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("An error occurred while writing to the file:", err);
      return;
    }
    console.log("File has been written successfully!");
  });
};
exports.readFileJson = (pathFile) => {
  const filePath = path.join(__dirname, pathFile);
  let dataJson = null;
  // Read the JSON file
  try {
    // Read and parse the JSON file synchronously
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("An error occurred:", err);
  }

  return dataJson;
};
