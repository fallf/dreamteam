var getId = document.querySelector("#getId");
var inputEl = document.querySelector("#zipCode");
const errors  = document.getElementById('form-error');
var ContainerEl = document.querySelector('#repos-container');
var deductVal = localStorage.getItem('calories');
var disCals = document.querySelector("#deduct-cals");
disCals.textContent= "Remainig calories: "+deductVal
function errorMessage(msg) {
  errors.innerHTML = msg;
  errors.style.display = '';
  return true;
}

function render (){
  
   if (!inputEl.value || isNaN(inputEl.value || inputEl.value === null)) {
     return errorMessage('please enter a valid zipcode');
   };
  
  console.log(inputEl.value)
  // hit   zipcode api to get lat and lon
   fetch("https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/"+inputEl.value+"?key=TULA5N3CNDIIVM288O22").then(function(response){
       return response.json();
   }).then(function(data){
       console.log(data)
       var lat = data.Latitude;
       var lon = data.Longitude;
       var city = data.City;
       var state = data.State
       console.log(lat,lon)
       
       
       console.log(city +","+state)
       var url ="https://trackapi.nutritionix.com/v2/locations?ll=" + lat + "," + lon + "&distance=2mi";
 
       fetch(
           url,
           {
               headers: {
                   'x-app-id': '713936a2',
                   'x-app-key': '78f575a6b73c1e3d938c41c8b6ea3ae0'
               }
           }
       ).then(function(res){
           return res.json();   
       }).then(function(data){
         console.log(data);
         
         for (var i=0; i<data.locations.length; i++){
             var restaurant = data.locations[i].name;
             var location = data.locations[i].address;
             
             
           //    / create a container for each restaurant 
              var restEl = document.createElement('span');
              restEl.classList = 'restaurant list-item flex-row justify-space-between align-center';
              restEl.setAttribute("data-restaurant", restaurant);

              // create a span element to hold restaurant name
              var titleEl = document.createElement('span')
              var area = document.createElement('span');
              area.classList='subtitle';
              area.textContent = location;
              titleEl.textContent = restaurant;

              // append to container
              restEl.appendChild(titleEl);
              restEl.appendChild(area);

              ContainerEl.appendChild(restEl);
            // console.log(restaurant); 
         }
   
       //   // loop over results and show each item in a ul - brand_id as a data-brand-id attribute
   
      });  
  });
}

function getMenu(e) {
  var target = e.target;
  if (target.classList.contains('restaurant')) {
    var restaurant = target.dataset.restaurant;
    window.location.href = './menu.html?restaurant=' + restaurant;
  }
};

ContainerEl.addEventListener('click', getMenu);
getId.addEventListener('click', render);
