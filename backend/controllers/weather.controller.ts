import { Request, Response } from 'express';
import { z } from 'zod';
import { getCityFromCoords } from '../services/geo.service';
import { fetchWeatherByCity } from '../services/weather.service';

/**
 * 驗證請求參數
 */
const WeatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional().default(24.1477),
  lng: z.coerce.number().min(-180).max(180).optional().default(120.6736),
});

/**
 * 通用天氣請求處理邏輯 (DRY)
 */
const handleWeatherRequest = async (cityName: string, res: Response) => {
  try {
    const weatherData = await fetchWeatherByCity(cityName);
    return res.json(weatherData);
  } catch (error: any) {
    console.error(`處理 [${cityName}] 天氣請求失敗:`, error.message);
    
    if (error.message.includes('查無此縣市資料')) {
      return res.status(404).json({
        error: "查無資料",
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "伺服器錯誤",
      message: `無法取得 ${cityName} 天氣資料`,
    });
  }
};

/**
 * 處理經緯度天氣請求
 */
export const getWeatherByCoords = async (req: Request, res: Response) => {
  try {
    // 1. 驗證輸入
    const validation = WeatherQuerySchema.safeParse(req.query);
    if (!validation.success) {
      return res.status(400).json({
        error: "參數錯誤",
        message: "請提供正確的經緯度 (lat, lng)",
        details: validation.error.format(),
      });
    }

    const { lat, lng } = validation.data;

    // 2. 座標轉縣市
    const cityName = getCityFromCoords(lat, lng);

    // 3. 呼叫服務並回傳
    return await handleWeatherRequest(cityName, res);

  } catch (error: any) {
    // 處理座標判斷本身的錯誤
    if (error.message.includes('座標超出台灣範圍')) {
      return res.status(400).json({
        error: "範圍錯誤",
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "伺服器錯誤",
      message: "無法處理您的請求，請稍後再試",
    });
  }
};

/**
 * 取得臺中市天氣預報 (相容舊版)
 */
export const getTaichungWeather = async (req: Request, res: Response) => {
  return await handleWeatherRequest("臺中市", res);
};
