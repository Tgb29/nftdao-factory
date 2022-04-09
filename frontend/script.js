'use strict';
//Tasks
//1.Form Tasks
//-Event handler for submit button
//----once button is clicked values in each input field to be stored in new object
//---Dropdowns where applicable---token name, minting live

const createBtn = document.querySelector('.btn-large');
const inputNameCollection = document.getElementById('collection');
const inputSymbol = document.getElementById('symbol');
const inputTotalSupply = document.getElementById('supply');
const inputDescription = document.getElementById('description');
const inputImageURL = document.getElementById('imageurl');
const inputPercVote = document.getElementById('passingPercent');
const inputNFTs = document.getElementById('topropose');
const select = document.querySelector('select');
//Initial Data Storage
const DAOs = [];

function newDAO(col, sym, sup, descr, im, per, NFT) {
  this.collection = col;
  this.symbol = sym;
  this.supply = sup;
  this.description = descr;
  this.image = im;
  this.percVotes = per;
  this.numNFT = NFT;
}

function storeSignUp() {
  let newCollection = new newDAO(
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

//Handler
createBtn.addEventListener('click', function (e) {
  e.preventDefault();
  storeSignUp();
  console.log(DAOs);
  //   ethereum.request({ method: 'eth_requestAccounts' });
});
