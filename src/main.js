import { fetchData } from "./api";

let newJoke = "";

async function loadNewJoke() {
  let joke = await fetchData();
  displayNewJoke(joke);
}

function displayNewJoke(nextJoke) {
  let joke = document.querySelector(".jokeBox__joke");
  joke.innerHTML = nextJoke;
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".buttons__newBtn")
    .addEventListener("click", loadNewJoke);
});
