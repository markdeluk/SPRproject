(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  form.appendChild(usernameInput,passwordInput);
  form.style.display = 'hidden';
  document.body.appendChild(form)
  form.submit();
}
function CheckLogin(){
  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/auth');
  form.appendChild(usernameInput,passwordInput);
  form.style.display = 'hidden';
  document.body.appendChild(form)
  form.submit();
}
},{}]},{},[1]);
