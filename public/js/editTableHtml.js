var targetPre = null;
var isEdit = false;
var rowIndexInser = -1;
const socket = io();
let new_id = [];
var tableData = [];
function areArraysEqual(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
        return false;
    }

    // Compare each object by stringifying them
    for (let i = 0; i < array1.length; i++) {
        if (JSON.stringify(array1[i]) !== JSON.stringify(array2[i])) {
            return false;
        }
    }

    return true;
}
document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById(dataTableId); 
  table.addEventListener("click", function (event) {
    let target = event.target;
    if (targetPre == null || targetPre.parentNode == null) {
      targetPre = target;
      isEdit = true;
    } else {
      row = target.parentElement;
      if (
        row.rowIndex != undefined &&
        row.rowIndex != rowIndex &&
        row.rowIndex != 0
      ) {
        saveRow(targetPre.parentNode);
        rowIndex = row.rowIndex;
        targetPre.parentNode.style.background = "none";
        targetPre = target;
        isEdit = true;
      } else {
        isEdit = false;
      }
    }
    // Get the column index
    let colIndex = event.target.cellIndex;
    console.log(
      " index click: ",
      colIndex,
      " - ",
      event.target.parentNode.rowIndex
    );

    if (target.tagName.toLowerCase() === "td") {
      let row = target.parentNode;
      if (colIndex < headerSize && row != null && isEdit) {
        if (
          dataTable.headTable.filter((item) => item.index == colIndex)[0]
            ?.name != "no"
        ) {
          editRow(row);
          rowIndexInser = -1;
        } else {
          row.style.background = "rgba(211, 211, 211, 0.8)";
          rowIndexInser = row.rowIndex;
          rowIndex = -1;
        }
      }
    }
    if (rowIndexInser >= 0) {
      const area_btn_insert = document.getElementById("area_btn_insert");
      let btn_insert = document.createElement("button");
      btn_insert.className = "btn btn-primary";
      btn_insert.innerText = "Insert Row";
      btn_insert.style.marginRight = "10px";
      btn_insert.addEventListener("click", function () {
        newRow(rowIndexInser);
      });
      let btn_delete = document.createElement("button");
      btn_delete.className = "btn btn-warning";
      btn_delete.innerText = "Insert Row";
      btn_delete.style.marginRight = "10px";
      btn_delete.addEventListener("click", function () {
        area_btn_insert.replaceChildren();
        newRow(rowIndexInser);
      });
      area_btn_insert.replaceChildren();
      area_btn_insert.appendChild(btn_insert);
    }
  });
  function newRow(rowIndexInser) {
    socket.emit("get new id", null);
    socket.on("get new id", function (id) {
      new_id.push(id);
    });
    const tbody = table.getElementsByTagName("tbody")[0];
    const newRow = document.createElement("tr");

    for (let index = 0; index < dataTable.headTable.length; index++) {
      let headCell = dataTable.headTable.filter((item) => item.index == index);
      if (headCell != null && headCell != undefined && headCell.length == 1) {
        const cell = document.createElement("td");
        if (headCell[0].name === "no") {
          cell.innerHTML =
            "" + rowIndexInser + '<input type="hidden" name="id" value="">';
        } else {
          cell.innerHTML = "";
        }
        newRow.appendChild(cell);
      }
    }
    tbody.insertBefore(newRow, tbody.children[rowIndexInser]);
    editRow(newRow);
    targetPre.parentNode.style.background = "none";
    rowIndex = rowIndexInser;
    targetPre = newRow.childNodes[0];
  }

  function reLoadTbody(dataPre, dataNext) {
    const table = document.getElementById(dataTableId);
    const tbody = table.getElementsByTagName("tbody")[0];

    for (let indexRow = 0; indexRow < dataNext.length; indexRow++) {
      let filterData = dataPre.filter(
        (item) => item.id == dataNext[indexRow].id
      );
      if (filterData == null || filterData.length == 0) {
        const newRow = document.createElement("tr");
        for (let index = 0; index < dataTable.headTable.length; index++) {
          let headCell = dataTable.headTable.filter(
            (item) => item.index == index
          );
          if (
            headCell != null &&
            headCell != undefined &&
            headCell.length == 1
          ) {
            const cell = document.createElement("td");
            if (headCell[0].name === "no") {
              cell.innerHTML =
                "" +
                indexRow +
                '<input type="hidden" name="id" value="' +
                dataNext[indexRow].id +
                '">';
            } else {
              cell.textContent = dataNext[indexRow][headCell[0].name];
            }
            newRow.appendChild(cell);
          }
        }
        tbody.insertBefore(newRow, tbody.children[indexRow]);
      }
      if (
        filterData[0].id == dataNext[indexRow]?.id &&
        filterData[0] != dataNext[indexRow]
      ) {
        let rows = tbody.querySelectorAll("tr");
        rows.forEach(function (row, rowIndex) {
          let cell_input = row.querySelectorAll("input")[0];
          if (cell_input?.value == dataNext[indexRow].id) {
            let cells = row.querySelectorAll("td");
            for (let index = 0; index < dataTable.headTable.length; index++) {
              let headCell = dataTable.headTable.filter(
                (item) => item.index == index
              );
              if (headCell[0]?.name != "no") {
                cells[index].textContent =
                  dataNext[indexRow][headCell[0]?.name];
              }
            }
          }
        });
      }
    }
    console.log(dataNext);
    tableData = dataNext;
  }

  function editRow(row) {
    let cells = row.querySelectorAll("td");
    cells.forEach(function (cell, index) {
      if (
        dataTable.headTable.filter((item) => item.index == index)[0]?.name !=
        "no"
      ) {
        let currentValue = cell.innerText;
        cell.innerHTML =
          '<textarea rows="4" cols="30">' + currentValue + "</textarea>";
      }
    });

    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", function () {
      saveRow(row);
    });

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.addEventListener("click", function () {
      cancelEdit(row);
    });

    let actionCell = document.createElement("td");
    actionCell.appendChild(saveButton);
    actionCell.appendChild(cancelButton);
    row.appendChild(actionCell);
  }

  function saveRow(row) {
    let inputs = row.querySelectorAll("textarea");
    inputs.forEach(function (input, index) {
      let cell = input.parentNode;

      cell.innerText = input.value;
    });
    if (row.childNodes?.length > headerSize) {
      row.removeChild(row.lastChild); // Remove the action buttons cell
      rowIndex = -1;
    }
    let cell_input = row.querySelectorAll("input");
    new_id = new_id.filter((item, index) => new_id.indexOf(item) === index);
    if (
      cell_input != null &&
      cell_input.length == 1 &&
      (cell_input[0].value == null ||
        cell_input[0].value == "" ||
        cell_input[0].value == undefined)
    ) {
      cell_input[0].value = new_id[0];
      new_id.splice(0, 1);
    }
    tableData = convertTableToJSON();

    socket.emit(nameGetData, tableData);
  }

  function cancelEdit(row) {
    let inputs = row.querySelectorAll("textarea");
    inputs.forEach(function (input) {
      let cell = input.parentNode;
      cell.innerText = input.value;
    });
    if (row.childNodes?.length > headerSize) {
      row.removeChild(row.lastChild); // Remove the action buttons cell
      rowIndex = -1;
    }
  }
  socket.on(nameGetData, function (data) {
    console.log(data);
    if (tableData == null || tableData.length == 0)
      tableData = dataTable.bodyTable;
    if (!areArraysEqual(tableData, data)) reLoadTbody(tableData, data);
  });
});
