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

   header.innerHTML += myPara;    
}


function checkAnswer(questionid, answer) {
    console.log("Check " + questionid + " with answer " + answer);
}

function showQuestion(number, question) {
        
   console.log('***********Question:' + JSON.stringify(question) + '===>' + question.answer );
   
   let html = "<br/>" + question.question + "<br/>";
   let type = question.questionType;
   if (type == "multiple choice")  // strings match
   { 
        console.log('=======MCQ:' + html + '  type :' + type );
       //multiple choice
       html += "Choose one of the following:<br/><br/><form>";
       
       // print the distractors
       const distractor = question.distractor;
       for (i=0; i < distractor.length; ++i) {
            html +='<input type="radio" name="q' + number + '" onchange="checkAnswer(' + number + ', \'' + distractor[i] + '\')" value="' + distractor[i] + '">' + distractor[i] + ' <br/>';
      }
       html +='<input type="radio" name="q' + number + '" onchange="checkAnswer(' + number + ', \'' + question.answer +' \')" value="' + question.answer + '">' + question.answer + ' <br/>';
       html += "</form><br/>";
   } else {
        console.log('=====Short Q:' + html + '  type :' + type );
       // short answer
       // create a text input box
       html += 'Enter your answer:<br/><br/>  <input type="text" id="q' + number + '" name="q' + number + '" required> <button onclick="checkAnswer(' + number + ', \'some text\')">Submit</button><br/>';
   }
   // Add a final line break;
   html += "<br/>";
    console.log('HTML is......' + html );
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
            //incldues hack to generate unique number for each skill. Fails for more than 100 skills on a learning objective
            myPara += showQuestion(i*100+j, question[j]);     
         } //end for
          
       } // end if (lo[i].page == page) 
   } //end for
    
   section.innerHTML = myPara; 
    
   return;
    
    
    
    }
