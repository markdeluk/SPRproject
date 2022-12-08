var SkipButton = document.getElementById('SkipButton');
var CaptureButton = document.getElementById('CaptureButton');
let canvas = document.createElement('canvas');
let video = document.createElement('video');
let click_button = document.getElementById('click-photo');

CaptureButton.addEventListener('click', async function() {
    let CameraFrame = document.getElementById('CameraFrame');
    video.style.height="300px";
    video.style.width= "450px";
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.autoplay = true;
    video.load();
    let Camera = document.getElementById('Camera');
    Camera.parentNode.replaceChild(video,Camera);
    //Camera.parentNode.removeChild(Camera);
    //CameraFrame.appendChild(video);
    
});


click_button.addEventListener('click', function() {
    canvas.style.height="300px";
    canvas.style.width= "450px";
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.height="300px";
    video.style.width= "450px";
   	let image_data_url = canvas.toDataURL('image/jpeg');
    video.parentNode.replaceChild(canvas,video);
   	// data url of the image
   	console.log(image_data_url);
});