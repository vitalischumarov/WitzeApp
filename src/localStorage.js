export function saveListToLocalStorage(list) {
  let formatedJokes = JSON.stringify(list);
  localStorage.setItem("jokes", formatedJokes);
}

export function loadJokes() {
  console.log("loaded Jokes");
  const loadedJokes = JSON.parse(localStorage.getItem("jokes"));
  allSavedJokes = loadedJokes;
  return allSavedJokes;
}
