var NextButton = document.getElementById('NextButton');
var PinLockInput = document.getElementById('PinLock');
PinLockInput.addEventListener('keypress', function(event){
    //Prevent the value to be added
    event.preventDefault();
    //Regex that you can change for whatever you allow in the input (here any word character --> alphanumeric & underscore)
    var reg = /\w/g;
    //retreive the input's value length
    var inputChar = String.fromCharCode(event.which);
    //retreive the input's value length
    var inputLength = PinLockInput.value.length;
    if ( reg.test(inputChar) && (inputLength < 4) ) {
        //if input length < 4, add the value
        PinLockInput.value = PinLockInput.value + inputChar;
    }else{
        //else do nothing
        return;
    }
});
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