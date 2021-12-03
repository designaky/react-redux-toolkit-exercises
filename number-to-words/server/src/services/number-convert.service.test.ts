import NumberConvertService from "./number-convert-service";

describe("NumberConvertService", () => {
  describe("convert getName", () => {
    it("It should return the correct service name", () => {
      const result = NumberConvertService.getName();
      expect(result).toEqual("numberConvertService");
    });
  });
  describe("convert method", () => {
    it("It should return and array of string passing the correct numeric input as string", () => {
      const result = NumberConvertService.convert("22");
      expect(result).toEqual(["aa", "ab", "ac", "ba", "bb", "ca", "cb", "cc"]);
    });

    it("It should return and array of string passing the correct numeric input as string plus some alphabetical", () => {
      const result = NumberConvertService.convert("aa22dd");
      expect(result).toEqual(["aa", "ab", "ac", "ba", "bb", "ca", "cb", "cc"]);
    });

    it("It should return an empty array if the the input are only alphabetical char or an empty string", () => {
      let result = NumberConvertService.convert("lll");
      expect(result).toEqual([]);
      result = NumberConvertService.convert("");
      expect(result).toEqual([]);
    });
  });
});
