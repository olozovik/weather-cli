import axios from 'axios';
// import https from 'https';
import { DATA_DICT, getKeyValue } from './storage.service.js';

export const getWeather = async city => {
  const token = process.env.TOKEN ?? (await getKeyValue(DATA_DICT.token));

  if (!token) {
    throw new Error(
      'Token is not set. To set token enter -t [API_KEY] as arguments',
    );
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'en',
        units: 'metric',
      },
    },
  );

  return data;

  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('q', city);
  // url.searchParams.append('appid', token);
  // url.searchParams.append('lang', 'en');
  // url.searchParams.append('units', 'metric');

  // https.get(url, response => {
  //   let result = '';

  //   response.on('data', chunk => {
  //     result += chunk;
  //   });

  //   response.on('end', () => {
  //     console.log(result);
  //   });
  // });
};

export const getIcon = icon => {
  switch (icon.slice(0, -1)) {
    case '01':
      return 'âī¸';
    case '02':
      return 'đ¤ī¸';
    case '03':
      return 'âī¸';
    case '04':
      return 'âī¸';
    case '09':
      return 'đ§ī¸';
    case '10':
      return 'đĻī¸';
    case '11':
      return 'đŠī¸';
    case '13':
      return 'âī¸';
    case '50':
      return 'đĢī¸';
  }
};
