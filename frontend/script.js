'use strict';
//Tasks
//1.Form Tasks
//-Event handler for submit button
//----once button is clicked values in each input field to be stored in new object
//---Dropdowns where applicable---token name, minting live

//Initial Data Storage
const accounts = [];
function newUserForm(name, email, token, supply, mintLive) {
  this.name = name;
  this.email = email;
  this.token = token;
  this.supply = supply;
  this.mintLive = mintLive;
}
function storeSignUp() {
  let newAccount = new newUserForm(
    inputName.value,
    inputEmail.value,
    inputToken.value,
    inputTotalSupply.value,
    inputMinitingLive.value
  );
  accounts.push(newAccount);
}

//Event handler for Submit sign up
const signupBtn = document.querySelector('.btn-large');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputToken = document.getElementById('token');
const inputTotalSupply = document.getElementById('supply');
const inputMinitingLive = document.getElementById('mintLive');

//Handler
signupBtn.addEventListener('click', function (e) {
  e.preventDefault();
  storeSignUp();
  console.log(accounts);
  ethereum.request({ method: 'eth_requestAccounts' });
});
