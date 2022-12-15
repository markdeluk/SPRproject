let paymentMethod = 'none';



var PayButton = document.getElementById('PayButton');
PayButton.addEventListener('click',function(){PhotoCapturePage()});
var CreditCardContainer = document.getElementById('CreditCard');
var PaypalContainer = document.getElementById('PayPal');
PaypalContainer.addEventListener('click',function(){paymentMethod='Paypal'});
CreditCardContainer.addEventListener('click',function(){paymentMethod='CreditCard'});

function PhotoCapturePage(){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/PhotoCapture');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}