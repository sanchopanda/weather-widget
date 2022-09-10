const OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const AUTOCOMPLETE_API = "https://autocomplete.travelpayouts.com/places2";

export const fetchWeather = (city) => {
  return fetch(
    `${OPEN_WEATHER_API}?q=${city}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
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

export const fetchCurrentCity = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return fetch(
    `${OPEN_WEATHER_API}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
  )
    .then((r) => r.json())
    .then(({ name: city }) => city);
};

export const fetchAutocompleteCities = (value) => {
  return fetch(`${AUTOCOMPLETE_API}?locale=en&types[]=city&term=${value}`)
    .then((r) => r.json())
    .then((rawData) => rawData.map(({ name: city }) => city));
};
