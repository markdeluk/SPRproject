//TODO: update NET;GROSS;TAXES


let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click',function(){HomePage()})
let NetAmountLabel= document.getElementById('NetAmountLabel');
let GrossAmountLabel= document.getElementById('GrossAmountLabel');
let TaxesAmountLabel= document.getElementById('TaxesAmountLabel');
let GrossAmount = 10;
let TaxesAmount = 2;
let NetAmount = GrossAmount - TaxesAmount ;


NetAmountLabel.innerHTML =  NetAmount.toString()+'DKK';
TaxesAmountLabel.innerHTML = TaxesAmount.toString()+'DKK';
GrossAmountLabel.innerHTML = GrossAmount.toString()+'DKK';
function HomePage(){
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/home');
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}