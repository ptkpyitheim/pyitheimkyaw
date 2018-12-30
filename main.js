

function toBeRendered() {
  var ref = firebase.database().ref();
  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().Name);
      renderRec(childSnapshot.val());
    });
  });
}

toBeRendered();


var nameP = document.getElementById("recommender-input");
var emailP = document.getElementById("email");
var relP = document.getElementById("relationship-input");
var displayTextP = document.getElementById("rec-letter");


function writeNewPost(theName, theEmail, theRel, theRec) {
  var postData = {
    Name: theName,
    Email: theEmail,
    Relationship: theRel,
    Recommendation: theRec
  };

  firebase.database().ref().push().set(postData);
  return postData;
}



function renderRec(data) {
  console.log("Rending data...");

  var name = data.Name;
  var email = data.Email;
  var rel = data.Relationship;
  var displayText = data.Recommendation;

  console.log(name);
  console.log(email);
  console.log(rel);
  console.log(displayText);

  var displayName = document.createElement("div");
  displayName.classList.add("display-rec-name");
  displayName.innerText = name;

  var displayRel = document.createElement("div");
  displayRel.classList.add("display-relationship");
  displayRel.innerText = rel

  var recLetter = document.createElement("div");
  recLetter.classList.add("display-rec-letter");
  recLetter.innerText = displayText;

  var newEl = document.createElement("div");
  newEl.classList.add("display-recommendations");
  newEl.appendChild(displayName);
  newEl.appendChild(displayRel);
  newEl.appendChild(recLetter);

  var toAdd = document.getElementById("recommendation");
  toAdd.appendChild(newEl);

}


function storeInFireBase(event) {
  event.preventDefault();

  var returnVal = writeNewPost(nameP.value, emailP.value, relP.value, displayTextP.value);

  renderRec(returnVal);

  nameP.value = "";
  emailP.value = "";
  relP.value = "";
  displayTextP.value = "";

}


var submitButton = document.getElementById("submit-rec");
submitButton.addEventListener("click", storeInFireBase);


var myVideo = document.getElementById("video1");

function playPause() {
  if (myVideo.paused)
    myVideo.play();
  else
    myVideo.pause();
}
