import axios from 'axios';
import { WeatherResponseDto, ForecastDto } from '../../shared-contract/weather.dto';

const CWA_API_BASE_URL = "https://opendata.cwa.gov.tw/api";
const CWA_API_KEY = process.env.CWA_API_KEY;

/**
 * 取得指定縣市的天氣預報
 * @param cityName 縣市名稱 (例: 臺北市)
 */
export const fetchWeatherByCity = async (cityName: string): Promise<WeatherResponseDto> => {
  if (!CWA_API_KEY) {
    throw new Error("伺服器設定錯誤: 請設定 CWA_API_KEY");
  }

  try {
    const response = await axios.get(
      `${CWA_API_BASE_URL}/v1/rest/datastore/F-C0032-001`,
      {
        params: {
          Authorization: CWA_API_KEY,
          locationName: cityName,
        },
      }
    );

    const locationData = response.data.records.location[0];
    if (!locationData) {
      throw new Error(`查無此縣市資料: ${cityName}`);
    }

    const weatherElements = locationData.weatherElement;
    const timeCount = weatherElements[0].time.length;
    const forecasts: ForecastDto[] = [];

    for (let i = 0; i < timeCount; i++) {
      const forecast: ForecastDto = {
        startTime: weatherElements[0].time[i].startTime,
        endTime: weatherElements[0].time[i].endTime,
        weather: "",
        rain: "",
        minTemp: "",
        maxTemp: "",
        comfort: "",
        windSpeed: "",
      };

      weatherElements.forEach((element: any) => {
        const value = element.time[i].parameter;
        switch (element.elementName) {
          case "Wx":
            forecast.weather = value.parameterName;
            break;
          case "PoP":
            forecast.rain = value.parameterName + "%";
            break;
          case "MinT":
            forecast.minTemp = value.parameterName + "°C";
            break;
          case "MaxT":
            forecast.maxTemp = value.parameterName + "°C";
            break;
          case "CI":
            forecast.comfort = value.parameterName;
            break;
        }
      });

      forecasts.push(forecast);
    }

    return {
      success: true,
      data: {
        city: locationData.locationName,
        updateTime: response.data.records.datasetDescription,
        forecasts,
      },
    };
  } catch (error: any) {
    console.error("CWA API 呼叫失敗:", error.message);
    throw error;
  }
};
