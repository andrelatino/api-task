// document.cookie = "name=value; SameSite=None; Secure";

window.onload = function() {
  if (!navigator.onLine) {
    isOffline();
  } else {
    getData();
  }
}

function getData(){
    showProgressBar();
    
    // Fetch the JSON data and create the product elements as before
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/customer')
    .then(response => response.json())
    .then(data => {        
        setInterval(hideProgressBar, 1000);
        
        const GridList = document.getElementById('grid');

        for (const api of data) {
        const DivItems = document.createElement('div');
        DivItems.className = 'items';
        DivItems.innerHTML = `
                
            
            <img class="image" src="${api.image}" loading="lazy" width="170px" height="170px">  
            
            <div class="content">  
                     
                <p class="name">${api.name}</p>
                
                
            </div>
            <div id="botoncito">    
                <button class="edit" id="btn${api.id}">EDIT(${api.id})</button>
            </div>
        `;
        GridList.appendChild(DivItems);

            const button = document.getElementById(`btn${api.id}`);
            button.addEventListener('click', () => {

                document.getElementById('edit_title').innerHTML = `Edit(${api.id})`;
                localStorage.setItem("customer_id", api.id);
                localStorage.setItem("customer_name", api.name);
                window.location.href = 'task.html'
                

            });
        }
    });
}

  			




function isOffline() {
  setInterval(hideProgressBar, 1000);  
  const offlineMessage = document.getElementById('offline-message');
  offlineMessage.innerHTML = 'Sorry, you appear to be offline. Please check your internet connection and try again.';
}

function hideProgressBar() {
  const progressBar = document.getElementById('g-progressbar');
  progressBar.style.transition = 'opacity 0.5s ease-out';
  progressBar.style.opacity = 0;
}

function showProgressBar() {
  const progressBar = document.getElementById('g-progressbar');
  progressBar.style.transition = 'opacity 0.5s ease-out';
  progressBar.style.opacity = 1;
}

//----------------------------------------------------------------------------
//      END DELETE CONTENT
//----------------------------------------------------------------------------
// var getToken = localStorage.getItem("authToken");
// localStorage.removeItem("authToken");
// window.location.href = '/api-login/login.html'
// if (getToken != null) {
// //   window.location.href = '/api-login/login.html'
// }
    var getToken = localStorage.getItem("authToken");
    if (getToken === null || getToken === undefined) {
        window.location.href = './'
    }
function logoutUser() {
    localStorage.removeItem("authToken");
    window.location.href = './'
}