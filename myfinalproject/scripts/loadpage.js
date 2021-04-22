// Parse the JSON question file into memory
// Store the JSON in Firebase
// Present the learing objectives, skills, and questions for the given page
// Listen for answers
// Record answers and display Correct or hints.


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
  
    
  // Get the url string that has the page number and the user name  
  let parameters = location.search;
  let studentName = parameters.substring( parameters.search("user")+5, parameters.length-7 );
  let currentPage = parseInt(parameters.substr(-1, 1));
    
  // Print them out for debugging
  // console.log("parameters: " + studentName + " page:" + currentPage);

  // Get or create the student record  
  fc = firebase.database().ref('deck/myfinalproject/mycourse/' + studentName);
  fc.on("value", function(retrieve) {
    let studentCourseData = retrieve.val();

    // Display the learning objectives and skills on the top of the page 
    populateLearningObjectivesAndSkills(currentPage, studentName, studentCourseData);  
 
    // Show the questions  
    showQuestions(currentPage, studentName, studentCourseData);
  
  });
    
 
}    

// Display the learning objectives and skills on the top of the page 
//
function populateLearningObjectivesAndSkills(page, studentName, studentCourseData) {
   
   // grab the location in the HTML file to load the learning objectives and skills
   const header = document.querySelector('header');
    
   // a spot to print the student name
   const myH1 = document.createElement('h1');
   myH1.textContent = studentName;
   header.appendChild(myH1);

   // Print out the JSON object for debugging
   // console.log('********************Wih name JSON:' + JSON.stringify(questions) );

   // Cycle through the learning objectives and add them to the display
   const lo = studentCourseData.mycourse.learningObjective;
   let myPara = 'Learning Obvjectives:<br/>';

   let firstObjective = true;
   for(let i = 0; i < lo.length; i++) {
       console.log( "objective " + lo[i].objective + " for page " + lo[i].page );
       if (lo[i].page == page) {
           if (firstObjective == true ) {
               firstObjective = false;
               myPara += '<ul>';
           } 
 
           myPara += '<li>'+ lo[i].objective + '</li>';
       
           // Cycle through the skills and add them to the display
           const skill = lo[i].questions;
           let firstSkill = true;
           for(let j = 0; j < skill.length; j++) {
              if (firstSkill == true ) {
                  firstSkill = false;
                  myPara += '<ul>';
              } 
              myPara += '<li>' + skill[j].skill + '</li>';     
           } //end for
           // Close the skill list    
           if (firstSkill == false )      
             myPara += '</ul>';
       } // end if (lo[i].page == page) 
   } //end for
   
   // Close the objective list    
   if (firstObjective == false )      
       myPara += '</ul>';

   header.innerHTML = myPara;    
}

function showQuestion(question) {
        
   console.log('***********Question:' + JSON.stringify(question) );
   
   let html = question.question + "<br/>";
   let type = question.questionType;
   if (type.localCompare("Multiple Choice") == 0) // strings match
   { 
       //multiple choice
       html += "Choose one of the following:<br/>";  
       for (i=0; i < question.destractor.length; ++i) {
           html += question.destractor[i] + "<br/>";
       }
   } else {
       // short answer
       // create a text input box
       html += "Answer:  <input type=\"text\" id=\"q1\" name=\"q1\" required>";
   }
   return html;
}
    
function showQuestions(page, studentName, studentCourseData) {
   
   // grab the location in the HTML file to load the questions
   const section = document.querySelector('section');
   
 
   // console.log('====================Wih name JSON:' + JSON.stringify(studentCourseData) );
   
   // Cycle through the learning objectives and add them to the display
   const lo = studentCourseData.mycourse.learningObjective;
   let myPara = 'Learn By Doing<br/>';
      

   for(let i = 0; i < lo.length; i++) {
      if (lo[i].page == page) {       
           
         // Cycle through the questions and add them to the display
         const question = lo[i].questions;
         for(let j = 0; j < question.length; j++) {
            myPara += showQuestion(question[j]);     
         } //end for
          
       } // end if (lo[i].page == page) 
   } //end for
    
   header.innerHTML = myPara; 
   return;
    
    
    
        ///*************************update this
 
        


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
