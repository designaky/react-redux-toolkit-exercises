import express from "express";
import * as http from "http";
import cors from "cors";
import debug from "debug";
import logger from "./middleware/logger";
import { BaseController } from "./controllers/base.controller";
import { NumberConvertController } from "./controllers/number-convert.controller";
import { errorController } from "./controllers/404";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 5000;
const routes: Array<BaseController> = [];
const debugLog: debug.IDebugger = debug("app");

// middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

// routes
routes.push(new NumberConvertController(app));
routes.push(new errorController(app));

server.listen(port, () => {
  routes.forEach((route: BaseController) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
