export const fetchWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      return rawData;
    });
};
