document.addEventListener("DOMContentLoaded", function () {
  switch (page.href) {
    case "ghi_nhan_van_de":
      document.getElementById("btnAddIssue").classList.add("active");
      break;
    case "danh_sach_van_de":
      document.getElementById("btnListIssue").classList.add("active");
      break;
    case "ghi_nhan_san_luong":
      document.getElementById("btnProductionRecord").classList.add("active");
      break;
    default:
      document.getElementById("btnAddIssue").classList.remove("active");
      document.getElementById("btnListIssue").classList.remove("active");
      document.getElementById("btnProductionRecord").classList.remove("active");
      break;
  }
  setContentHeight();
});
function setContentHeight() {
  const headerHeight = document.getElementById('navbarBlur')?.offsetHeight;
  const formSearchHeight = document.getElementById('form-search')?.offsetHeight;
  const footerHeight = document.querySelector('footer')?.offsetHeight;
  const windowHeight = window.innerHeight;

  // Tính chiều cao còn lại cho nội dung
  let contentHeight = windowHeight;
  if(headerHeight != undefined && headerHeight != null && headerHeight > 0)
    contentHeight -= headerHeight;
  if(formSearchHeight != undefined && formSearchHeight != null && formSearchHeight > 0)
    contentHeight -= formSearchHeight;
  if(footerHeight != undefined && footerHeight != null && footerHeight > 0)
    contentHeight -= footerHeight;

  // Cập nhật chiều cao cho phần tử nội dung
  const contentElement = document.getElementById('main_content');
  if(contentElement != undefined && contentElement != null)
    contentElement.style.height = `${contentHeight - 10}px`;
}