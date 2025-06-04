const winston = require('winston');
const config = require('../config/config');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Define different colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Determine level based on environment
const level = config.env === 'development' ? 'debug' : 'http';

// Define the format of the log message
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

// Define which transports to use
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/combined.log' })
];

// Create the logger
const logger = winston.createLogger({
  level,
  levels,
  format,
  transports
});

module.exports = logger;