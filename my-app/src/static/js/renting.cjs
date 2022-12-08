//TODO: Retrieve data for fullperiod and currentperiod

let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    zoom: 12
});



let BikeNameLabel = document.getElementById('BikeName');
let AddressLabel = document.getElementById('Address');
let TimeLabel = document.getElementById('Time');
let TimeBarIn = document.getElementById('TimeBarIn');
let TimeBarOut = document.getElementById('TimeBarOut');
let GiveBackButton = document.getElementById('GiveBackButton');
let RentButton = document.getElementById('RentButton');
let LendButton = document.getElementById('LendButton');
//TEST DATA

let BikeName = "City Bike";
let Address = "Kamtjatka 13"
let fullBarWidth = TimeBarIn.offsetWidth;
let StartDate =  new Date(2022,11,8,0,0,0).getTime();
let EndDate = new Date (2022,11,8,17,0,0).getTime();
let fullPeriod =  EndDate - StartDate;
let now = Date.now()
let timeRemained = getDifference(EndDate,now);
let Time = timeRemained.daysDifference.toString() + " day(s) "+" " + timeRemained.hoursDifference.toString() + " hour(s) " + timeRemained.minutesDifference.toString() + " minute(s) " + timeRemained.secondsDifference.toString() + " second(s)";

BikeNameLabel.innerHTML = BikeName;
AddressLabel.innerHTML = Address;
TimeLabel.innerHTML = Time;
GiveBackButton.addEventListener('click', function(){ShowDamagePage()});
LendButton.addEventListener('click', function(){LendPage()});
updateClock();
//function that return difference in days, hours, minutes, and seconds.
function getDifference(end,start){
    let remainingPeriod = end - start;
    var daysDifference = Math.floor(remainingPeriod/1000/60/60/24);
    remainingPeriod -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(remainingPeriod/1000/60/60);
    remainingPeriod -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(remainingPeriod/1000/60);
    remainingPeriod -= minutesDifference*1000*60

    var secondsDifference = Math.floor(remainingPeriod/1000);
    return {daysDifference,hoursDifference,minutesDifference,secondsDifference,remainingPeriod};
}

function updateClock() {
    let now = Date.now()
    let currentPeriod =  now -  StartDate;
    let timeRemained = getDifference(EndDate,now);
    //if period is finished, rent is ended automatically
    if (timeRemained.remainingPeriod <=0)
    {
        ShowDamagePage();
    }
    Time = timeRemained.daysDifference + " day(s)"+ timeRemained.hoursDifference + " hour(s)" + timeRemained.minutesDifference + " minute(s)" + timeRemained.secondsDifference + " second(s)";
    console.log("currentPeriod",currentPeriod)
    console.log("FullPeriod",currentPeriod)
    //get the percentage of time used
    let percentage =  currentPeriod / fullPeriod;
    //get the width of the percentage bar
    let widthBar =  fullBarWidth - percentage *fullBarWidth;
    //set widthBar
    console.log(widthBar);
    TimeBarIn.style.width= widthBar+'px';
    TimeLabel.innerHTML = Time;
    setTimeout(updateClock, 1000);
}

function ShowDamagePage(){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/ShowDamageAfter');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}
function LendPage(){
    console.log("Redirect to Lend Page");
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/LendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}
updateClock(); // initial call

