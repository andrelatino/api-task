// document.cookie = "name=value; SameSite=None; Secure";
var customerId = localStorage.getItem("customer_id");
var customerName = localStorage.getItem("customer_name");

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
    
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/task-link?customer_id=${customerId}`)
    .then(response => response.json())
    .then(data => {        
        setInterval(hideProgressBar, 1000);
        const GridList = document.getElementById('grid');

        for (const api of data) {
        const DivItems = document.createElement('div');
        DivItems.className = 'items';
        DivItems.innerHTML = `
            
            <div class="content">  
               
                <p class="customer_id:">customer_id:${api.customer_id}</p>     
                <p class="task:">task:${api.task}</p>
                <p class="status:">status:${api.status}</p>
                
            </div>
            <div id="botoncito">    
                <button class="edit" id="btn${api.id}">EDIT(${api.id})</button>
            </div>
        `;
        GridList.appendChild(DivItems);

            const button = document.getElementById(`btn${api.id}`);
            button.addEventListener('click', () => {

                document.getElementById('edit_title').innerHTML = `Edit(${api.id})`;

                const field_input_id = document.querySelector('#editForm [name="id"]');
                field_input_id.value = api.id;                

                const field_input_sku = document.querySelector('#editForm [name="sku"]');
                field_input_sku.value = api.sku; 

                const field_input_name = document.querySelector('#editForm [name="name"]');
                field_input_name.value = api.name; 

                const field_input_desc = document.querySelector('#editForm [name="desc"]');
                field_input_desc.value = api.desc; 

                const field_input_price = document.querySelector('#editForm [name="price"]');
                field_input_price.value = api.price; 

                const field_input_image = document.querySelector('#editForm [name="image"]');
                field_input_image.value = api.image; 
                
                open_edit_sidebar()

            });
        }
    });
}

  			
function open_add_sidebar() {		
    
    				
    document.getElementById("add_sidebar").style.width = "100%";	
    document.getElementById("add_sidebar").style.maxWidth = "500px";
    document.getElementById("add_sidebar").style.right = "0";		
    
    document.getElementById("add_overlay_bg").style.opacity = "1";
    document.getElementById("add_overlay_bg").style.visibility = "visible";	
    			
}

function open_edit_sidebar() {		
    
    				
    document.getElementById("edit_sidebar").style.width = "100%";	
    document.getElementById("edit_sidebar").style.maxWidth = "500px";
    document.getElementById("edit_sidebar").style.right = "0";		
    
    document.getElementById("edit_overlay_bg").style.opacity = "1";
    document.getElementById("edit_overlay_bg").style.visibility = "visible";	
    			
}

function close_add_sidebar() {

    
    // document.body.classList.toggle("neo-lock");			
    if (window.matchMedia("(max-width: 501px)").matches) {			
        document.getElementById("add_sidebar").style.width = "100%";
        document.getElementById("add_sidebar").style.right = "-100%";
    }else{
        document.getElementById("add_sidebar").style.width = "100%";
        document.getElementById("add_sidebar").style.right = "-500px";
    }
    document.getElementById("add_overlay_bg").style.opacity = "0";
    document.getElementById("add_overlay_bg").style.visibility = "hidden";				
    
}

function close_edit_sidebar() {
    
    // document.body.classList.toggle("neo-lock");			
    if (window.matchMedia("(max-width: 501px)").matches) {			
        document.getElementById("edit_sidebar").style.width = "100%";
        document.getElementById("edit_sidebar").style.right = "-100%";
    }else{
        document.getElementById("edit_sidebar").style.width = "100%";
        document.getElementById("edit_sidebar").style.right = "-500px";
    }
    document.getElementById("edit_overlay_bg").style.opacity = "0";
    document.getElementById("edit_overlay_bg").style.visibility = "hidden";				
    
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
    var getToken = localStorage.getItem("authToken");
    if (getToken === null || getToken === undefined) {
        window.location.href = './'
    }
function logoutUser() {
    localStorage.removeItem("authToken");
    window.location.href = './'
}