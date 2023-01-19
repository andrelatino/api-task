// document.cookie = "name=value; SameSite=None; Secure";

window.onload = function() {
  if (!navigator.onLine) {
    isOffline();
  } else {
    getData();
  }
}

function logoutUser() {
    localStorage.removeItem("authToken");
    window.location.href = './'
}

function getData(){
    showProgressBar();
    
    // Fetch the JSON data and create the product elements as before
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/client')
    .then(response => response.json())
    .then(data => {        
        setInterval(hideProgressBar, 1000);
        
        const GridList = document.getElementById('grid');

        for (const api of data) {
        const DivItems = document.createElement('div');
        DivItems.className = 'items';
        DivItems.innerHTML = `
                
            <button class="edit" id="btn${api.id}">
                <img class="image" src="${api.image}" loading="lazy" width="170px" height="170px">  
                
                <div class="content">        
                    <p class="name">Client Name : ${api.name}</p>            
                    <p class="name">Client ID : ${api.id}</p>
                    
                </div>
            </button>
            
        `;
        GridList.appendChild(DivItems);

            const button = document.getElementById(`btn${api.id}`);
            button.addEventListener('click', () => {

                // document.getElementById('edit_title').innerHTML = `Edit(${api.id})`;
                
                localStorage.setItem("client_id", api.id);
                localStorage.setItem("client_name", api.name);
                
                window.location.href = 'service.html';
                

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