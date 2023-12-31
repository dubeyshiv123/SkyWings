const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp, error }) => {
  return `${timestamp} : ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console(), //It will print all the logs on the console
    new transports.File({ filename: "combined.log" }), // It will store all the logs in a file named `AllLogs.log`
  ],
});

module.exports = logger;
