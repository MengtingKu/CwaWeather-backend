import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "歡迎使用 CWA 天氣預報 API (TypeScript)",
    endpoints: {
      weather: "/api/weather",
      kaohsiung: "/api/weather/kaohsiung",
      health: "/api/health"
    }
  });
});

app.use('/api/weather', weatherRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "找不到此路徑" });
});

export default app;
