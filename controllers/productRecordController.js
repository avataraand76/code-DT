const common = require("../common/common");
exports.index = (req, res)=>{

  const data_issue = common.readFileJson("data/data_issue/infoIssue.json");
    res.render("productRecord", {
        title: "Ghi Nhận Sản Lượng",
        page: { pageName: "Sản Lượng", href: "ghi_nhan_san_luong" },
        data: data_issue
    });
}
exports.addProductRecord = (req, res)=>{

    const datareq = req.body;
    // console.log(datareq);
    if (datareq != undefined && datareq != null && datareq.product_cd) {
      common.addProductRecordToFile(datareq);
    }
    res.redirect("/ghi_nhan_san_luong");
}
exports.getListProductRecord = (req, res)=>{
    
}