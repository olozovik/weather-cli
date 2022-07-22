import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = error => {
  console.log(chalk.bgRed(' ERROR ', error));
};

export const printSuccess = message => {
  console.log(chalk.bgGreen(' SUCCESS', message));
};

export const printHelp = () => {
  console.log(
    dedent`

    ${chalk.bgCyan(' HELP ')}
    Without parameters is to output the weather
      -c [CITY] is to set city
      -h is to output help
      -t [TOKEN] is to save token
      
  `,
  );
};

export const printWeather = async (data, icon) => {
  const {
    name,
    weather: [{ main }],
    main: { temp, feels_like, humidity },
    wind: { speed },
  } = data;

  console.log(
    dedent`

    ${chalk.bgGreen(' WEATHER ')} ${name.toUpperCase()}
       
    ${main} ${icon}
    Temperature: ${Math.round(temp)}° (feels like: ${Math.round(feels_like)}°)
    Humidity: ${humidity}%
    Wind: ${Math.round(speed)} m/s
    
  `,
  );
};
