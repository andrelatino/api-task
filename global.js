if (localStorage.getItem("authToken") == null) {
    window.location.href = 'index.html';
}
function logoutUser() {
    localStorage.removeItem("authToken");
    window.location.href = './'
}
/** NAV BOTTOM */
var openBtn = document.createElement('button');
openBtn.innerHTML = '+';
openBtn.className = 'nav-style open-btn';
document.body.appendChild(openBtn);

var closeBtn = document.createElement('button');
closeBtn.innerHTML = 'X';
closeBtn.className = 'nav-style close-btn';
document.body.appendChild(closeBtn);

var popup = document.createElement('div');
popup.innerHTML = `
<div id="popup">
<a href = 'client.html'> Accueil </a>
<a href = 'client.html'> Clients </a>
<a href = 'services.html'> Services </a>
<a href = 'taches.html'> Taches </a>
</div>
`;
popup.style.display = 'none';
document.body.appendChild(popup);

openBtn.addEventListener('click', function() {
  popup.style.display = 'block';
  openBtn.style.display = 'none';
  closeBtn.style.display = 'grid';
});

closeBtn.addEventListener('click', function() {
  popup.style.display = 'none';
  openBtn.style.display = 'grid';
  closeBtn.style.display = 'none';
});