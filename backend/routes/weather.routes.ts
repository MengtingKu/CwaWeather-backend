import { Router } from 'express';
import { getWeatherByCoords, getKaohsiungWeather } from '../controllers/weather.controller';

const router = Router();

/**
 * @route GET /api/weather
 * @desc 根據經緯度取得天氣預報
 */
router.get('/', getWeatherByCoords);

/**
 * @route GET /api/weather/kaohsiung
 * @desc 取得高雄天氣預報 (相容舊版)
 */
router.get('/kaohsiung', getKaohsiungWeather);

export default router;
