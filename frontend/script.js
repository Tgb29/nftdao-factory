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
const subBtn = document.getElementById('sub');
const proposalBtn = document.getElementById('p1');
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

function myFunction() {
  console.log('heard');
}
//Event handler for Submit sign up

//Handler
//Create
createBtn.addEventListener('click', function (e) {
  e.preventDefault();
  storeSignUp();
  console.log(DAOs);
  //   ethereum.request({ method: 'eth_requestAccounts' });
});

// //Manage
// subBtn.addEventListener('click', function () {
//   //   e.preventDefault();
//   const ele = document.getElementsByTagName('input');
//   for (let i = 0; i < ele.length; i++) {
//     if ((ele[i].type = 'radio' && ele[i].checked)) {
//       location.href = `${ele[i].id}.html`;
//     }
//   }

//   //   location.href = 'proposal.html';
//   console.log('click heard');
// });
// // //Proposal
// proposalBtn.addEventListener('click', function () {
//   console.log('your stupid');
// });
