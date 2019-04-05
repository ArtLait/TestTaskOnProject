export default {
  checkForCapitalFirstLetter: '^[A-Z]|[А-Я](\\w+)',
  checkForMissingLetters: (letter: string) => {
    return `^((?!${letter}).)*$`;
  }
};
