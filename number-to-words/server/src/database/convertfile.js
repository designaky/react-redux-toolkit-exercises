const data = require("./words_dictionary.json");
const map = require("./map.json");
const fs = require("fs");

const file = {};

const convertTonumber = (word) => {
  const result = word.split("").reduce((acc, letter) => {
    acc = acc + map[letter.toLowerCase()];
    return acc;
  }, "");
  return result;
};

for (const property in data) {
  if (file[convertTonumber(property)]) {
    file[convertTonumber(property)] = [
      ...file[convertTonumber(property)],
      property,
    ];
  } else {
    file[convertTonumber(property)] = [property];
  }
}

fs.writeFile("completeDictionary.json", JSON.stringify(file), (err) => {
  if (err) return console.log(err);
  console.log("done");
});
