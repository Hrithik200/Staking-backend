import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { format } from "date-fns";
import fs from "fs";
import path from "path";

// Generate daily folder inside "logs/"
const logDate = format(new Date(), "yyyy-MM-dd");
const logDir = path.join("logs", logDate);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join("logs", logDate, "error-%DATE%.log"), // Error logs inside date folder
      datePattern: "yyyy-MM-dd",
      level: "error",
      zippedArchive: false,
      maxFiles: "30d",
    }),

    new DailyRotateFile({
      filename: path.join("logs", logDate, "combined-%DATE%.log"), // Combined logs inside date folder
      datePattern: "yyyy-MM-dd",
      zippedArchive: false,
      maxFiles: "30d",
    }),
  ],
});

export default logger;
