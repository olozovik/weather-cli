import { homedir } from 'os';
import { join } from 'path';
import fs from 'fs/promises';

const filePath = join(homedir(), 'weather-data.json');

const isExist = async path => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.writeFile(filePath, JSON.stringify(data));
};
