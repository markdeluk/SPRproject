// default map layer
const socket = io("http://LAPTOP-7M6U6UFG:4000", {
    withCredentials: true
    }, {secure: true});
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    zoom: 12
});
let RentButton = document.getElementById('RentButton');
let LendButton = document.getElementById('LendButton');
let InfoButton = document.getElementById('InfoButton');
let MainContainer = document.getElementById('MainButtonContainer');
    
LendButton.addEventListener('click', function(){LendPage()});
InfoButton.addEventListener('click',function(){InfoPage();});
function LendPage(){
    console.log("Redirect to Lend Page");
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/LendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}

function InfoPage(){
    console.log("Redirect to Lend Page");
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/InfoPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}

//function that load images and related data inside the result table

// function that runs when form submitted
function submitForm(event) {
    event.preventDefault();

    // getting form data
    start="Horsens";
    end = document.getElementById("destination").value;
    //request bikes nearby your position, for now it's only the same city
    socket.emit("getBikes",end);
    MainContainer.style.visibility = 'hidden'
    var ResultTableContainer= document.getElementById("ResultTableContainer");
    var searchBar = document.getElementById("searchBar");
    ResultTableContainer.style.visibility='visible';
    //searchBar.style.visibility='hidden';
    var ResultTable= document.getElementById("nearBikeResultTable");
   // loadData(ResultTable);
    // run directions function
    //runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}
 function pathToBike(coordinates){
    var splitCoords= coordinates.split(",");
    var lat = splitCoords[0];
    var lng = splitCoords[1];
    runDirection("Horsens","Aarhus",lat,lng);

 }

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);


  // creating table for results
  var ResultTable= document.getElementById("nearBikeResultTable");
  var searchBar = document.getElementById("searchBar");
  //create frame on which i have more data about the bike
  var MoreinfoTable= document.getElementById("InfoTable");
  // listener
  socket.on('sendBikesResult', (msg) => {
          var enc = new TextDecoder("utf-8");
      ////here
      var ResultTableContainer= document.getElementById("ResultTableContainer");
      var InfoTableContainer= document.getElementById("InfoTableContainer");
      ResultTableContainer.style.visibility='visible';
      searchBar.style.visibility='hidden';
      //ResultTableContainer.style.visibility='hidden';


      //create bike container block for each bike
      for (var i=0;i<msg.length;i++){

          // creating a table entry
          var row = ResultTable.insertRow(i);
          var cell = row.insertCell(0);
          //cell.style.height ='1%';

          // creating image
          var image= new Image();
          image.src = 'data:image/png;base64,'+enc.decode(msg[i]['img_src']);
          image.style.height="100%";
          image.style.width="30%";

          // Create bike container
          var divContainer= document.createElement("div");
          divContainer.classList.add("grid-container");

          // create elements
          var divModel=document.createElement("div");
          var divPosition=document.createElement("div");
          var divName=document.createElement("div");
          var divButton=document.createElement("div");
          var divPicture=document.createElement("div");

          //appendText from imcoming message
          var name = document.createElement('label');
          name.innerHTML =  msg[i]['name'];
          divName.appendChild(name);
          
          var model = document.createElement('label');
          model.innerHTML =  msg[i]['model'];
          divModel.appendChild(model); 
          
          var bikePosition = document.createElement('label');
          bikePosition.innerHTML =  msg[i]['coordinates'];
          divPosition.appendChild(bikePosition);

          var bookButton = document.createElement("button");
          bookButton.classList.add("bookButtonStyle");
          bookButton.id=i;
          console.log("before");
          console.log(msg);
          bookButton.addEventListener("click",function(){loadBikeSpecificInfo(msg,this.id)}); 
          
          bookButton.innerHTML = "Book";
          divButton.appendChild(bookButton);
          

          // style arrangement
          divModel.classList.add("bikeModel");
          divPosition.classList.add("bikePosition");
          divName.classList.add("bikeName");
          divButton.classList.add("bookButton");
          divPicture.classList.add("bikePicture");
          
          // inserting picture
          divPicture.appendChild(image);
          

          // inserting divs in container
          divContainer.appendChild(divModel);
          divContainer.appendChild(divPicture);
          divContainer.appendChild(divButton);
          divContainer.appendChild(divPosition);
          divContainer.appendChild(divName);
          
          //insert in result table
          cell.appendChild(divContainer);

          

      }
  });
  //function to load Table for specific info about a certain bike
  function loadBikeSpecificInfo(msg,ID){

      InfoTableContainer.style.visibility='visible';
      ResultTableContainer.style.visibility='hidden';
      var rowInfoTable = InfoTable.insertRow(0);
      var cellInfoTable = rowInfoTable.insertCell(0);
      var divContainer= document.createElement("div");
          divContainer.classList.add("MoreInfoBikeContainer");
      
      //variables used to parse the JSON
      var PriceString = "10";
      var DescriptionString = "ModelName" + "\n" + "TypeName";
      var TimeString = "3 minutes";
      var AddressString = "Kamtjatka 13";
      //coordinates management
      var coordinates = "55.8634941,9.8354283";




      //image
      var enc = new TextDecoder("utf-8");
      var image= new Image();
          image.src = 'data:image/png;base64,'+enc.decode(msg[ID]['img_src']);
          image.style.height="100%";
          image.style.width="100%";
      var divPicture=document.createElement("div");
      divPicture.id="BikePic"
      divPicture.classList.add("BikePicture_MoreInfo");
      divPicture.appendChild(image);
      divContainer.appendChild(divPicture);

      //name
      var divName=document.createElement("div");
      var name = document.createElement('label');
      divName.id="BikeNameTEST";
      name.innerHTML =  msg[ID]['name'];
      divName.appendChild(name);
      divName.classList.add("BikeName_MoreInfo");
      divContainer.appendChild(divName);

      //price
      var divPrice = document.createElement("div");
      var Price = document.createElement('label');
      Price.innerHTML= PriceString + "DKK";
      divPrice.appendChild(Price);
      divPrice.id="BikePrice"
      divPrice.classList.add("BikePrice_MoreInfo");
      divContainer.appendChild(divPrice);

      //description

      var divDescription = document.createElement("div");
      var description = document.createElement('label');
      divDescription.id="BikeDescription"
      description.innerHTML = DescriptionString;
      divDescription.appendChild(description);
      divDescription.classList.add("BikeDescription_MoreInfo");
      divContainer.appendChild(divDescription);

      //share button
      var divShareButton = document.createElement("div");
      var ShareButton = document.createElement("button");
      ShareButton.style.height="100%"
      ShareButton.style.width="100%"
      ShareButton.innerHTML="Share"
      ShareButton.classList.add("ShareButtonStyle"); //TODO: add style in CSS with the image
      ShareButton.addEventListener("click", function(){shareOutsideApp()}); //TODO: implement function
      divShareButton.classList.add("ShareButton_MoreInfo");
      divShareButton.appendChild(ShareButton);
      divContainer.appendChild(divShareButton);

      //time
      var divTime = document.createElement("div");
      var time = document.createElement('label');
      time.innerHTML= TimeString;
      divTime.appendChild(time);
      divTime.classList.add("Time_MoreInfo");
      divContainer.appendChild(divTime);

      //address

      var divAddress = document.createElement("div");
      var address = document.createElement('label');
      address.innerHTML = AddressString;
      divAddress.appendChild(address);
      divAddress.id="BikeAddress"
      divAddress.classList.add("Address_MoreInfo");
      divContainer.appendChild(divAddress);

      //scroll down button
      
      var divScrollButton = document.createElement("div");
      var ScrollButton = document.createElement("button");
      ScrollButton.innerHTML="Press for more info"
      ScrollButton.style.height="100%"
      ScrollButton.style.width="100%"
      ScrollButton.classList.add("ScrollButtonStyle"); //TODO: add style in CSS with the image
      ScrollButton.addEventListener("click", function(){showMoreInfo()}); //TODO: implement function, maybe some blocks of the grid are hidden?
      divScrollButton.classList.add("MoreInfoButton_MoreInfo");
      divScrollButton.appendChild(ScrollButton);
      divContainer.appendChild(divScrollButton);

      //book now

      var divBookButton = document.createElement("div");
      var BookButton = document.createElement("button");
      BookButton.innerHTML="Book"
      BookButton.classList.add("BookButtonStyle"); //TODO: add style in CSS with the image
      BookButton.addEventListener("click", function(){BookPage()}); //TODO: implement function,
      divBookButton.appendChild(BookButton);
      divBookButton.classList.add("BookButton_MoreInfo");
      divContainer.appendChild(divBookButton);

      //reserve

      var divReserveButton = document.createElement("div");
      var ReserveButton = document.createElement("button");
      ReserveButton.innerHTML="Reserve for later"
      ReserveButton.style.width="100%";
      ReserveButton.style.height="100%";
      divReserveButton.style.width="100%";
      divReserveButton.style.height="100%";
      ReserveButton.classList.add("ReserveButtonStyle"); //TODO: add style in CSS with the image
      ReserveButton.addEventListener("click", function(){ReservePage()}); //TODO: implement function, maybe some blocks of the grid are hidden?
      divReserveButton.classList.add("ReserveButton_MoreInfo");
      divReserveButton.appendChild(ReserveButton);
      divContainer.appendChild(divReserveButton);

          //attach back button
          //var divButton=document.createElement("div");
         // var backButton = document.createElement("button");
         // backButton.classList.add("bookButtonStyle");
          //backButton.innerHTML="Back"
          //backButton.addEventListener("click",function(){backToMainTable()}); 
          //divButton.appendChild(backButton);
         // divContainer.appendChild(divButton);
            

          cellInfoTable.appendChild(divContainer);
          cellInfoTable.style.height = "100%";
          cellInfoTable.style.width = "100%";
  }
  //function to come back to main table
  function backToMainTable(){
      var MoreinfoTable= document.getElementById("InfoTable");
      InfoTableContainer.style.visibility='hidden';
      ResultTableContainer.style.visibility='visible';
      for (var i = 0;i < MoreinfoTable.rows.length;i++){
          MoreinfoTable.deleteRow(i);
      }
  }
  function ReservePage(){

  }
  function showMoreInfo(){

  }
  function shareOutsideApp(){

  }
  function BookPage() {
    
    var bikeName=document.getElementById("BikeNameTEST");
    var bikeDescription=document.getElementById("BikeDescription");
    var bikeAddress=document.getElementById("BikeAddress")
    var bikePrice=document.getElementById("BikePrice")
    var bikeImg=document.getElementById("BikePic")
    var form = document.createElement('form');
    //create a form
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/book');
    //for each field, a input in the form is created
    //bikeName
    var inputName=document.createElement('input');
    inputName.setAttribute("type", "text");
    inputName.setAttribute('name','bikeName');
    inputName.setAttribute('value',bikeName.firstChild.textContent);
    form.appendChild(inputName);
    //BikeDescription
    var inputBikeDescription=document.createElement('input');
    inputBikeDescription.setAttribute("type", "text");
    inputBikeDescription.setAttribute('name','bikeDescription');
    inputBikeDescription.setAttribute('value',bikeDescription.firstChild.textContent);
    form.appendChild(inputBikeDescription);
    //bikeaddress
    var inputBikeAddress=document.createElement('input');
    inputBikeAddress.setAttribute("type", "text");
    inputBikeAddress.setAttribute('name','bikeAddress');
    inputBikeAddress.setAttribute('value',bikeAddress.firstChild.textContent);
    form.appendChild(inputBikeAddress);
    //bikePrice
    var inputBikePrice=document.createElement('input');
    inputBikePrice.setAttribute("type", "text");
    inputBikePrice.setAttribute('name','bikePrice');
    inputBikePrice.setAttribute('value',bikePrice.firstChild.textContent);
    form.appendChild(inputBikePrice);
    //bikeImg
    var inputBikeImg=document.createElement('input');
    inputBikeImg.setAttribute("type", "text");
    inputBikeImg.setAttribute('name','bikeImg');
    //convert img src to canvas and then convert to base64
    var c=document.createElement('canvas')
    //c.width=bikeImg.firstChild.width;
    //c.height=bikeImg.firstChild.height;
    var ctx=c.getContext("2d");
    var img= new Image();
    img.src = bikeImg.firstChild.src;
    c.width=img.width;
    c.height=img.height;
    ctx.drawImage(img,0,0);
    var base64 = c.toDataURL();
    console.log(base64);
    inputBikeImg.setAttribute('value',base64);
    form.appendChild(inputBikeImg);

    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
    


}


