var StartButton = document.getElementById('StartButton');
StartButton.addEventListener('click',function(){InputLendDataPage()});

var BackButton = document.getElementById('StartButton');
BackButton.addEventListener('click',function(){BackPage()});

function InputLendDataPage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/InputLendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}
function BackPage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/LendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}