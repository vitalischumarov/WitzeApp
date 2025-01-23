import { fetchData } from "./api";

const url = "https://witzapi.de/api/joke/?limit=1&language=de";
let newJoke = "";

async function loadNewJoke() {
  console.log("klick");
  let data = await fetchData(url);
  console.log(data);
  displayNewJoke(data);
}

function displayNewJoke(newJoke) {
  let joke = document.querySelector(".jokeBox__joke");
  joke.innerHTML = newJoke;
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".buttons__newBtn")
    .addEventListener("click", loadNewJoke);
});
