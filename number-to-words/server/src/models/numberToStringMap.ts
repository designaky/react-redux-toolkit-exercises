export const alphabetical: alphabeticalMap = {
  "1": ["1"],
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
  "0": [" "],
};

export const alphaNumeric: alphabeticalMap = {
  "1": ["1"],
  "2": ["2", "a", "b", "c"],
  "3": ["3", "d", "e", "f"],
  "4": ["4", "g", "h", "i"],
  "5": ["5", "j", "k", "l"],
  "6": ["6", "m", "n", "o"],
  "7": ["7", "p", "q", "r", "s"],
  "8": ["8", "t", "u", "v"],
  "9": ["9", "w", "x", "y", "z"],
  "0": ["0", " "],
};

interface alphabeticalMap {
  [key: string]: string[];
}
