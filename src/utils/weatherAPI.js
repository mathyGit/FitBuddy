export async function getCoords(cityName, apiKey) {
    console.log("Feching coordinates data...");
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch coordinates');
  const data = await res.json();
  if (!data.length) throw new Error('City not found');
  return { lat: data[0].lat, lon: data[0].lon };
}

export async function fetchWeather(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/forecast` +
    `?lat=${lat}&lon=${lon}` +
    `&exclude=minutely,alerts` +
    `&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch error');
  const data = await res.json();
  return data;
}
