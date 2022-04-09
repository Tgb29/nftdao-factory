'use strict';
//Tasks
//1.Form Tasks
//-Event handler for submit button
//----once button is clicked values in each input field to be stored in new object
//---Dropdowns where applicable---token name, minting live

//Initial Data Storage
const DAOs = [];
function newDAO(
  collection,
  symbol,
  supply,
  description,
  image,
  percVotes,
  numNFT
) {
  this.collection = collection;
  this.symbol = symbol;
  this.supply = supply;
  this.description = description;
  this.image = image;
  this.percVotes = percVotes;
  this.numNFT = numNFT;
}
function storeSignUp() {
  let newCollection = newDAO(
    inputNameCollection.value,
    inputSymbol.value,
    inputTotalSupply.value,
    inputDescription.value,
    inputImageURL.value,
    inputPercVote.value,
    inputNFTs.value
  );
  DAOs.push(newCollection);
}

//Event handler for Submit sign up
const createBtn = document.querySelector('.btn-large');
const inputNameCollection = document.getElementById('name');
const inputSymbol = document.getElementById('symbol');
const inputTotalSupply = document.getElementById('supply');
const inputDescription = document.getElementById('description');
const inputImageURL = document.getElementById('imageurl');
const inputPercVote = document.getElementById('passingPercent');
const inputNFTs = document.getElementById('topropose');

//Handler
createBtn.addEventListener('click', function (e) {
  e.preventDefault();
  storeSignUp();
  console.log(accounts);
  ethereum.request({ method: 'eth_requestAccounts' });
});
