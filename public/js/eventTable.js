const socket = io();
var tableData = [];
var statusShowEditRow = false;
var targetRow = null;
let new_id = [];

const compareArrayEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  // Compare each object by stringifying them
  for (let i = 0; i < array1.length; i++) {
    if (
      $.trim(JSON.stringify(array1[i])) !== $.trim(JSON.stringify(array2[i]))
    ) {
      return false;
    }
  }
};
$(document).ready(function () {
  $("table").dblclick(function (event) {
    let itemClick = event.target;
    // if show edit = false show tag edit
    if (statusShowEditRow == false) {
      let cellName = dataTable.headTable.filter(
        (item) => item.index == $(itemClick).index()
      )[0]?.name;
      statusShowEditRow = true;
      if (cellName != "no") {
        showEditRow(itemClick);
      } else {
        if ($(itemClick).prop("nodeName") === "P") {
          itemClick = $(itemClick).parent();
        }
        let id = $(itemClick).find("input").val();
        $(itemClick).html(
          formatString(
            "<p></p><input type='hidden' name='id' value='{0}'>" +
              "<button id='addRowUp' onclick='addRowUp(this)' class='btn btn-link btn-sm'><i class='bi bi-arrow-bar-up'></i></button>" +
              "<button id='deleteRow' onclick='deleteRow(this)' class='btn btn-link btn-sm'><i class='bi bi-x-square'></i></button>" +
              "<button id='addRowBottom' onclick='addRowBottom(this)' class='btn btn-link btn-sm'><i class='bi bi-arrow-bar-down'></i></button>",
            id
          )
        );
      }
    }
  });
  $("table").click(function (event) {
    // if show tag edit then hide edit
    let itemClick = event.target;
    let itemRow = $(itemClick).parent();
    if (itemRow.prop("nodeName") === "TD") {
      itemRow = $(itemRow).parent();
    }
    if (itemRow.index() != targetRow?.index()) {
      $(targetRow).css("background-color", "");
      $(targetRow)
        .children()
        .each(function (index, element) {
          $(element).css("border", "1px solid black");
          $(element).find("button").remove();
        });
      $(itemRow).css("background-color", "rgba(142, 188, 248, 0.5)");
      $(itemRow)
        .children()
        .each(function (index, element) {
          $(element).css("border", "2px solid black");
        });
    }
    if (statusShowEditRow == true && itemRow.index() != targetRow.index()) {
      hideEditRow();
    }
    targetRow = itemRow;
  });
  $("#" + dataTableId).on("change", "input, select, textarea", function () {
    // Xử lý sự kiện khi có thay đổi trong bất kỳ input, select, hoặc textarea nào

    tableData = convertTableToJSON();
    socket.emit(nameGetData, tableData);
    console.log("Changed value:", $(this).val());

    // Có thể thêm các logic khác tại đây
  });
  
  timeoutTable();
});
const timeoutTable  = () => {
  setTimeout(() => {
    if (new_id != null && new_id != undefined && new_id.length > 0) {
      resetNoRowTable();
    }
    timeoutTable();
  }, 1000);
};
socket.on(nameGetData, function (data) {
  console.log(data);
  if (tableData == null || tableData.length == 0)
    tableData = dataTable.bodyTable;
  //if (!compareArrayEqual(tableData, data)) reLoadTbody(data);
});
socket.on("get new id", function (id) {
  if (id != null) {
    new_id.push(id);
    new_id = new_id.filter((item, index) => new_id.indexOf(item) === index);
  }
});
const deleteRow = (item) => {
  let row = $(item).parent().parent();
  if (row.prop("nodeName") === "TD") {
    row = $(row).parent();
  }
  $(row).eq(0).remove();
  tableData = convertTableToJSON();
  socket.emit(nameGetData, tableData);
  resetNoRowTable();
};
const genRowHtml = () => {
  socket.emit("get new id", "sample_dev");

  let html =
    "<tr><td><p>New Row</p><input type='hidden' name='id' value=''/></td>";
  if (new_id && new_id.length > 0) {
    html = formatString(
      "<tr><td><p>New Row</p><input type='hidden' name='id' value='{0}'/></td>",
      new_id[0]
    );
    new_id.splice(0, 1);
  }
  for (let index = 1; index < dataTable.headTable.length; index++) {
    html += "<td> </td>";
  }
  html += "</tr>";
  return html;
};
const addRowUp = (item) => {
  let row = $(item).parent().parent();
  if (row.prop("nodeName") === "TD") {
    row = $(row).parent();
  }
  $(row).before(genRowHtml());
  resetNoRowTable();
};
const addRowBottom = (item) => {
  let row = $(item).parent().parent();
  if (row.prop("nodeName") === "TD") {
    row = $(row).parent();
  }
  $(row).after(genRowHtml());
  resetNoRowTable();
};
const showEditRow = (cell) => {
  if (statusShowEditRow == true) {
    targetRow = $(cell).parent();
    targetRow.children().each(function (index, element) {
      if (
        dataTable.headTable.filter((item) => item.index == index)[0]?.name !=
        "no"
      ) {
        $(element).html(
          formatString(
            "<textarea rows='4' cols='30'>{0}</textarea>",
            $(element).text()
          )
        );
      }
    });
    $(cell).focus();
  }
};

const hideEditRow = () => {
  if (statusShowEditRow == true) {
    targetRow.children().each(function (index, element) {
      if (
        dataTable.headTable.filter((item) => item.index == index)[0]?.name !=
        "no"
      ) {
        let textareaValue = $(element).find("textarea").val();
        $(element).html(textareaValue);
      } else {
        if (
          $(element).find("input").val() == null ||
          $(element).find("input").val() == "" ||
          $(element).find("input").val() == "undefined"
        ) {
          $(element).find("input").val(new_id[0]);
          if (new_id != null && new_id.length > 0) {
            new_id.splice(0, 1);
          }
        }
      }
    });
    statusShowEditRow = false;
    resetNoRowTable();
  }
};

const resetNoRowTable = () => {
  let rows = $("#" + dataTableId)
    .find("tbody")
    .find("tr");
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (
      $(row).find("td").find("input").val() == null ||
      $(row).find("td").find("input").val() == "" ||
      $(row).find("td").find("input").val() == "undefined"
    ) {
      $(row).find("td").find("input").val(new_id[0]);
      if (new_id != null && new_id.length > 0) {
        new_id.splice(0, 1);
      }
    }
    const itemNo = $(row).find("td").find("p")[0];
    if (itemNo != undefined && itemNo != null) {
      $(itemNo).html(index + 1);
    } else {
      const itemInput = $(row).find("td").find("input")[0];
      $(itemInput).after(formatString("<p>{0}</p>", "" + (index + 1)));
    }
  }
};
