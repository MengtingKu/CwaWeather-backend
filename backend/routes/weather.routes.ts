import { Router } from 'express';
import { getWeatherByCoords, getTaichungWeather } from '../controllers/weather.controller';

const router = Router();

/**
 * @route GET /api/weather
 * @desc 根據經緯度取得天氣預報
 */
router.get('/', getWeatherByCoords);

/**
 * @route GET /api/weather/taichung
 * @desc 取得臺中市天氣預報 (相容舊版)
 */
router.get('/taichung', getTaichungWeather);

export default router;
