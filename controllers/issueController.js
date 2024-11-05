const common = require("../common/common");

exports.addIssue = (req, res) => {
  const data_issue = common.readFileJson("data/data_issue/infoIssue.json");
  const status_input = req.query.status_input === "input_success";
  res.render("addIssue", {
    title: "Ghi Nhận Vấn Đề",
    page: { pageName: "Ghi Nhận Vấn Đề", href: "ghi_nhan_van_de" },
    data: data_issue,
    status_input: status_input,
  });
};
exports.addIssueToList = (req, res) => {
  const datareq = req.body;
  console.log(datareq);
  if (datareq != undefined && datareq != null && datareq.team) {
    let data = {
      id_issue: "",
      team: "",
      device: "",
      type: "",
      product: "",
      color: "",
      colornew: "",
      issue_other:"",
      hdkh_other:"",
      transition_product: false,
      productnew: "",
      description_issue: "",
      time_create: "",
      time_done: "",
      hdkp: "",
      problem_solver: "",
      person_log_issue: "",
    };
    data.team = common.encodeStringToHtml(datareq.team);
    data.device = common.encodeStringToHtml(datareq.device);
    data.product = common.encodeStringToHtml(datareq.product);
    data.transition_product = datareq.transition_product === "on";
    data.transition_color = datareq.transition_color === "on";
    data.productnew = common.encodeStringToHtml(datareq.productnew);
    data.color = common.encodeStringToHtml(datareq.color);
    data.colornew = common.encodeStringToHtml(datareq.colornew);
    data.type = common.encodeStringToHtml(datareq.typeIssue);
    data.description_issue = common.encodeStringToHtml(datareq.issue);
    data.time_create = common.getCurrentDateTime();
    data.person_log_issue = common.encodeStringToHtml(datareq.personLogIssue);
    data.issue_other = common.encodeStringToHtml(datareq.issueOther);

    common.addIssueToFile(data);
  }
  res.redirect("/cap_nhat_van_de_add");
};
exports.updateIssue = (req, res) => {
  const datareq = req.body;
  // console.log(datareq);
  if (datareq != undefined && datareq != null && datareq.id_issue) {

    let data = {
      id_issue: common.encodeStringToHtml(datareq.id_issue),
      type: common.encodeStringToHtml(datareq.typeIssue),
      description_issue: common.encodeStringToHtml(datareq.issue),
      time_done: datareq.time_done,
      hdkp: common.encodeStringToHtml(datareq.hdkp),
      problem_solver: common.encodeStringToHtml(datareq.problem_solver),
      hdkp_other:  common.encodeStringToHtml(datareq.hdkp_other),
    };
    common.updateIssueToFile(data);
  }
  res.redirect("/cap_nhat_van_de_update");
};
exports.updateToFileExcel = (req, res) => {
  let list_issue = common.readFileJson("data/data_issue/listIssue.json");
  let data_issue = common.readFileJson("data/data_issue/infoIssue.json");
  const mappedIssues = list_issue.map((issue) =>
    common.mapDataIssue(issue, data_issue)
  );
  common.convertFileJsonIssueToExcel(mappedIssues);
  const data = "input_success";
  res.redirect(`/danh_sach_van_de?status_input=${encodeURIComponent(data)}`);
};
exports.addIssueToFileExcel = (req, res) => {
  let list_issue = common.readFileJson("data/data_issue/listIssue.json");
  let data_issue = common.readFileJson("data/data_issue/infoIssue.json");
  if (list_issue != null) {
    const mappedIssues = list_issue.map((issue) =>
      common.mapDataIssue(issue, data_issue)
    );
    common.convertFileJsonIssueToExcel(mappedIssues);
  }
  const data = "input_success";
  res.redirect(`/ghi_nhan_van_de?status_input=${encodeURIComponent(data)}`);
};
exports.listIssue = (req, res) => {
  const status_input = req.query.status_input === "input_success";
  let list_issue = common.readFileJson("data/data_issue/listIssue.json");
  let data_issue = common.readFileJson("data/data_issue/infoIssue.json");

  let textSearch = "";
  textSearch = common.encodeStringToHtml(req.query.textSearch);
  let dateSearch = "";
  dateSearch = req.query.dateSearch;
  let pageNumber = 0;
  let totalPageNumber = 0;
  let showIssueDone = req.query.showIssueDone;
  if (list_issue != null) {
    const mappedIssues = list_issue.map((issue) =>
      common.mapDataIssue(issue, data_issue)
    );
    // console.log(req.query);
    let listSearch = mappedIssues;
    if (
      req.query.textSearch != undefined &&
      req.query.textSearch != null &&
      req.query.textSearch != ""
    ) {
      let list1 = common.searchArray(listSearch, "team", req.query.textSearch);
      let list2 = common.searchArray(
        listSearch,
        "device",
        req.query.textSearch
      );
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(list1, "type", req.query.textSearch);
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(list1, "product", req.query.textSearch);
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(
        list1,
        "description_issue",
        req.query.textSearch
      );
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(list1, "hdkp", req.query.textSearch);
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(list1, "problem_solver", req.query.textSearch);
      list1 = common.mergeList(list1, list2);

      list2 = common.searchArray(
        list1,
        "person_log_issue",
        req.query.textSearch
      );
      list1 = common.mergeList(list1, list2);
      listSearch = list1;
    }

    if (
      req.query.dateSearch != undefined &&
      req.query.dateSearch != null &&
      req.query.dateSearch != ""
    ) {
      let list_search_time_create = common.searchArray(
        listSearch,
        "time_create",
        req.query.dateSearch
      );

      let list_search_time_done = common.searchArray(
        listSearch,
        "time_done",
        req.query.dateSearch
      );
      listSearch = common.mergeList(
        list_search_time_create,
        list_search_time_done
      );
    }
    let sortedIssues = listSearch.sort((a, b) => {
      const dateA = new Date(a.time_create);
      const dateB = new Date(b.time_create);
      return dateB - dateA;
    });

    if (showIssueDone != "on") {
      sortedIssues = common.searchArrayEmpty(sortedIssues, "time_done", "");
    }

    if (
      req.query.pageNumber != undefined &&
      req.query.pageNumber != null &&
      req.query.pageNumber != ""
    ) {
      if (pageNumber <= 0) pageNumber = 1;
      pageNumber = parseInt(req.query.pageNumber, 10);
    }else pageNumber = 1;
    if (
      sortedIssues != undefined &&
      sortedIssues != null &&
      sortedIssues.length >= 0
    ) {
      totalPageNumber = Math.ceil(sortedIssues.length / 25);
    }
    
    const total_issue = sortedIssues?.length;
    sortedIssues = common.paginateList(sortedIssues, 25, pageNumber);
    
    res.render("listIssue", {
      title: "Danh Sách Vấn Đề",
      page: { pageName: "Danh Sách Vấn Đề", href: "danh_sach_van_de" },
      data: [...sortedIssues],
      data_issue: data_issue,
      data_search: {
        textSearch: common.encodeStringToHtml(textSearch),
        dateSearch: dateSearch,
        pageNumber: pageNumber,
        totalPageNumber: totalPageNumber,
        showIssueDone: showIssueDone,
      },
      status_input: status_input,
      total_issue: total_issue,
    });
  } else
    res.render("listIssue", {
      title: "Danh Sách Vấn Đề",
      page: { pageName: "Danh Sách Vấn Đề", href: "danh_sach_van_de" },
      data: [],
      data_issue: data_issue,
      data_search: {
        textSearch: common.encodeStringToHtml(textSearch),
        dateSearch: dateSearch,
        pageNumber: pageNumber,
        totalPageNumber: totalPageNumber,
        showIssueDone: showIssueDone,
      },
      status_input: status_input,
      total_issue: 0,
    });
};
