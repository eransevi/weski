import express, { Request, Response } from 'express';
import http from 'http';
import { closeWebSocket, setupWebSocket } from './websocket';
import HotelsService from './services/hotelsService';

const app = express();
const PORT = process.env.PORT || 5000;

const hotelsService = new HotelsService();

app.use(express.json());

app.post('/api/v1/search/hotels', (req: Request, res: Response) => {
  const { query } = req.body;
  const { ski_site, from_date, to_date, group_size } = query;

  if (!ski_site || !from_date || !to_date || !group_size) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  hotelsService.fetchHotels(query, wss);
  return res.status(200).json({ message: 'Fetching hotels...' });
});

const server = http.createServer(app);
const wss = setupWebSocket(server);


// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  closeWebSocket();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
