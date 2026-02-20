import { describe, it, expect } from 'vitest';
import { getCityFromCoords } from './geo.service';

describe('GeoService', () => {
  it('should return 臺北市 for coordinates (25.0330, 121.5654)', () => {
    const city = getCityFromCoords(25.0330, 121.5654);
    expect(city).toBe('臺北市');
  });

  it('should return 高雄市 for coordinates (22.6273, 120.3014)', () => {
    const city = getCityFromCoords(22.6273, 120.3014);
    expect(city).toBe('高雄市');
  });

  it('should return 臺中市 for coordinates (24.1477, 120.6736)', () => {
    const city = getCityFromCoords(24.1477, 120.6736);
    expect(city).toBe('臺中市');
  });

  it('should return 金門縣 for coordinates (24.43, 118.33)', () => {
    const city = getCityFromCoords(24.43, 118.33);
    expect(city).toBe('金門縣');
  });

  it('should return 連江縣 for coordinates (26.15, 119.95)', () => {
    const city = getCityFromCoords(26.15, 119.95);
    expect(city).toBe('連江縣');
  });

  it('should throw error for coordinates far outside Taiwan', () => {
    expect(() => getCityFromCoords(0, 0)).toThrow('座標超出台灣範圍');
  });
});
