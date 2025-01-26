import { fetchData } from "./api";

let firstJokeLoaded = false;
let isJokeSaved = false;
let allSavedJokes = [];

displayLoadedJokes();

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".buttons__saveBtn")
    .addEventListener("click", saveJoke);
  document
    .querySelector(".buttons__newBtn")
    .addEventListener("click", loadNewJoke);
});

async function loadNewJoke() {
  console.log("clicked");
  let joke = await fetchData();
  displayNewJoke(joke);
  isJokeSaved = false;
  displaySaveJokeButton();
}

function displayNewJoke(nextJoke) {
  let previousJoke = document.querySelector(".jokeBox__joke");
  previousJoke.innerHTML = nextJoke;
}

function displaySaveJokeButton() {
  if (firstJokeLoaded) {
    return;
  }
  firstJokeLoaded = true;
  let saveButton = document.querySelector(".buttons__saveBtn");
  saveButton.style.display = "block";
}

function saveJoke() {
  if (isJokeSaved) {
    alert("joke is saved already");
    return;
  }
  isJokeSaved = true;
  let jokeWantToSave = document.querySelector(".jokeBox__joke").innerHTML;
  let jokeID = generateNumericId();
  let joke = {
    text: jokeWantToSave,
    id: jokeID,
  };
  console.log(joke);
  addJokeToList(joke);
  createSavedJokeUI(joke);
}

function generateNumericId() {
  return Math.floor(Math.random() * 1e9);
}

function addJokeToList(joke) {
  console.log(`joke ${joke.text}`);
  let testarry = [];
  testarry.push(joke);
  // allSavedJokes.push(joke);
  let formatedJokes = JSON.stringify(allSavedJokes);
  localStorage.setItem("jokes", formatedJokes);
}

function loadJokes() {
  const loadedJokes = JSON.parse(localStorage.getItem("jokes"));
  allSavedJokes = loadedJokes;
  return allSavedJokes;
}

function displayLoadedJokes() {
  let allJokes = loadJokes();
  if (allJokes === null) {
    return;
  }
  for (let i = 0; i < allJokes.length; i++) {
    createSavedJokeUI(allJokes[i]);
  }
}

function createSavedJokeUI(joke) {
  const savedJokeBox = document.createElement("div");
  savedJokeBox.classList.add("savedJokeBox");
  const savedJokeBox__joke = document.createElement("span");
  savedJokeBox__joke.classList.add("savedJokeBox__joke");
  savedJokeBox__joke.classList.add("text");
  const jokeText = document.createTextNode(joke.text);
  savedJokeBox.appendChild(savedJokeBox__joke);
  savedJokeBox__joke.appendChild(jokeText);

  document.querySelector(".savedJokes").appendChild(savedJokeBox);
}
