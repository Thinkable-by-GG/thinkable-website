import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
};

start();
