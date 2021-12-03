import express from "express";
import request from "supertest";
import { NumberConvertController } from "./number-convert.controller";
import NumberConvertService from "../services/number-convert-service";

describe("NumberConvertController", () => {
  const app: express.Application = express();
  new NumberConvertController(app);
  let numberConvertService: jest.SpyInstance<string[], [number: string]>;
  const mockConvert = ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"];
  beforeEach(() => {
    numberConvertService = jest
      .spyOn(NumberConvertService, "convert")
      .mockImplementation(() => mockConvert);
  });

  afterEach(() => {
    numberConvertService.mockReset();
  });
  describe("/convert/:number ", () => {
    it("It should return the right status code", async () => {
      const res = await request(app).get("/convert/22");
      expect(res.statusCode).toEqual(200);
    });
    it("It should return the right values ", async () => {
      const res = await request(app).get("/convert/22");
      const { message } = res.body;
      expect(message).toEqual(mockConvert);
    });

    it("It should call the right service with the correct values", async () => {
      const res = await request(app).get("/convert/22");
      expect(numberConvertService).toHaveBeenCalled();
      expect(numberConvertService).toHaveBeenCalledWith("22");
    });
  });
});
