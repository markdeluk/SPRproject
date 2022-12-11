//TODO: connect button
// put container from bottom
//create css jut for lower part with buttons

var GetStartedButton = document.getElementById('GetStartedButton');
GetStartedButton.addEventListener('click',function(){IntroductionLendPage()});


function IntroductionLendPage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/IntroductionLendPage');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}