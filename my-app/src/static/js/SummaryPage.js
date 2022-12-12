let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click',function(){HomePage()})

function HomePage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/home');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}