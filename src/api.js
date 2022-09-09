export const fetchWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const {
        name: city,
        sys: { country: country_code },
        main: {
          feels_like: feels_like,
          temp: temp,
          pressure: pressure,
          humidity: humidity,
        },
        weather: [{ description: description, icon: icon }],
        visibility: visibility,
        wind: { deg: degree, speed: speed },
      } = rawData;

      return {
        city,
        country_code,
        temp,
        pressure,
        humidity,
        visibility,
        feels_like,
        description,
        icon,
        degree,
        speed,
      };
    });
};
