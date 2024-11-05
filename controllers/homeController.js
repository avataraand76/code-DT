const fs = require("fs");
const path = require("path");

// function checkData(dataTable, data) {
//   if (data == null || data == undefined || data.length == 0) {
//     data = [];
//     let row = {};
//     for (let index = 0; index < dataTable.headTable.length; index++) {
//       let header = dataTable.headTable.filter((item) => item.index == index);

//       if (header != null && header != undefined && header.length == 1) {
//         if (header[0].name === "no") {
//           row["id"] = Date.now();
//         } else {
//           row[header[0].name] = null;
//         }
//       }
//     }
//     data.push(row);
//     dataTable.bodyTable = data;
//   } else dataTable.bodyTable = data;
//   return dataTable;
// }
// // Sample data
// let dataTable = {
//   isShowBoxSearch: true,
//   headTable: [
//     { index: 0, name: "no", type: "int", headerName: "STT" },
//     { index: 1, name: "name", type: "string", headerName: "Tên" },
//     { index: 2, name: "age", type: "int", headerName: "Tuổi" },
//     { index: 3, name: "email", type: "string", headerName: "Email" },
//   ],
//   bodyTable: [],
// };
// try {
//   // Path to the JSON file
//   const filePath = path.join(__dirname, "../data/data_sample_dev/data.json");
//   console.log(filePath);
//   const data = fs.readFileSync(filePath, "utf8");
//   const jsonData = JSON.parse(data);
//   dataTable = checkData(dataTable, jsonData);
// } catch (err) {
//   dataTable = checkData(dataTable, null);
//   console.error("Error parsing JSON:", err.message);
// }


exports.index = (req, res) => {
  res.render("home", { title: "Home Page", page:{pageName:"Home"} });
};
