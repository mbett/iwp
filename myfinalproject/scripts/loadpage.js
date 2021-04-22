// Parse the JSON question file into memory
// Store the JSON in Firebase
// Present the learing objectives, skills, and questions for the given page
// Listen for answers
// Record answers and display Correct or hints.

    //let requestURL = 'https://mbett.github.io/iwp/myfinalproject/questions.json';
    //let request = new XMLHttpRequest();
    //request.open('GET', requestURL);
    //request.responseType = 'json';
    //request.send();



    //request.onload = function() {
    // Parse the JSON question file into memory
 //   questions = request.response;
    
    // Store the intial JSON with no student name or answers in firebase overwriting the initial empty JSON 
//    firebase.database().ref('deck/myfinalproject').set(questions);
  
//    }


function updateStudentDB(studentName) {
    // Make the database point to the location root -> myfinalproject -> mycourse -> studentName
    // If the location doesn't exist is will be created
  
    // Save the current status
    firebase.database().ref('deck/myfinalproject/mycourse/' + studentName).set(questions);
  
    

}



function loadPage(page, questions) {
   
  currentPage = page;
  // Simulate a mouse click:
  window.location.href = "page" + page + ".html";
    
      console.log ('Got here:' + JSON.stringify(questions) );
}
    
function loadCurrentPage() {
      
  let parameters = location.search;
  let studentName = parameters.substring( parameters.search("user")+5, parameters.length-7 );
  let currentPage = parseInt(parameters.substr(-1, 1));
  console.log("parameters: " + studentName + " page:" + currentPage);

  fc = firebase.database().ref('deck/myfinalproject/mycourse/' + studentName);
  let questions;

  fc.on("value", function(retrieve) {
    let questions = retrieve.val();

    // Display the learning objectives and skills on the top of the page 1
    populateLearningObjectivesAndSkills(currentPage, studentName, questions);  
 
    // Show the questions  
    showQuestions(currentPage, studentName, questions);
  
  });
    
 
}    


function populateLearningObjectivesAndSkills(page, studentName, questions) {
   const header = document.querySelector('header');
   const section = document.querySelector('section');
   const myH1 = document.createElement('h1');
   myH1.textContent = studentName;
   header.appendChild(myH1);

   console.log('********************Wih name JSON:' + JSON.stringify(questions) );

   // Cycle through the learning objectives and add them to the display
   const lo = questions.mycourse.learningObjective;
   const myPara = document.createElement('p');
   myPara.textContent = 'Learning Obvjectives:<br/>';

   let firstObjective = true;
   for(let i = 0; i < lo.length; i++) {
       console.log( "objective " + lo[i].objective + " for page " + lo[i].page );
       if (lo[i].page == page) {
           if (firstObjective == true ) {
               firstObjective = false;
               myPara.textContent += '<ul>';
           } 
 
        myPara.textContent += '<li>'+ lo[i].objective + '</li>';

       // Cycle through the skills and add them to the display
       const skill = lo[i].questions;
       let firstSkill = true;
       for(let j = 0; j < skill.length; j++) {
          if (firstSkill == true ) {
               firstSkill = false;
               myPara.textContent += '<ul>';
          } 
          myPara.textContent += '<li>' + skill[j].skill + '</li>';     
       }
       // Close the skill list    
       if (firstSkill == false )      
          myPara.textContent += '</ul>';
   }
   
   // Close the objective list    
   if (firstObjective == false )      
       myPara.textContent += '</ul>';

   header.appendChild(myPara);      
}

function showQuestions(page, studentName, questions) {
        
    
    
       console.log('====================Wih name JSON:' + JSON.stringify(questions) );

        ///*************************update this
    //  const heroes = jsonObj['members'];
        
//let fc = firebase.database().ref('deck/myfinalproject');
//console.log('Output: ' + fc.toString() );
//console.log('JSON: ' + fc.toJSON() );
return;
      const heroes = questions['members'];

      for(let i = 0; i < heroes.length; i++) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        const superPowers = heroes[i].powers;
        for(let j = 0; j < superPowers.length; j++) {
          const listItem = document.createElement('li');
          listItem.textContent = superPowers[j];
          myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
      }
    }
