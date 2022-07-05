import https from 'https';
import { DATA_DICT, getKeyValue } from './storage.service.js';

export const getWeather = async city => {
  const token = await getKeyValue(DATA_DICT.token);

  if (!token) {
    throw new Error(
      'Token is not set. To set token enter -t [API_KEY] as arguments',
    );
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', 'en');
  url.searchParams.append('units', 'metric');

  https.get(url, response => {
    let result = '';

    response.on('data', chunk => {
      result += chunk;
    });

    response.on('end', () => {
      console.log(result);
    });
  });
};
