var NextButton = document.getElementById('NextButton');
NextButton.addEventListener('click',function(){InputLockPage()});

var BackButton = document.getElementById('BackButton');
BackButton.addEventListener('click',function(){BackPage()});

function InputLockPage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/InputLockPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}
function BackPage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/IntroductionLendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}