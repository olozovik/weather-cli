#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  DATA_DICT,
  getKeyValue,
} from './services/storage.service.js';

const saveToken = async token => {
  if (!token.length) {
    printError('Token is not passed');
    return;
  }

  try {
    await saveKeyValue(DATA_DICT.token, token);
    printSuccess('Token is saved');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async city => {
  if (!city.length) {
    printError('City name is not passed');
    return;
  }

  try {
    await saveKeyValue(DATA_DICT.city, city);
    printSuccess('City name is saved');
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const data = await getWeather(
      process.env.CITY ?? (await getKeyValue(DATA_DICT.city)),
    );
    const icon = getIcon(data.weather[0]?.icon);
    printWeather(data, icon);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Enter correct city name');
    } else if (e?.response?.status === 401) {
      printError('Enter correct token');
    } else {
      printError(e?.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.c) {
    return await saveCity(args.c);
  }

  if (args.t) {
    return await saveToken(args.t);
  }

  getForecast();
};

initCLI();
