'use strict';
import Web3 from 'web3';
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

const factoryAddress = "0x9417CC87002627605075F4BDbab5B85b47c90e1D";

const abi = [
  {
    "inputs": [],
    "name": "allNFTDAOs",
    "outputs": [
      {
        "internalType": "contract NFTDAO[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_maxSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_totalVotesThreshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_proposalThreshold",
        "type": "uint256"
      }
    ],
    "name": "createNFTDAO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const ethEnabled = async () => {
  if (window.ethereum) {
    window.eth_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}

ethEnabled().then(enabled => alert("Wallet connected!"));

function sendMethodFactory(contract) {
  return function sendMethod(methodName, args, verb = "send", callback) {
    contract.methods[methodName](...args).estimateGas({}, (err, gas) => {
      const result = contract.methods[methodName](...args)[verb]({ gas });
      if (callback) {
        result.then(callback);
      }
    });

  };
}

function factoryContract(callback) {
  const contract = new web3.eth.Contract(abi, factoryAddress, { from: window.eth_accounts[0] });
  const sendMethod = sendMethodFactory(contract);
  callback(contract, sendMethod);

}

function createNFTDAO() {
  factoryContract((_, sendMethod) => {
    sendMethod("createNFTDAO", ["TEST4", "TST4", 100, 1, 1]);
  });

}

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
  //ethereum.request({ method: 'eth_requestAccounts' });
  createNFTDAO();
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
