import { alphabetical } from "../models/numberToStringMap";
import completeDictionary from "../database/completeDictionary.json";
export class NumberConvertService  {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public convert(number: string): string[] {
    const filterNumbers = number.split("").filter((item) => parseInt(item));
    const filterConvert = this.filterCovert(filterNumbers.join(""));
    if (filterConvert) return filterConvert;
    if (filterNumbers.length > 13) return [];
    const charArray = filterNumbers.reduce((acc: string[][], number) => {
      acc = [...acc, alphabetical[number]];
      return acc;
    }, []);
    return this.getCombinations(charArray);
  }

  private filterCovert(number: string): string[] | undefined {
    const typeCompleteDictionary = completeDictionary as {
      [key: string]: string[];
    };
    return typeCompleteDictionary[number];
  }

  public getCombinations(array: string[][]): string[] {
    if (array.length === 0) return [];
    return array.reduce((acc, current) => {
      let result: string[] = [];
      acc.map((word) => {
        current.map((char) => {
          result.push(word + char);
        });
      });
      return result;
    });
  }
  
  public getName() {
    return this.name;
  }
}

export default new NumberConvertService("numberConvertService");
