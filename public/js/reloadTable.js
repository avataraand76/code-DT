function reLoadTbody(dataNext) {
  let dataPre = convertTableToJSON();
  if (!compareArrayEqual(dataPre, dataNext)) {
    let rows = $("#" + dataTableId)
      .find("tbody")
      .find("tr");
    let sizeData =
      rows.length > dataNext.length ? rows.length : dataNext.length;
    for (let index = 0; index < sizeData; index++) {
        rows = $("#" + dataTableId).find("tbody").find("tr");
        const row = rows[index];
        const indexPre = getIndexRow(dataPre[index], dataNext);
        const indexNext = getIndexRow(dataNext[index], dataPre);
        if(indexPre === -1) $(row).eq(0).remove();
        if(indexNext === -1) addRowHtml(row, dataNext[index], true);
    }
  }
}

function getIndexRow(dataRow, dataNext) {
  for (let index = 0; index < dataNext.length; index++) {
    const row = dataNext[index];
    if (compareArrayEqual(dataRow, row)) {
      return index;
    }
  }
  return -1;
}
const addRowHtml = (row, data, isBefore) => {
  let html = formatString(
    "<tr><td><p></p><input type='hidden' name='id' value='{0}'/></td>",
    data.id
  );
  for (let index = 0; index < dataTable.headTable.length; index++) {
    let headCell = dataTable.headTable.filter((item) => item.index == index);
    if (headCell != null && headCell != undefined && headCell.length == 1) {
      if (headCell[0].name !== "no") {
        html += formatString("<td>{0}</td>", data[headCell[0].name]);
      }
    }
  }
  html += "</tr>";
  if (isBefore) $(row).before(html);
  else $(row).after(html);
};
