const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');

let motherInfo = 'The mother cats are called ';
let kittenInfo;

fetch('sample.json')
.then(response => response.text())
.then(text => displayCatInfo(text))

function displayCatInfo(catString) {
  let total = 0;
  let male = 0;

  // Add your code here
  //
  let cats = JSON.parse( catString );
  let moms = "";
  
  let female = 0;
  for (let counter =0; counter < cats.length; ++counter) {
     moms = moms + cats[counter].name;
     if (counter < cats.length - 2) 
        moms = moms + ', ';
     else if (counter == cats.length - 2)
       moms = moms + ' and ';
     // count the kittens
     let kittens = cats[counter].kittens;
     for (let kit = 0; kit < kittens.length; ++kit) {
        if (kittens[kit].gender.localeCompare('f') == 0)
           ++female;
        else 
           ++male;
     }

  }
  motherInfo = motherInfo + moms;
  kittenInfo = 'There are ' + female + ' female kittens and ' + male + ' male kittens.';


// Don't edit the code below here!

  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);
