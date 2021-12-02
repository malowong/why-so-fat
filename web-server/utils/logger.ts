import winston from "winston";

const logFormat = winston.format.printf(function (info) {
  let date = new Date().toISOString();
  return `${date}[${info.level}]: ${info.message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(logFormat),
  transports: [new winston.transports.Console()],
});
