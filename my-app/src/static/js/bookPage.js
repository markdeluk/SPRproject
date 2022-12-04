//TODO: retrieve day,week, month price




/////////////these variables should get a dinamic value retrieved by the server
var dayPrice = 10;
var weekPrice = 20;
var monthPrice = 100;
var counterDays = 1;
var counterWeeks = 0;
var counterMonths = 0;
var TotalAmount = 0;
//When the page is loaded, all button are setted to false.
var dayButtonStatus = false;
var weekButtonStatus = false;
var monthButtonStatus = false;
//function that listens monthButton activity
var dayButton = document.getElementById('daySelection');
var weekButton = document.getElementById('weekSelection');
var monthButton = document.getElementById('monthSelection');
var plusButtons = document.getElementsByClassName('plusButton');
var minusButtons = document.getElementsByClassName('minusButton');

TotalAmount = dayPrice*counterDays + weekPrice*counterWeeks + monthPrice*counterMonths;
var BikeRentalAmount = document.getElementById("BikeRentalLabel");
BikeRentalAmount.innerHTML = TotalAmount;
var TimeAmount = "";
TimeAmount=counterDays.toString()+" Day(s)";
var TimeAmountLabel = document.getElementById("AmountDetailLabel");
TimeAmountLabel.innerHTML = " "+TimeAmount;
for (var i = 0; i < plusButtons.length;i++){
    plusButtons[i].addEventListener("click",function(){addQuantity(this)});
    minusButtons[i].addEventListener("click",function(){removeQuantity(this)});
}
dayButton.addEventListener("click",function(){dayActivate();});
weekButton.addEventListener("click",function(){weekActivate();});
monthButton.addEventListener("click",function(){monthActivate();});

function addQuantity(element){
    //get the name of the element and use it to identify the button among the option frames
    var ID = element.attributes["name"].value;
    if (ID == 'day'){
        dayActivate();
        counterDays++
        TimeAmount=counterDays.toString()+" "+ID+ "(s)";
    }
    else if (ID == 'week'){
        weekActivate();
        counterWeeks++
        TimeAmount=counterWeeks.toString()+" "+ID+ "(s)";
    }
    else if (ID == 'month'){
        monthActivate();
        counterMonths++
        TimeAmount=counterMonths.toString()+" "+ID+ "(s)";
    }
    TotalAmount = dayPrice*counterDays + weekPrice*counterWeeks + monthPrice*counterMonths;
    var BikeRentalAmount = document.getElementById("BikeRentalLabel");
    BikeRentalAmount.innerHTML = TotalAmount;
    var TimeAmountLabel = document.getElementById("AmountDetailLabel");
    TimeAmountLabel.innerHTML = TimeAmount;

}

function removeQuantity(element){
    //get the name of the element and use it to identify the button among the option frames
    var ID = element.attributes["name"].value;
    var TimeAmount = "";
    if (ID == 'day'){
        dayActivate();
        if(counterDays>0){
            counterDays--
            
        }
        TimeAmount=counterDays.toString()+" "+ID+ "(s)";
        console.log("contatore giorni "+ counterDays);
    }
    else if (ID == 'week'){
        weekActivate();
        if(counterWeeks>0){
            counterWeeks--
            
        }
        TimeAmount=counterWeeks.toString()+" "+ID+ "(s)";
    }
    else if (ID == 'month'){
        monthActivate();
        if(counterMonths>0){
            counterMonths--
        }
        TimeAmount=counterMonths.toString()+" "+ID+ "(s)";
        
    }
    TotalAmount = dayPrice*counterDays + weekPrice*counterWeeks + monthPrice*counterMonths;
    var BikeRentalAmount = document.getElementById("BikeRentalLabel");
    BikeRentalAmount.innerHTML = TotalAmount;
    var TimeAmountLabel = document.getElementById("AmountDetailLabel");
    TimeAmountLabel.innerHTML = TimeAmount;

}
function dayActivate(){
    counterWeeks = 0;
    counterMonths = 0;
    console.log('day clicked');
    changeStatus(monthButton,false);
    changeStatus(weekButton,false);
    changeStatus(dayButton,true);
}
function weekActivate(){
    counterDays = 0;
    counterMonths = 0;
    console.log('week clicked');
    changeStatus(monthButton,false);
    changeStatus(weekButton,true);
    changeStatus(dayButton,false);
}
function monthActivate(){
    counterDays = 0;
    counterWeeks = 0;
    console.log('month clicked');
    changeStatus(monthButton,true);
    changeStatus(weekButton,false);
    changeStatus(dayButton,false);
}
//function that changes css and status of the element
function changeStatus(element,status){
    console.log('Element ID :'+ element.id);
    //change status of button
    if (element.id = 'dayButton'){
        dayButtonStatus = status;
    }
    else if (element.id = 'weekButton'){
        weekButtonStatus =  status;
    }
    else if (element.id = 'monthButton'){
        monthButtonStatus =  status;
    }
    var color = "";
    if (status == false){
        color = "rgb(128, 128, 128)";
    }
    else{
        color = "rgb(0, 163, 255)";  
    }
    console.log('color:'+ color);
    var optionFrames = document.getElementsByClassName('optionFrame');
    var minusButtons = document.getElementsByClassName('minusButton');
    var plusButtons = document.getElementsByClassName('plusButton');
    var selectedOptions =  document.getElementsByClassName('selectedOption');
    //set minus. plus and border of the right color
    console.log("length optionframes"+optionFrames.length);
        for (var i=0;i < optionFrames.length;i++){
            console.log("id option frame"+optionFrames[i].attributes["name"].value +" "+element.name)
            if (optionFrames[i].attributes["name"].value== element.name){
                optionFrames[i].style.borderColor = color;
                minusButtons[i].style.color = color;
                plusButtons[i].style.color = color;
                //set also the color of the status
                if (status == false){
                    console.log("deactivated")
                    selectedOptions[i].style.backgroundImage = "url('../css/imgs/statusnotSelected.png')";
                }
                else{
                    console.log("activated")
                    selectedOptions[i].style.backgroundImage = "url('../css/imgs/statusSelected.png')";
                }
                break;
            }
        }

}
const socket = io("http://LAPTOP-7M6U6UFG:4000", {
    withCredentials: true
    });