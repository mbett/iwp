function initializeFirebase() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC9eDzCtHrP4ZTwoB7puT0R2YA39lD-1mg",
    authDomain: "introduction-2-web-programming.firebaseapp.com",
    databaseURL: "https://introduction-2-web-programming.firebaseio.com",
    projectId: "introduction-2-web-programming",
    storageBucket: "introduction-2-web-programming.appspot.com",
    messagingSenderId: "1096908921815",
    appId: "1:1096908921815:web:06b956148d358dbd36c992",
    measurementId: "G-ZFPVE55QKH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

function writeStudentAnswers(name, email, answers) {
  firebase.database().ref('users/' + name).set({
    username: name,
    email: email,
    answers : answers
  });
    firebase.database().ref('deck/flashy').set(myFlashcards);
}

initializeFirebase();
writeStudentAnswers("michael","foo@bar.com", ["b","c","e","f"]);

let fc = firebase.database().ref('deck/flashy');
console.log('Output: ' + fc.toString() );
console.log('JSON: ' + fc.toJSON() );

let qd;
fc.on("value", function(retrieve) {
    let queryData = retrieve.val();
    console.log('Real JSON:' + JSON.stringify(queryData) );
    qd = JSON.stringify(queryData);
});
console.log('Real Real JSON:' + qd );