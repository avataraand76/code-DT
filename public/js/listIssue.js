// JavaScript to handle opening the modal when a button is clicked
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to each button with the 'open-modal-btn' class
  document.querySelectorAll(".open-modal-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const id_modal = this.getAttribute("data-target");
      const id_issue = this.getAttribute("data-id-issue");
      // Customize modal content if needed
      // document.getElementById('exampleModalLabel').textContent = `Modal for Accordion Item #${itemNumber}`;
      // document.querySelector('.modal-body').textContent = `This is the content for item #${itemNumber}.`;

      // const modalElement = new bootstrap.Modal(document.getElementById('modalCenter'));
      // // Show the modal
      // modalElement.show();

      const modalElement = document.getElementById(id_modal);
      modalElement.classList.add("Show");
      modalElement.style.display = "block";
      modalElement.style.padding = "15px";
      modalElement.style.opacity = "1";
      let issue = data.filter((item) => item.id_issue === id_issue)[0];

      var typeIssueSelect = document.getElementById("typeIssueSelect");
      typeIssueSelect.innerHTML = "";
      data_issue.type_issue.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        typeIssueSelect.appendChild(option);
      });
      setSelectedOption("typeIssueSelect", issue.type);

      var issueSelect = document.getElementById("issueSelect");
      issueSelect.innerHTML = "";
      const typeIssueSelected = data_issue.type_issue.filter(
        (item) => item.key === typeIssueSelect.value
      );
      data_issue[typeIssueSelected[0]?.name].forEach((item) => {
        const option = document.createElement("option");
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        issueSelect.appendChild(option);
      });
      issueSelect.value = "";
      setSelectedOption("issueSelect", issue.description_issue);

      var problem_solver = document.getElementById("problem_solver_id");
      problem_solver.innerHTML = "";
      data_issue.problem_solver.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        problem_solver.appendChild(option);
      });
      problem_solver.value = "";
      setSelectedOption("problem_solver_id", issue.problem_solver);

      var hdkp = document.getElementById("hdkp_id");
      hdkp.innerHTML = "";
      data_issue[typeIssueSelected[0]?.hdkp].forEach((item) => {
        const option = document.createElement("option");
        option.value = item.key.toLowerCase();
        option.textContent = item.value;
        hdkp.appendChild(option);
      });
      hdkp.value = "";
      setSelectedOption("hdkp_id", issue.hdkp);

      document.getElementById("id_issue").value = id_issue;
      document.getElementById("datePickerIssueDone").value = issue.time_done;
      document.getElementById("productId").innerText = issue.transition_product
        ? issue.product_content
        : issue.product;
      document.getElementById("colorId").innerText = issue.transition_color
        ? issue.color_content
        : issue.color;
      document.getElementById("modalTeam").innerText = issue.team;
      document.getElementById("deviceId").innerText = issue.device;
      document.getElementById("time_create_id").innerText = issue.time_create;
      document.getElementById("person_log_issue_id").innerText =
        issue.person_log_issue;

      if (issue.description_issue.toLowerCase() == "khác") {
        document.getElementById("inputissue").classList.remove("d-none");
        document
          .getElementById("inputissue")
          .setAttribute("required", "required");
      } else {
        document.getElementById("inputissue").classList.add("d-none");
        document.getElementById("inputissue").removeAttribute("required");
      }
      if(issue.issue_other != undefined && issue.issue_other != null)
      document.getElementById("inputissue").value = issue.issue_other;

      if (issue.hdkp.toLowerCase() == "khác") {
        document.getElementById("inputhdkp").classList.remove("d-none");
        document
          .getElementById("inputhdkp")
          .setAttribute("required", "required");
      } else {
        document.getElementById("inputhdkp").classList.add("d-none");
        document.getElementById("inputhdkp").removeAttribute("required");
      }
      if(issue.hdkp_other != undefined && issue.hdkp_other != null)
      document.getElementById("inputhdkp").value = issue.hdkp_other;
    });
  });
  document
    .getElementById("closeModalIssue")
    .addEventListener("click", function () {
      const modalElement = document.getElementById("modalCenter");
      modalElement.classList.remove("Show");
      modalElement.style.removeProperty("display");
      modalElement.style.removeProperty("padding");
      modalElement.style.removeProperty("opacity");
    });
});
document
  .getElementById("typeIssueSelect")
  .addEventListener("change", function () {
    const typeIssueSelected = data_issue.type_issue.filter(
      (item) => item.key === this.value
    );

    // Clear previous options
    issueSelect.innerHTML = "";

    // Populate select2 with new options
    data_issue[typeIssueSelected[0]?.name].forEach((item) => {
      const option = document.createElement("option");
      option.value = item.key.toLowerCase();
      option.textContent = item.value;
      issueSelect.appendChild(option);
    });
    issueSelect.value = "";
    var hdkp = document.getElementById("hdkp_id");
    hdkp.innerHTML = "";
    data_issue[typeIssueSelected[0]?.hdkp].forEach((item) => {
      const option = document.createElement("option");
      option.value = item.key.toLowerCase();
      option.textContent = item.value;
      hdkp.appendChild(option);
    });
    hdkp.value = "";
  });

function setSelectedOption(selectId, valueToSelect) {
  // Get the select element by its id
  const selectElement = document.getElementById(selectId);

  if (selectElement) {
    // Set the value of the select element
    for (const option of selectElement.options) {
      // Check if the option's data-key matches the keyToSelect
      if (option.textContent === valueToSelect) {
        // Set this option as selected
        selectElement.value = option.value;
        break;
      }
    }
  }
}
document.getElementById("issueSelect").addEventListener("change", function () {
  // Get the select element by its ID
  let selectElement = document.getElementById("issueSelect");

  // Get the text of the selected option
  let selectedText = selectElement.options[selectElement.selectedIndex].text;

  if (selectedText.toLowerCase() == "khác") {
    document.getElementById("inputissue").classList.remove("d-none");
    document.getElementById("inputissue").setAttribute("required", "required");
  } else {
    document.getElementById("inputissue").classList.add("d-none");
    document.getElementById("inputissue").removeAttribute("required");
  }
});
document.getElementById("hdkp_id").addEventListener("change", function () {
  // Get the select element by its ID
  let selectElement = document.getElementById("hdkp_id");

  // Get the text of the selected option
  let selectedText = selectElement.options[selectElement.selectedIndex].text;

  if (selectedText.toLowerCase() == "khác") {
    document.getElementById("inputhdkp").classList.remove("d-none");
    document.getElementById("inputhdkp").setAttribute("required", "required");
  } else {
    document.getElementById("inputhdkp").classList.add("d-none");
    document.getElementById("inputhdkp").removeAttribute("required");
  }
});