export async function fetchChisteChuckNorris() {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await response.json();

  return data;
}

export async function fetchChisteDad() {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json", // Solo quiero el JSON
    },
  });
  const data = await response.json();

  return data;
}
