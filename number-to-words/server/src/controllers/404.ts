import express from "express";
import { BaseController } from "./base.controller";

export class errorController extends BaseController {
  constructor(app: express.Application) {
    super(app, "404");
  }
  configureRoutes() {
    this.app.route(`*`).get((req, res) => {
      res.status(404).json({ message: "Path not found" });
    });

    return this.app;
  }
}
