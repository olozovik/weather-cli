import { homedir } from 'os';
import { join } from 'path';
import fs from 'fs/promises';

export const DATA_DICT = {
  token: 'token',
  city: 'city',
};

const filePath = join(homedir(), 'weather-data.json');

const isExist = async path => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const getDataFromFile = async path => {
  const file = await fs.readFile(path);
  return JSON.parse(file);
};

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    data = await getDataFromFile(filePath);
  }

  data[key] = value;
  await fs.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async key => {
  if (await isExist(filePath)) {
    const data = await getDataFromFile(filePath);
    return data[key];
  }
  return undefined;
};
