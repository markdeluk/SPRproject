var NextButton = document.getElementById('NextButton');
var PinLockInput = document.getElementById('PinLock');
NextButton.addEventListener('click',function(){InsertBikePicPage()});

function InsertBikePicPage(){
    let form = document.createElement('form');
    let PinLock = PinLockInput.value;
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/InsertBikePicPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}