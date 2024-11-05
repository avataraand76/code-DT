function convertTableToJSON() {
  const table = document.getElementById(dataTableId);
  const rows = table.querySelectorAll("tr");
  const json = [];
  // Extract headers
  const headerNames = [];
  const headers = rows[0].querySelectorAll("th");
  for (let i = 0; i < headers.length; i++) {
    let header = headers[i];
    if (header.textContent.trim() == "STT") {
      if (
        dataTable.headTable.filter((item) => item.index == i)[0]?.name == "no"
      ) {
        headerNames.push("id");
      }
    } else {
      let keyName = dataTable.headTable.filter(
        (item) => item.headerName == header.textContent.trim()
      );
      if (keyName && keyName.length == 1) {
        headerNames.push(keyName[0]?.name);
      }
    }
  }
  // Extract data from rows
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const rowData = {};

    cells.forEach((cell, index) => {
      if (headerNames[index] == "id") {
        let inputHidden = cell.querySelectorAll("input")[0];
        if (inputHidden != null) {
          rowData[headerNames[index]] = inputHidden.value.trim();
        }
      } else rowData[headerNames[index]] = cell.textContent.trim();
    });
    json.push(rowData);
  }
  return json;
}
