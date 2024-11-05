const fs = require("fs");
const path = require("path");
const config = require("../data/constData");

function checkData(dataTable, data) {
  if (data == null || data == undefined || data.length == 0) {
    data = [];
    let row = {};
    for (let index = 0; index < dataTable.headTable.length; index++) {
      let header = dataTable.headTable.filter((item) => item.index == index);

      if (header != null && header != undefined && header.length == 1) {
        if (header[0].name === "no") {
          row["id"] = Date.now();
        } else {
          row[header[0].name] = null;
        }
      }
    }
    data.push(row);
    dataTable.bodyTable = data;
  } else dataTable.bodyTable = data;
  return dataTable;
}

exports.index = (req, res) => {
  // Sample data
  let dataTable = {
    isShowBoxSearch: true,
    headTable: [],
    bodyTable: [],
    dataTableId: config.dataConfig.data_sample_dev.dataTableId,
    nameGetData: config.dataConfig.data_sample_dev.nameGetData,
  };
  try {
    // Path to the JSON file
    const fileDataPath = path.join(
      __dirname,
      config.dataConfig.data_sample_dev.path_file_json
    );
    const data = fs.readFileSync(fileDataPath, "utf8");
    const jsonData = JSON.parse(data);
    dataTable = checkData(dataTable, jsonData);

    const fileHeadPath = path.join(
      __dirname,
      config.dataConfig.data_sample_dev.path_file_header_json
    );
    const dataHead = fs.readFileSync(fileHeadPath, "utf8");
    const jsonHead = JSON.parse(dataHead);
    dataTable.headTable = jsonHead;
  } catch (err) {
    dataTable = checkData(dataTable, null);
    console.error("Error parsing JSON:", err.message);
  }

  res.render("sampleDev", { title: "Sample Dev Page", dataTable: dataTable });
};
