let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let LoginButton = document.getElementById('LoginButton');
let RegisterButton = document.getElementById('RegisterButton');

LoginButton.addEventListener('click',CheckLogin);
RegisterButton.addEventListener('click',RegisterUser);
function RegisterUser(){
  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/registerUser');
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.style.display = 'hidden';
  document.body.appendChild(form)
  form.submit();
}
function CheckLogin(){
  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/auth');
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.style.display = 'hidden';
  document.body.appendChild(form)
  form.submit();
}