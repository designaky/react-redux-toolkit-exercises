import * as winston from "winston";
import * as expressWinston from "express-winston";

export const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
  meta: false, // change to true during debug
  expressFormat: true,
};

export default expressWinston.logger(loggerOptions);
