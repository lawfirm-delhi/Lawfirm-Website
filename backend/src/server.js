const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { db } = require('./config/database');

const startServer = async () => {
  try {
    logger.info('Running database migrations...');
    await db.migrate.latest();
    logger.info('Database migrations complete.');

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
