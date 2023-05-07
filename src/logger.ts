import * as winston from 'winston';

// Create logger
export const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  format: winston.format.json({
    space: 4,
  }),
  transports: [
    new winston.transports.File({
      filename: 'logs/all.log',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

// add Console loggin in non production enviroment
if (process.env.NODE_ENV != 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
