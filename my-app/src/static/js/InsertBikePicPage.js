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
let stream;
TryAgainButton.addEventListener("click",function(){TryAgainPicture()});
NextButton.addEventListener("click", function(){TakeWheelPicture()});
takePictureButton.addEventListener('click', function() {OverallPicturedataUrl = TakePicture()});
CaptureButton.addEventListener('click', async function() {
    CaptureButton.parentNode.replaceChild(takePictureButton,CaptureButton);
    video.style.height="300px";
    video.style.width= "450px";
     stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.autoplay = true;
    video.load();
    let Camera = document.getElementById('Camera');
    Camera.parentNode.replaceChild(video,Camera);
    
});



function TakePicture(){
    canvas.style.height="300px";
    canvas.style.width= "450px";
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.height="300px";
    video.style.width= "450px";
   	let DataUrl = canvas.toDataURL('image/jpeg');
       stream.getTracks().forEach(function(track) {
        track.stop();
      });
    video.parentNode.replaceChild(canvas,video);
    takePictureButton.parentNode.replaceChild(TryAgainButton,takePictureButton);
    TryAgainButton.parentNode.appendChild(NextButton);

    return DataUrl
}

function createDescription(imgsrc,description){
    let SamplePic = document.createElement('img');
    SamplePic.id = "Camera";
    SamplePic.src = imgsrc;
    canvas.parentNode.replaceChild(SamplePic,canvas);
    PicDescription.innerHTML = description;
}
function TakeWheelPicture(){
    createDescription("css/imgs/WheelPictureSample.png","Wheel");
    //now takePictureButton will make a picture of the seat
    takePictureButton.addEventListener('click', function() {WheelPicturedataUrl = TakePicture()});
    NextButton.addEventListener("click", function(){TakeSeatPicture()});
    TryAgainButton.parentNode.removeChild(NextButton);
    TryAgainButton.parentNode.replaceChild(CaptureButton,TryAgainButton);
}

function TakeSeatPicture(){
    createDescription("css/imgs/WheelPictureSample.png","Wheel");
    //now takePictureButton will make a picture of the seat
    takePictureButton.addEventListener('click', function() {SeatlPicturedataUrl = TakePicture()});
    NextButton.addEventListener("click", function(){SummaryPage()});
    TryAgainButton.parentNode.removeChild(NextButton);
    TryAgainButton.parentNode.replaceChild(CaptureButton,TryAgainButton);
}

function createButton(labelText,status){
    let Button = document.createElement('button');
    let divButton = document.createElement('div');
    divButton.classList.add('Text');
    divButton.innerHTML = labelText;
    Button.appendChild(divButton);
    Button.classList.add('Button');
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