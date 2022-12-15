var plusButton = document.getElementById('plusButton');
var minusButton = document.getElementById('minusButton');
let TimeLabel = document.getElementById('ReservationTime');
let reserveButton = document.getElementById('ReserveButton');
//add 10 minutes per click
let costUnit = 2;
let unit = 10;
let totalTime = 0;
let totalCost = 0;
plusButton.addEventListener('click',addTime);
minusButton.addEventListener('click',removeTime);
reserveButton.addEventListener('click',BookPage);


function addTime(){
    totalTime+=unit;
    totalCost = totalTime * costUnit;
    updateTimeLabel();
}
function removeTime(){
    totalTime-=unit;
    totalCost = totalTime * costUnit;
    updateTimeLabel();
}
function updateTimeLabel(){
    TimeLabel.innerHTML = totalTime.toString() + " minutes";
}
function BookPage(){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/book');
    var inputName=document.createElement('input');
    inputName.setAttribute("type", "text");
    inputName.setAttribute('name','bikeName');
    inputName.setAttribute('value',bikeName);
    form.appendChild(inputName);
    //BikeDescription
    var inputBikeDescription=document.createElement('input');
    inputBikeDescription.setAttribute("type", "text");
    inputBikeDescription.setAttribute('name','bikeDescription');
    inputBikeDescription.setAttribute('value',bikeDescription);
    form.appendChild(inputBikeDescription);
    //bikeaddress
    var inputBikeAddress=document.createElement('input');
    inputBikeAddress.setAttribute("type", "text");
    inputBikeAddress.setAttribute('name','bikeAddress');
    inputBikeAddress.setAttribute('value',bikeAddress);
    form.appendChild(inputBikeAddress);
    //BID
    var inputBID=document.createElement('input');
    inputBID.setAttribute("type", "text");
    inputBID.setAttribute('name','BID');
    inputBID.setAttribute('value',BID);
    form.appendChild(inputBID);
    //reservationAmount
    var inputReserve=document.createElement('input');
    inputReserve.setAttribute("type", "text");
    inputReserve.setAttribute('name','reservationAmount');
    inputReserve.setAttribute('value',totalCost);
    form.appendChild(inputReserve);
    //bikePrice
    var inputBikePrice=document.createElement('input');
    inputBikePrice.setAttribute("type", "text");
    inputBikePrice.setAttribute('name','bikePrice');
    inputBikePrice.setAttribute('value',bikePrice);
    form.appendChild(inputBikePrice);
    //bikeImg
    var inputBikeImg=document.createElement('input');
    inputBikeImg.setAttribute("type", "text");
    inputBikeImg.setAttribute('name','bikeImg');
    /*
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
    */
   
    console.log(base64);
    inputBikeImg.setAttribute('value',base64);
    form.appendChild(inputBikeImg);

    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}