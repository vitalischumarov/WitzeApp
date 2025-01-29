export function saveListToLocalStorage(list) {
  let formatedJokes = JSON.stringify(list);
  localStorage.setItem("jokes", formatedJokes);
}
