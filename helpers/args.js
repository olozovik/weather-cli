export const getArgs = (args) => {
  const [, , ...rest] = args;
  return rest.reduce((acc, item, idx, arr) => {
    if (item.charAt(0) !== "-") {
      return acc;
    }
    if (arr[idx + 1] && arr[idx + 1].charAt(0) !== "-") {
      return {
        ...acc,
        [item.substring(1)]: arr[idx + 1],
      };
    } else {
      return {
        ...acc,
        [item.substring(1)]: true,
      };
    }
  }, {});
};
