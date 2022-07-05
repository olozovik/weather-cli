#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, DATA_DICT } from './services/storage.service.js';

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

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.t) {
    return saveToken(args.t);
  }
  getWeather('Zhytomyr');
};

initCLI();
