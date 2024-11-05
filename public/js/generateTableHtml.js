// Function to generate table
function generateTable(data) {
  var table = document.getElementById(dataTableId);

  if (
    data == null ||
    data.headTable == null ||
    data.headTable.length == 0 ||
    table == undefined ||
    table == null
  )
    return null;
  // Create table header
  const thead = table.createTHead();
  const headerRow = thead.insertRow();

  for (let index = 0; index < data.headTable.length; index++) {
    let headCell = data.headTable.filter((item) => item.index == index);
    if (headCell != null && headCell != undefined && headCell.length == 1) {
      const th = document.createElement("th");
      th.textContent = headCell[0].headerName;
      headerRow.appendChild(th);
    }
  }

  // Create table body
  const tbody = table.createTBody();
  data.bodyTable.forEach((rowTable, noRow) => {
    const row = tbody.insertRow();
    for (let index = 0; index < data.headTable.length; index++) {
      let headCell = data.headTable.filter((item) => item.index == index);
      if (headCell != null && headCell != undefined && headCell.length == 1) {
        const cell = row.insertCell();
        if (headCell[0].name === "no") {
          cell.innerHTML = "<p>"+(noRow + 1)+'</p><input type="hidden" name="id" value="'+rowTable["id"]+'">';
          cell.className = "align-items-center";
        } else {
          cell.textContent = rowTable[headCell[0].name];
        }
      }
    }
  });
}
