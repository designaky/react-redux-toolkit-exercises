import express from "express";
import { BaseController } from "./base.controller";
import NumberConvertService from "../services/number-convert-service";

export class NumberConvertController extends BaseController {
  constructor(app: express.Application) {
    super(app, "numberConvertController");
  }
  configureRoutes() {
    this.app.route(`/convert/:number`).get((req, res) => {
      return this.getConvert(req, res);
    });
    return this.app;
  }

  getConvert(req: express.Request, res: express.Response): void {
    const { number } = req.params;
    const message = NumberConvertService.convert(number);
    res.status(200).json({ message });
  }
}
