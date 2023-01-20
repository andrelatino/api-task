// document.cookie = "name=value; SameSite=None; Secure";
// var client_id = localStorage.getItem("client_id");
// var client_name = localStorage.getItem("client_name");

window.onload = function() {
  if (!navigator.onLine) {
    isOffline();
  } else {
    getData();
  }
}

function getData(){
    showProgressBar();
    
    // alert(customerName);
    // Fetch the JSON data and create the product elements as before
    
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/service`)
    .then(response => response.json())
    .then(data => {        
        setInterval(hideProgressBar, 1000);
        const GridList = document.getElementById('grid');

        for (const api of data.service) {
        const DivItems = document.createElement('div');
        DivItems.className = 'items';
        DivItems.innerHTML = `
           
        <button class="edit" id="btn${api.id}">
            <div class="content">  
                <p class='service-name'>Service Name : ${api.name}</p>
                <p>Client ID : ${api.client_id}</p>
                <p>Service ID : ${api.id}</p>
               
            </div>
        </button>
            
        `;
        GridList.appendChild(DivItems);

            const button = document.getElementById(`btn${api.id}`);
            button.addEventListener('click', () => {
                localStorage.setItem("service_id", api.id);
                localStorage.setItem("service_name", api.name);                
                window.location.href = 'tache.html';
            });
        }
    });
}


//----------------------------------------------------------------------------
//      ADD NEW CONTENT
//----------------------------------------------------------------------------
function add_new_content() {
    
    const formData = new FormData(document.getElementById('add_form'));
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:tuullTuB/product`, {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            
            document.getElementById('add_message').textContent = 'SUCCEED!';
            closeAndReloadNew();
            
        } else {
            document.getElementById('add_message').textContent = 'FAILED';
        }
        })
    .then(data => console.log(data))
    
    .catch(error => {
        document.getElementById('add_message').textContent = 'ERROR';
        });
    }

    function add_check_fields() {
        // Get the form element
        const form = document.getElementById('add_form');

        // Get all form fields within the form
        const formFields = form.querySelectorAll('input, textarea, select');

        // Loop through form fields
        for (const field of formFields) {
            // Check if form field is empty
            if (field.value === '') {
            // Display error add_message
            document.getElementById('add_message').textContent = '';
            return;
            } else {
            document.getElementById('add_message').textContent = 'UPDATING...';
            }
        }
        
        // If all form fields are filled out, call add_new_content function
        add_new_content();    
    
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
//      EDIT NEW CONTENT
//----------------------------------------------------------------------------

  function sendEditData() {
  
  const editId = document.getElementById('id').value;
  const editFormData = new FormData(document.getElementById('editForm'));
  const editJsonData = {};
  for (const [key, value] of editFormData.entries()) {
    editJsonData[key] = value;
  }

  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:tuullTuB/product/${editId}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editJsonData)
  })
  .then(response => {
      if (response.status === 200) {
         
        document.getElementById('editErrorMessage').textContent = 'SUCCEED!';
         closeAndReloadedit();
      } else {
        document.getElementById('editErrorMessage').textContent = 'FAILED';
      }
    })
  .then(editJsonData => console.log(editJsonData))
  .catch(error => {
      document.getElementById('editErrorMessage').textContent = 'ERROR';
    });
}

//----------------------------------------------------------------------------
//      END EDIT NEW CONTENT
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//      START DELETE CONTENT
//----------------------------------------------------------------------------

    function deleteApiData() {
  
        const deleteId = document.getElementById('id').value;
        
        
        const deleteFormData = new FormData(document.getElementById('editForm'));
        const deleteJsonData = {};
        for (const [key, value] of deleteFormData.entries()) {
            deleteJsonData[key] = value;
        }

        fetch(`https://x8ki-letl-twmt.n7.xano.io/api:tuullTuB/product/${deleteId}`, {
            method: 'DELETE',
            headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteJsonData)
        })
        .then(response => {
            if (response.status === 200) {
                
                document.getElementById('editErrorMessage').textContent = 'SUCCEED!';
                 closeAndReloadedit();
            } else {
                document.getElementById('editErrorMessage').textContent = 'FAILED';
            }
            })
        .then(deleteJsonData => console.log(deleteJsonData))
        .catch(error => {
            document.getElementById('editErrorMessage').textContent = 'ERROR';
            });
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
    // var getToken = localStorage.getItem("authToken");
    // if (getToken === null || getToken === undefined) {
    //     window.location.href = './'
    // }
