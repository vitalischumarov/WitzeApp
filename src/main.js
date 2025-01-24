import { fetchData } from "./api";

let firstJokeLoaded = false;

async function loadNewJoke() {
  let joke = await fetchData();
  displayNewJoke(joke);
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
  console.log(firstJokeLoaded);
  firstJokeLoaded = true;
  console.log(firstJokeLoaded);
  let saveButton = document.querySelector(".buttons__saveBtn");
  console.log(saveButton);
  saveButton.style.display = "block";
  // saveButton.setAttribute('display','block')
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".buttons__newBtn")
    .addEventListener("click", loadNewJoke);
});
