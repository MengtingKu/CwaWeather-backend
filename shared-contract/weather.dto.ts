export interface WeatherRequestDto {
  latitude: number;
  longitude: number;
}

export interface WeatherResponseDto {
  success: boolean;
  data: {
    city: string;
    updateTime: string;
    forecasts: ForecastDto[];
  };
}

export interface ForecastDto {
  startTime: string;
  endTime: string;
  weather: string;
  rain: string;
  minTemp: string;
  maxTemp: string;
  comfort: string;
  windSpeed: string;
}
