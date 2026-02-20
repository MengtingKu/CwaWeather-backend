/**
 * 台灣縣市邊界資料 (簡化版，實際生產環境建議使用完整的 GeoJSON)
 */
const TAIWAN_CITIES = [
  { name: '宜蘭縣', latRange: [24.31, 25.00], lngRange: [121.31, 122.01] },
  { name: '花蓮縣', latRange: [23.09, 24.37], lngRange: [121.05, 121.75] },
  { name: '臺東縣', latRange: [22.10, 23.43], lngRange: [120.72, 121.50] },
  { name: '澎湖縣', latRange: [23.11, 23.77], lngRange: [119.30, 119.75] },
  { name: '金門縣', latRange: [24.38, 24.54], lngRange: [118.21, 118.50] },
  { name: '連江縣', latRange: [25.92, 26.39], lngRange: [119.88, 120.50] },
  { name: '臺北市', latRange: [24.96, 25.21], lngRange: [121.45, 121.67] },
  { name: '新北市', latRange: [24.67, 25.30], lngRange: [121.28, 122.01] },
  { name: '桃園市', latRange: [24.58, 25.12], lngRange: [121.01, 121.49] },
  { name: '臺中市', latRange: [24.01, 24.44], lngRange: [120.44, 121.42] },
  { name: '臺南市', latRange: [22.88, 23.42], lngRange: [120.03, 120.65] },
  { name: '高雄市', latRange: [22.46, 23.47], lngRange: [120.17, 120.94] },
  { name: '基隆市', latRange: [25.06, 25.17], lngRange: [121.62, 121.81] },
  { name: '新竹縣', latRange: [24.34, 24.99], lngRange: [120.94, 121.48] },
  { name: '新竹市', latRange: [24.71, 24.85], lngRange: [120.88, 121.02] },
  { name: '苗栗縣', latRange: [24.27, 24.74], lngRange: [120.65, 121.13] },
  { name: '彰化縣', latRange: [23.82, 24.20], lngRange: [120.30, 120.65] },
  { name: '南投縣', latRange: [23.43, 24.27], lngRange: [120.63, 121.36] },
  { name: '雲林縣', latRange: [23.50, 23.88], lngRange: [120.12, 120.73] },
  { name: '嘉義縣', latRange: [23.23, 23.63], lngRange: [120.10, 120.73] },
  { name: '嘉義市', latRange: [23.44, 23.51], lngRange: [120.40, 120.49] },
  { name: '屏東縣', latRange: [21.89, 23.00], lngRange: [120.33, 120.90] },
];

/**
 * 根據經緯度判斷縣市
 * @param latitude 緯度
 * @param longitude 經度
 * @returns 縣市名稱
 */
export const getCityFromCoords = (latitude: number, longitude: number): string => {
  // 基礎台灣中心範圍檢查 (包含金門、馬祖、澎湖)
  if (latitude < 21.5 || latitude > 26.5 || longitude < 118.0 || longitude > 122.5) {
    throw new Error('座標超出台灣範圍');
  }

  // 尋找匹配的縣市 (此處使用簡化的矩形判斷，實際應用中應使用 Point-in-Polygon)
  const city = TAIWAN_CITIES.find(c => 
    latitude >= c.latRange[0] && latitude <= c.latRange[1] &&
    longitude >= c.lngRange[0] && longitude <= c.lngRange[1]
  );

  return city ? city.name : '臺北市'; // 預設或 fallback
};
