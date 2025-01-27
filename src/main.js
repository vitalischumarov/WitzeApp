import { fetchData } from "./api";

let firstJokeLoaded = false;
let isJokeSaved = false;
let allSavedJokes = [];

displayLoadedJokes();

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
  allSavedJokes.push(joke);
  let formatedJokes = JSON.stringify(allSavedJokes);
  localStorage.setItem("jokes", formatedJokes);
}

function loadJokes() {
  console.log("loaded Jokes");
  const loadedJokes = JSON.parse(localStorage.getItem("jokes"));
  allSavedJokes = loadedJokes;
  return allSavedJokes;
}

function displayLoadedJokes() {
  let allJokes = loadJokes();
  if (allJokes === null) {
    allSavedJokes = [];
    return;
  }
  for (let i = 0; i < allJokes.length; i++) {
    createSavedJokeUI(allJokes[i]);
  }
}

function createSavedJokeUI(joke) {
  let id = generateNumericId();
  let html = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="symbol"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
        />
    </svg>`;
  const savedJokeBox = document.createElement("div");
  savedJokeBox.classList.add("savedJokeBox");
  savedJokeBox.setAttribute("id", id);
  const savedJokeBox__joke = document.createElement("span");
  savedJokeBox__joke.classList.add("savedJokeBox__joke");
  savedJokeBox__joke.classList.add("text");
  const jokeText = document.createTextNode(joke.text);
  savedJokeBox.appendChild(savedJokeBox__joke);
  savedJokeBox__joke.appendChild(jokeText);
  const button = document.createElement("button");
  button.classList.add("savedJokeBox__deleteJoke");
  button.innerHTML = html;

  document.querySelector(".savedJokes").appendChild(savedJokeBox);
  document.getElementById(id).appendChild(button);
}

function deleteJoke(id) {
  console.log(`diese id wurde ausgewählt: ${id}`);
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".buttons__saveBtn")
    .addEventListener("click", saveJoke);
  document
    .querySelector(".buttons__newBtn")
    .addEventListener("click", loadNewJoke);
  document
    .querySelector(".savedJokeBox__deleteJoke")
    .addEventListener("click", deleteJoke);
});
