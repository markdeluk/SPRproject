// default map layer

let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    zoom: 12
});
    

    function runDirection(start, end) {
        
        // recreating new map layer after removal
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [35.791188, -78.636755],
            zoom: 12
        });
        
        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                end
            ]
        });
    

        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'img/red.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            },

            createEndMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'img/blue.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            }
        });
        
        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        })); 
    }
//function that load images and related data inside the result table
function loadData(ResultTable){
    //load test image 
    var img = document.getElementById('testImage');
    var image = new Image();
    var image1 = new Image();
    
    
    
    image.src = 'data:image/png;base64,'+base64String;
    image1.src=image.src;
    var imageArray=[image,image1];
    if(ResultTable.rows.length>0)
        for (var i=0;i<imageArray.length;i++){
        ResultTable.deleteRow(ResultTable.rows.length);
        }
    for (var i=0;i<imageArray.length;i++){
        var row = ResultTable.insertRow(i);
        var cell = row.insertCell(0);
        cell.appendChild(imageArray[i]);
    }
    console.log(ResultTable.rows.length);
    

}

// function that runs when form submitted
function submitForm(event) {
    event.preventDefault();

    // delete current map layer
    map.remove();

    // getting form data
    //start = document.getElementById("start").value;
    start="Horsens";
    end = document.getElementById("destination").value;
    //request bikes nearby your position, for now it's only the same city
    socket.emit("getBikes",start);
    var ResultTableContainer= document.getElementById("ResultTableContainer");
    ResultTableContainer.style.visibility='visible';
    var ResultTable= document.getElementById("nearBikeResultTable");
   // loadData(ResultTable);
    // run directions function
    runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);





