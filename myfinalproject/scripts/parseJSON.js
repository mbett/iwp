    
// Parse the JSON question file into memory
// Store the JSON in Firebase
// Present the learing objectives, skills, and questions for the given page
// Listen for answers
// Record answers and display Correct or hints.

    let requestURL = 'https://mbett.github.io/iwp/myfinalproject/questions.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    let questions;
    request.onload = function() {
    
    // Parse the JSON question file into memory
    questions = request.response;
    
    // Store the intial JSON with no student name or answers in firebase overwriting the initial empty JSON 
    firebase.database().ref('deck/myfinalproject/nostudent').set(questions);
  
    }


function updateStudentDB(studentName) {
    // Make the database point to the location root -> myfinalproject -> mycourse -> studentName
    // If the location doesn't exist is will be created
  
    // Save the current status
    firebase.database().ref('deck/myfinalproject/mycourse/' + studentName).set(questions);
  
    

}

let currentPage;

function loadFirstPage(page, questions, studentName) {
   
  currentPage = page;
  // Simulate a mouse click:
  window.location.href = "page" + page + ".html?user=" + studentName + "&page=1";
    
//      console.log ('Got here:' + JSON.stringify(questions) );
}
    
function loadCurrentPage() {
    
  // Display the learning objectives and skills on the top of the page 1
  populateLearningObjectivesAndSkills(currentPage, questions);  
 
  // Show the questions  
  showQuestions(currentPage, questions);
  
}    

function startLesson() {
  
    
  // Get the student's name
  let studentName = document.getElementById("studentName").value;
  
  // Store the student's name in the JSON
  questions.mycourse.student = studentName;

  console.log ('Questions2:' + JSON.stringify(questions) );
  
  // Update the database to store a set of responses for this student
  updateStudentDB(studentName);          
    
  // Start going through the lesson
  // Load the first page
  loadFirstPage( 1, questions, studentName );
   
  
                        
}

function populateLearningObjectivesAndSkills(questions) {
   const header = document.querySelector('header');
   const section = document.querySelector('section');
   const myH1 = document.createElement('h1');
   myH1.textContent = questions.mycourse.student;
   header.appendChild(myH1);

   // Cycle through the learning objectives and add them to the display
   // Cycle through the skills and add them to the display
   const myPara = document.createElement('p');
        
         ///*************************update this
        
      myPara.textContent = 'Learning Obvjectives:';
      header.appendChild(myPara);
}

function showQuestions(jsonObj) {
        
        ///*************************update this
    //  const heroes = jsonObj['members'];
        
let fc = firebase.database().ref('deck/myfinalproject');
console.log('Output: ' + fc.toString() );
console.log('JSON: ' + fc.toJSON() );
return;
        
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
