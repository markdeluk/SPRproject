var PayButton = document.getElementById('PayButton');
PayButton.addEventListener('click',function(){PhotoCapturePage()});


function PhotoCapturePage(){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/PhotoCapture');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}