const URL = "https://witzapi.de/api/joke/?limit=1&language=de";

export async function fetchData() {
  let response = await fetch(URL);
  if (!response.status) {
    return;
  }
  let data = await response.json();
  return data[0].text;
}
