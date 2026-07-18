const API_KEY = "6dd33afa620ffc5f43c0cdba1d4c0489";

export async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  return response.json();
}