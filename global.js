
document.getElementById("version").innerHTML = "v11";

if (localStorage.getItem("authToken") == null) {
    window.location.href = 'index.html';
}

function logoutUser() {
    localStorage.removeItem("authToken");
    window.location.href = './'
}
