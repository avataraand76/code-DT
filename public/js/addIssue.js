document.addEventListener("DOMContentLoaded", function () {
    var teamSelect = document.getElementById("teamSelect");
    var deviceSelect = document.getElementById("deviceSelect");
    var inputProductOld = document.getElementById("inputProductOld");
    var inputProductNew = document.getElementById("inputProductNew");
    var typeIssueSelect = document.getElementById("typeIssueSelect");
    var issueSelect = document.getElementById("issueSelect");
    var personLogIssueSelect = document.getElementById("personLogIssueSelect");

    data.team.forEach(item => {
        const option = document.createElement('option');
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        teamSelect.appendChild(option);
    });
    teamSelect.value = "";
    data.device.forEach(item => {
        const option = document.createElement('option');
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        deviceSelect.appendChild(option);
    });
    deviceSelect.value = "";
    inputProductOld.value = "";
    inputProductNew.value = "";
    data.type_issue.forEach(item => {
        const option = document.createElement('option');
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        typeIssueSelect.appendChild(option);
    });
    typeIssueSelect.value = "";
    data.person_log_issue.forEach(item => {
        const option = document.createElement('option');
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        personLogIssueSelect.appendChild(option);
    });
    personLogIssueSelect.value = "";

});
document.getElementById("typeIssueSelect").addEventListener("change", function () {
  const  typeIssueSelected= data.type_issue.filter(item => item.key === this.value);

  // Clear previous options
  issueSelect.innerHTML = "";

  // Populate select2 with new options
  data[typeIssueSelected[0]?.name].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.key.toLowerCase();
    option.textContent = item.value;
    issueSelect.appendChild(option);
  });
  issueSelect.value = "";
});
document.getElementById("flexSwitchCheckChecked").addEventListener("change", function () {
    if(document.getElementById("flexSwitchCheckChecked").checked){
        document.getElementById("productNew").classList.remove("d-none");
        document.getElementById("productOld").innerText = "Nhập Mã Hàng Cũ";
        document.getElementById("inputProductNew").setAttribute('required', 'required');
    } else {
        document.getElementById("productNew").classList.add("d-none");
        document.getElementById("productOld").innerText = "Nhập Mã Hàng";
        document.getElementById("inputProductNew").removeAttribute('required');
    }
});
document.getElementById("flexSwitchColorCheckChecked").addEventListener("change", function () {
    if(document.getElementById("flexSwitchColorCheckChecked").checked){
        document.getElementById("colorNew").classList.remove("d-none");
        document.getElementById("colorOld").innerText = "Nhập Màu Cũ";
        document.getElementById("inputcolorNew").setAttribute('required', 'required');
    } else {
        document.getElementById("colorNew").classList.add("d-none");
        document.getElementById("colorOld").innerText = "Nhập Màu";
        document.getElementById("inputcolorNew").removeAttribute('required');
    }
});
document.getElementById("issueSelect").addEventListener("change", function () {
    // Get the select element by its ID
    let selectElement = document.getElementById("issueSelect");

    // Get the text of the selected option
    let selectedText = selectElement.options[selectElement.selectedIndex].text;
    
    if(selectedText.toLowerCase()=="khác"){
        document.getElementById("inputissue").classList.remove("d-none");
        document.getElementById("inputissue").setAttribute('required', 'required');
    } else {
        document.getElementById("inputissue").classList.add("d-none");
        document.getElementById("inputissue").removeAttribute('required');
    }
});