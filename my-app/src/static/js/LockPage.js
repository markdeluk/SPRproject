//TODO: retrieve PinCode
let PinCode = "123456"
let doneButton = document.getElementById('doneButton');
let PinCodeLabel = document.getElementById('PinCode');

PinCodeLabel.innerHTML = PinCode;
doneButton.addEventListener('click',function(){HomePage()});

function HomePage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/Renting');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}