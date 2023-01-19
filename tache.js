// document.cookie = "name=value; SameSite=None; Secure";
var service_id = localStorage.getItem("service_id");
var client_id = localStorage.getItem("client_id");

window.onload = function() {
  if (!navigator.onLine) {
    isOffline();
  } else {
    getData();
  }
}

function closeAndReloadNew() {
    close_add_sidebar();
    setTimeout(function() {
        location.reload();
    }, 500); // 5 seconds
}
function closeAndReloadedit() {
    close_edit_sidebar();
    setTimeout(function() {
        location.reload();
    }, 500); // 5 seconds
}


function getData(){
    showProgressBar();
    
    // alert(customerName);
    // Fetch the JSON data and create the product elements as before
    
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=${service_id}&client_id=${client_id}`)
    .then(response => response.json())
    .then(data => {        
        setInterval(hideProgressBar, 1000);
        const GridList = document.getElementById('grid');

        for (const api of data.tache) {
        
        // var tacheTotal = Object.keys(data.tache).length
        // alert(tacheTotal);


        const DivItems = document.createElement('div');
        DivItems.className = 'items';
        DivItems.innerHTML = `
           
        <button class="edit" id="btn${api.id}">
            <div class="content">  
                <p class="subtask-title">Tache Name : ${api.name} - Tache ID : ${api.id} </p>
            </div>
            
            
        `;
        GridList.appendChild(DivItems);

            const button = document.getElementById(`btn${api.id}`);
            button.addEventListener('click', () => {

                /**nothing for the moment */
   
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


