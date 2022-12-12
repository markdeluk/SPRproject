var CaptureButton = document.getElementById('CaptureButton');
let canvas = document.createElement('canvas');
let video = document.createElement('video');
let NextButton = createButton("Next","notSelected");
let TryAgainButton = createButton("Try Again", "notSelected");
let takePictureButton = createButton("TakePicture","notSelected");
let PicDescription = document.getElementById('PicDescription');
let OverallPicturedataUrl;
let WheelPicturedataUrl;
let SeatPicturedataUrl;
let flagDataUrl = "Overall";
let stream;
TryAgainButton.addEventListener("click",function(){TryAgainPicture()});
NextButton.addEventListener("click", TakeWheelPicture);
takePictureButton.addEventListener('click', TakePicture);
CaptureButton.addEventListener('click', async function() {
    console.log("CaptureButton")
    CaptureButton.parentNode.replaceChild(takePictureButton,CaptureButton);

    video.style.height="300px";
    video.style.width= "450px";
    video.style.borderRadius = '30px';
     stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.autoplay = true;
    video.load();
    let Camera = document.getElementById('Camera');
    Camera.parentNode.replaceChild(video,Camera);
    console.log(video.parentNode.id);
    
});



function TakePicture(){
    canvas.style.height="300px";
    canvas.style.width= "450px";
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.height="300px";
    video.style.width= "450px";
   	let DataUrl = canvas.toDataURL('image/jpeg');
      console.log(video.parentNode.id);
    video.parentNode.replaceChild(canvas,video);
    takePictureButton.parentNode.replaceChild(TryAgainButton,takePictureButton);
    TryAgainButton.parentNode.appendChild(NextButton);
    if (flagDataUrl == "Overall"){
        OverallPicturedataUrl = DataUrl;
    }
    else if (flagDataUrl == "Wheel"){
        OverallPicturedataUrl = DataUrl;
    }
    else if (flagDataUrl == "Seat"){
        OverallPicturedataUrl = DataUrl;
    }

}

function createDescription(imgsrc,description){
    let SamplePic = document.createElement('img');
    SamplePic.classList.add('PictureFrame');
    SamplePic.id = "Camera";
    SamplePic.src = imgsrc;
    canvas.parentNode.replaceChild(SamplePic,canvas);
    PicDescription.innerHTML = description;
}
function TakeWheelPicture(){
    console.log("TakeWHeelPicutre");
    flagDataUrl = "Wheel";
    createDescription("css/imgs/WheelPictureSample.png","Wheel");
    //now takePictureButton will make a picture of the seat
    NextButton.removeEventListener("click", TakeWheelPicture);
    NextButton.addEventListener("click", TakeSeatPicture);
    TryAgainButton.parentNode.removeChild(NextButton);
    TryAgainButton.parentNode.replaceChild(CaptureButton,TryAgainButton);
}

function TakeSeatPicture(){
    console.log("seat");
    flagDataUrl = "Seat";
    createDescription("css/imgs/SeatPictureSample.png","Seat");
    //now takePictureButton will make a picture of the seat
    NextButton.removeEventListener("click",TakeSeatPicture);
    NextButton.addEventListener("click", function(){SummaryPage()});
    TryAgainButton.parentNode.removeChild(NextButton);
    TryAgainButton.parentNode.replaceChild(CaptureButton,TryAgainButton);
}

function createButton(labelText,status){
    let Button = document.createElement('button');
    let divButton = document.createElement('div');
    divButton.classList.add('Text','SingleButtonContent');
    divButton.innerHTML = labelText;
    Button.appendChild(divButton);
    Button.classList.add('SingleButton');
    if (status == 'Selected')
    Button.style.border = "2px solid #00A3FF";
    return Button;
}

function SummaryPage(){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/SummaryPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}