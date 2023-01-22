var ideas = JSON.parse(localStorage.getItem("ideas")) || [];

// display the current date
var date = document.getElementById("date");
var today = new Date();
date.innerHTML = today.toDateString();

function saveIdea() {
  var ideaInput = document.getElementById("ideaInput");
  var idea = ideaInput.value;
  ideas.push(idea);
  localStorage.setItem("ideas", JSON.stringify(ideas));
  ideaInput.value = "";
  displayIdeas();
}

function displayIdeas() {
  var ideasDiv = document.getElementById("ideas");
  ideasDiv.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    var today = new Date();
    var date = today.toDateString();
    ideasDiv.innerHTML += `
      <div class="feed">
        <div class="feed-date">${date}</div>
        <p>${idea}</p>
      </div>
    `;
  }
}
function displayIdeas() {
  var ideasDiv = document.getElementById("ideas");
  ideasDiv.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    var today = new Date();
    var date = today.toDateString();
    ideasDiv.innerHTML += `
      <div class="feed">
        <div class="feed-date">${date}</div>
        <p>${idea}</p>
        <button onclick="deleteIdea(${i})">Delete</button>
      </div>
    `;
  }
}
function deleteIdea(index) {
  if(confirm("Are you sure you want to delete this idea?")) {
    ideas.splice(index, 1);
    localStorage.setItem("ideas", JSON.stringify(ideas));
    displayIdeas();
  }
}

function clearAllIdeas() {
  if(confirm("Are you sure you want to clear all the ideas?")) {
    ideas = [];
    localStorage.setItem("ideas", JSON.stringify(ideas));
    displayIdeas();
  }
}


function checkIdeaForToday() {
  // Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  var todayDate = yyyy + '-' + mm + '-' + dd;

  // Check if there is already an idea for today's date
  var existingIdeas = JSON.parse(localStorage.getItem("ideas"));
  var ideaExists = false;
  if (existingIdeas) {
    existingIdeas.forEach(function(idea) {
      if (idea.date === todayDate) {
        ideaExists = true;
      }
    });
  }

  // If an idea for today's date already exists, prompt the user
  if (ideaExists) {
    var confirmAddIdea = confirm("You have already added an idea for today. Do you want to add more?");
    if (!confirmAddIdea) {
      return;
    }
  }

  // Add new idea
  var ideaInput = document.getElementById("ideaInput");
  var idea = ideaInput.value;
  var ideaObject = {
    date: todayDate,
    idea: idea
  }
  var existingData = JSON.parse(localStorage.getItem("ideas"));
  if (existingData === null) {
    existingData = [];
  }
  existingData.push(ideaObject);
  localStorage.setItem("ideas", JSON.stringify(existingData));
  ideaInput.value = "";
  loadIdeas();
}


function checkForExistingIdea() {
  var date = new Date();
  var dateString = date.toDateString();
  var existingData = JSON.parse(localStorage.getItem("ideas")) || [];
  var existingIdea = existingData.find(idea => idea.date === dateString);
  if (existingIdea) {
    var confirmAdd = confirm("You've already added an idea for today. Do you want to add another?");
    if (!confirmAdd) {
      return;
    }
  }
  // other logic to save idea here
}
