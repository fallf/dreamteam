var caloriesLeft = 2000;
function itemClicked(event) {
    //Find "calories" class from target child, and parse it to a float
    var caloriesChild = parseFloat(event.target.querySelector(".calories").textContent);
    //Subtract the value of caloriesChild from caloriesLeft
    caloriesLeft -= caloriesChild;

    //Output the reamaining value from caloriesLeft to the console 
    console.log(caloriesLeft);
}
var getmenu = function(){
    const query = itemInput.val.trim();
        var url = "https://trackapi.nutritionix.com/v2/search/instant?query=" + query + "&brand_ids=" + brand_id;

      fetch(
        url,
        {
            headers: {
                'x-app-id': '713936a2',
                'x-app-key': '78f575a6b73c1e3d938c41c8b6ea3ae0'
            }
        }
      )
      .then(function(reponse){
          return reponse.json();
      })
      .then(function(data){
          console.log(data);

//           // loop over the results -> create a li -> name and the calories -> data-cal=nf_calories

      });
               
};
var repoContainerEl = document.querySelector('#issues-container');
var place = document.querySelector("#place");

function menu() {
   
    var url = "https://api.nutritionix.com/v1_1/search/panera?results=0:50&fields=item_name,brand_name,item_id,nf_calories&appId=713936a2&appKey=78f575a6b73c1e3d938c41c8b6ea3ae0";
 fetch(url)
  .then(function(reponse){
      return reponse.json();
  })
  .then(function(data){
      console.log(data);
      for (var i=0; i<data.hits.length; i++){
      
          var itemEl =data.hits[i].fields.item_name;
          var calories = data.hits[i].fields.nf_calories;
          place.textContent= data.hits[i].fields.brand_name;
          console.log(itemEl);
          console.log(calories);
          var restEl = document.createElement('a');
                restEl.classList = 'list-item flex-row justify-space-between align-center';
                

                // create a span element to hold restaurant name
                var titleEl = document.createElement('span')
                var area = document.createElement('span');
                area.classList='subtitle';
                titleEl.classList.add("calories");
                titleEl.textContent = calories;
                area.textContent = itemEl;
                restEl.addEventListener("click", itemClicked);
                

                // append to container
                restEl.appendChild(area);
                restEl.appendChild(titleEl);
                
                repoContainerEl.appendChild(restEl);
      }

   //           // loop over the results -> create a li -> name and the calories     -> data-cal=nf_calories
});
    
};
menu();



// function getLocation(e) {
// }      // get brand_id from e.target.data-brand-id
//         // navigate to a new page -> passing in the brand_id -> input to search for menu items
//     }

//     // awesomewebsite.com/location?brand_id=513fbc1283aa2dc80c000005&name=Subway
//     // put in a new script.js file
//     var itemInput = document.querySelector('#item-search');
//     var query = window.location.search.replace('?', '').split('&');
//     var brand_id = query[0].replace('brand_id=', '');
//     var name = query[1].replace('name=', '');

//     function getItems() {
//         const query = itemInput.val.trim();
//         var url = "https://trackapi.nutritionix.com/v2/search/instant?query=" + query + "&brand_ids=" + brand_id;

//       fetch(
//         url,
//         {
//             headers: {
//                 'x-app-id': '713936a2',
//                 'x-app-key': '78f575a6b73c1e3d938c41c8b6ea3ae0'
//             }
//         }
//       )
//       .then(function(reponse){
//           return reponse.json();
//       })
//       .then(function(data){
//           console.log(data);

// //           // loop over the results -> create a li -> name and the calories -> data-cal=nf_calories

//       });
//     }

//     itemInput.addEventListener('change', getItems)

//     .then(function(reponse){
//         return reponse.json();
//     })
//     .then(function(data){
//     for (var i=0; i<data; i++);

//     })
// }