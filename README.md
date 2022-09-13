# Weather Widget

## Demo

> https://sanchopanda.github.io/weather-widget/

## Setup for users

add this widget into your HTML-page:
```
<weather-widget />
<script defer="defer" src="https://sanchopanda.github.io/weather-widget/app.js"></script>
```

## Setup for developers

1. npm install

2. Create `.env` file in the root folder.

3. Add your openweather api key in `.env` file <br />
`VUE_APP_OPEN_WEATHER_API_KEY - [key]`

4. If you want deploy app in github-pages, add name of repository in `.env` <br />
`GH_PAGES_ROOT=/[name of repository]/`


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deploy

the dist folder will be deployed to the gh-pages branch
```
npm run deploy
```
