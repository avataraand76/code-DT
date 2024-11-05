const fs = require("fs");
const path = require("path");
const config = require("../data/constData");

exports.readFileJson = (pathFile) => {
  // Path to the JSON file
  const filePath = path.join(__dirname, "../" + pathFile);
  // console.log(filePath);
  const data = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// 1. Add an item
exports.addArray = (list, item) => {
  if(list == undefined || list == null){
    list = [];
  }
  list.push(item);
  return list;
};

// 2. Update an item by id_issue
exports.updateArray = (list, id_value, id_name, updatedFields) => {
  let index = list.findIndex((item) => item[id_name] === id_value);
  if (index !== -1) {
    list[index] = { ...list[index], ...updatedFields };
  } else {
    console.log("Issue not found.");
  }
  return list;
};

// 3. Remove an item by id_issue
exports.removeItemInArray = (list, id_value, id_name) => {
  return list.filter((item) => item[id_name] !== id_value);
};

// 4. Search for an item by any property (e.g., id_issue)
exports.searchArray = (list, property, value) => {
  return list.filter((item) => {
    let valueItem = item[property];
    if(value == undefined || value == null || value === "") return true;
    if(valueItem != undefined && valueItem != null && valueItem.toLowerCase().indexOf(value.toLowerCase()) >=0) return true;
    return false;
  });
};
exports.searchArrayEmpty = (list, property, value) => {
  return list.filter((item) => {
    let valueItem = item[property];
    if(valueItem === value) return true;
    return false;
  });
};

exports.mergeList = (list1, list2)=>{
  list2.forEach(item2 => {
    // Kiểm tra xem id_issue của item2 có tồn tại trong list1 hay không
    const exists = list1.some(item1 => item1.id_issue === item2.id_issue);
    
    // Nếu không tồn tại, thêm item2 vào list1
    if (!exists) {
      list1.push(item2);
    }
  });
  return list1;
}

exports.paginateList = (list, pageSize, pageNumber)=>{
  // Tính chỉ số bắt đầu và kết thúc của trang
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  // Trích xuất các phần tử tương ứng cho trang hiện tại
  return list.slice(start, end);
}

// Hàm viết file với async/await
async function writeToFile(filename, data) {
  try {
    await fs.promises.writeFile(filename, JSON.stringify(data, null, 2));
    console.log("File đã được ghi thành công.");
  } catch (error) {
    console.error("Lỗi khi ghi file:", error);
  }
}
function getMaxId(list, id_name) {
  if (list == undefined || list == null ||list.length === 0) return 0; // Nếu mảng trống

  const maxId = Math.max(...list.map((item) => parseInt(item[id_name])));
  return maxId;
}
exports.getCurrentDateTime = ()=>{
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cộng thêm 1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Function to write JSON to file
exports.updateFile = (filename, data) => {
  writeToFile(filename, data);
};

exports.addIssueToFile = (data) => {
  const pathFile = "data/data_issue/listIssue.json";
  let listIssue = this.readFileJson(pathFile);
  const maxId = getMaxId(listIssue, "id_issue");
  data = { ...data, id_issue: (maxId + 1).toString() };
  listIssue = this.addArray(listIssue, data);
  writeToFile("./" + pathFile, listIssue);
};
exports.addProductRecordToFile = (data) => {
  const pathFile = "data/data_product_record/listInfo.json";
  let listInfo = this.readFileJson(pathFile);
  const maxId = getMaxId(listInfo, "id_product_record");
  data = { ...data, id_product: (maxId + 1).toString() };
  listInfo = this.addArray(listInfo, data);
  writeToFile("./" + pathFile, listInfo);
};
exports.updateIssueToFile = (data) => {
  const pathFile = "data/data_issue/listIssue.json";
  let listIssue = this.readFileJson(pathFile);
  listIssue = this.updateArray(listIssue, data.id_issue, "id_issue", data);
  writeToFile("./" + pathFile, listIssue);
};
exports.removeIssueToFile = (data) => {
  const pathFile = "data/data_issue/listIssue.json";
  let listIssue = this.readFileJson(pathFile);
  listIssue = this.removeItemInArray(listIssue, data.id_issue, "id_issue");
  writeToFile("./" + pathFile, listIssue);
};
exports.convertFileJsonIssueToExcel = (mappedIssues) => {
  // Convert JSON data to a worksheet
  const xlsx = require('xlsx');
    // Đọc file Excel hiện có
  const workbook = xlsx.readFile(config.dataConfig.data_excel.path_save_file);

  // Lấy sheet đầu tiên từ workbook
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  mappedIssues = mappedIssues.map(item => ({
    "Mã vấn đề": item.id_issue,
    "Team": item.team,
    "Thiết bị": item.device,
    "Loại vấn đề": item.type,
    "Sản phẩm": item.product,
    "Màu in": item.color,
    "Màu in mới": item.colornew,
    "Chuyển đổi Job": item.transition_product,
    "Job mới": item.productnew,
    "Mô tả vấn đề": item.description_issue,
    "Mô tả vấn đề (Khác)": item.issue_other,
    "Thời gian tạo": item.time_create,
    "Thời gian hoàn thành": item.time_done,
    "Hướng Dẫn Khắc phục": item.hdkp,
    "Hướng Dẫn Khắc phục (Khác)": item.hdkp_other,
    "Người giải quyết vấn đề": item.problem_solver,
    "Người ghi nhận vấn đề": item.person_log_issue,
    "Chuyển đổi màu sắc": item.transition_color
  }));
  // const worksheet = xlsx.utils.json_to_sheet(mappedIssues);
  // Đổi tên các cột
  // const columnNames = { A1: { v: "Tên" }, B1: { v: "Tuổi" }, C1: { v: "Thành Phố" } };
  // Object.assign(worksheet, columnNames);
  // Create a new workbook and append the worksheet
  // const workbook = xlsx.utils.book_new();
  // xlsx.utils.book_append_sheet(workbook, worksheet, 'Danh Sách Vấn Đề');

  // Write the workbook to an Excel file
  // console.log(config.dataConfig.data_excel.path_save_file);

  // Chuyển đổi dữ liệu mới thành định dạng sheet
  //const newWorksheet = xlsx.utils.json_to_sheet(mappedIssues, { skipHeader: true, origin: -1 });

  // Cập nhật worksheet cũ với dữ liệu mới
  xlsx.utils.sheet_add_json(worksheet, mappedIssues, { skipHeader: true, origin: -1 });
  xlsx.writeFile(workbook, config.dataConfig.data_excel.path_save_file);

  console.log('Excel file created successfully as output.xlsx');
  };
exports.mapDataIssue = (issue, mappings) => {
  let type_issue = mappings.type_issue.find(t => t.key === issue.type);
  let product_content = "";
  if(issue.transition_product){
    product_content = "chuyển đổi Job: ".concat(issue.product).concat(" sang ").concat(issue.productnew);
  }
  let color_content = "";
  if(issue.transition_color){
    color_content = "chuyển đổi Màu: ".concat(issue.color).concat(" sang ").concat(issue.colornew);
  }
  return {
    ...issue,
    product_content: product_content,
    color_content: color_content,
    team: mappings.team.find(t => t.key === issue.team)?.value || issue.team,
    device: mappings.device.find(d => d.key === issue.device)?.value || issue.device,
    type: type_issue?.value || issue.type,
    description_issue: mappings[type_issue?.name]?.find(di => di.key === issue.description_issue)?.value || issue.description_issue,
    hdkp: mappings[type_issue?.hdkp]?.find(di => di.key === issue.hdkp)?.value || issue.hdkp,
    person_log_issue: mappings.person_log_issue.find(p => p.key === issue.person_log_issue)?.value || issue.person_log_issue,
    problem_solver: mappings.problem_solver.find(p => p.key === issue.problem_solver)?.value || issue.problem_solver
  };
};
exports.encodeStringToHtml = (text)=>{
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#47;'
  };
  return text?.replace(/[&<>"'/]/g, function(match) {
      return map[match];
  });
};