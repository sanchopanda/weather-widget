import { ICity } from "./types/ICity";
import { IWeather } from "./types/IWeather";

const OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const AUTOCOMPLETE_API = "https://autocomplete.travelpayouts.com/places2";

export const fetchWeather = async (request: ICity): Promise<IWeather> => {
  const response = await fetch(
    `${OPEN_WEATHER_API}?q=${request.city},${request.country_code}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
  );
  const rawData = await response.json();

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
};

export const fetchCurrentCity = async () => {
  const pos: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return fetch(
    `${OPEN_WEATHER_API}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
  )
    .then((r) => r.json())
    .then(({ name: city, sys: { country: country_code }, id }) => ({
      city,
      country_code,
      id,
    }));
};

export const fetchAutocompleteCities = (value: string) => {
  return fetch(`${AUTOCOMPLETE_API}?locale=en&types[]=city&term=${value}`)
    .then((r) => r.json())
    .then((rawData) =>
      rawData.map(({ name: city, country_code, id }: ICity) => ({
        city,
        country_code,
        id,
      }))
    );
};
