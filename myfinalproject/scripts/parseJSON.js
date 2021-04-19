    
// Parse the JSON question file into memory
// Store the JSON in Firebase
// Present the learing objectives, skills, and questions for the given page
// Listen for answers
// Record answers and display Correct or hints.

    const header = document.querySelector('header');
    const section = document.querySelector('section');

    let requestURL = 'https://mbett.github.io/iwp/myfinalproject/questions.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
   

      // Parse the JSON question file into memory
      const questions = request.response;
      // Get the student name
      
      // Get the current page
      // Display the learning objectives and skills on the top of the page
      populateLearningObjectivesAndSkills(questions);  
      // Store the JSON in Firebase
    
      showQuestions(questions);
    }

    function populateLearningObjectivesAndSkills(jsonObj) {
      const myH1 = document.createElement('h1');
      myH1.textContent = jsonObj['squadName'];
      header.appendChild(myH1);

      const myPara = document.createElement('p');
        
         ///*************************update this
        
      myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
      header.appendChild(myPara);
    }

    function showQuestions(jsonObj) {
        
        ///*************************update this
      const heroes = jsonObj['members'];

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