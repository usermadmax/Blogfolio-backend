const mongoose=require('mongoose')
const app=require('./app')
const config=require('./utils/config')
const logger=require('./utils/loggers')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');

    const PORT = config.PORT;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });
