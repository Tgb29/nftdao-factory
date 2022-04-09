'use strict';
const subBtn = document.getElementById('sub');
//Manage
subBtn.addEventListener('click', function () {
  //   e.preventDefault();
  const ele = document.getElementsByTagName('input');
  for (let i = 0; i < ele.length; i++) {
    if ((ele[i].type = 'radio' && ele[i].checked)) {
      location.href = `${ele[i].id}.html`;
    }
  }

  //   location.href = 'proposal.html';
  console.log('click heard');
});
