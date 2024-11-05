// Open the sidebar
function openNav() {
    document.getElementById("sidebar").classList.add("bg-white");
    document.getElementsByTagName("body")[0].classList.add("g-sidenav-pinned");
}

// Close the sidebar
function closeNav() {
    document.getElementById("sidebar").classList.remove("bg-white");
    document.getElementsByTagName("body")[0].classList.remove("g-sidenav-pinned");
}