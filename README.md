# CWA 天氣預報 API 服務 (TypeScript 版)

[![Antigravity](https://img.shields.io/badge/Agent-Antigravity-blueviolet)](https://github.com/google-deepmind/antigravity)

> 最後更新日期：2026-02-21

這是一個符合 **Antigravity 工程規範** 的 Node.js + Express + TypeScript API 服務。專案具備標準化工作流、嚴格型別檢查與現代化前端樣式。

## 🌟 功能特色

- **TypeScript 嚴格型別**: 全面使用 TypeScript 開發，確保程式碼健壯性。
- **座標自動轉縣市**: 前端傳送經緯度，後端自動判斷台灣 22 縣市。
- **預設智慧值**: 若請求未帶座標，系統智慧預設提供「臺中市」天氣。
- **Zod 參數驗證**: 強大的 Schema 驗證，確保 API 請求參數合法性。
- **單元測試 (Vitest)**: 包含地理座標處理邏輯的測試案例，確保精準度。
- **生產等級錯誤處理**: 完善的錯誤捕捉機制與標準化 JSON 回應格式。

## 🛠 技術棧

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript (Strict Mode)
- **Validation**: Zod
- **API Client**: Axios
- **Testing**: Vitest
- **Environment**: Dotenv, Cors

## 🚀 快速開始

### 1. 安裝相依套件

```bash
npm install
```

### 2. 設定環境變數

在根目錄建立 `.env`：

```env
CWA_API_KEY=你的中央氣象署API授權碼
PORT=3000
NODE_ENV=development
```

### 3. 開發模式啟動

```bash
npm run dev
```

### 4. 執行測試

```bash
npm run test:run
```

## 📡 API 文件

### 取得座標天氣預報

根據經緯度取得對應縣市的 36 小時天氣預報。

- **URL**: `/api/weather`
- **Method**: `GET`
- **Query Params**:
  - `lat` (Optional): 緯度 (21.5 ~ 26.5)。預設值: 24.1477 (臺中市)
  - `lng` (Optional): 經度 (118.0 ~ 122.5)。預設值: 120.6736 (臺中市)

#### 成功回應實例

```json
{
  "success": true,
  "data": {
    "city": "臺北市",
    "updateTime": "三十六小時天氣預報",
    "forecasts": [
      {
        "startTime": "2026-02-21 00:00:00",
        "endTime": "2026-02-21 06:00:00",
        "weather": "晴時多雲",
        "rain": "0%",
        "minTemp": "18°C",
        "maxTemp": "22°C",
        "comfort": "舒適",
        "windSpeed": ""
      }
    ]
  }
}
```

## 📂 專案結構

```text
CwaWeather-backend/
├── backend/
│   ├── controllers/      # 請求處理邏輯 (Zod 驗證)
│   ├── services/         # 業務邏輯 (GeoService, WeatherService)
│   ├── routes/           # API 路由定義
│   ├── app.ts            # Express 應用配置
│   └── server.ts         # 伺服器啟動入口
├── shared-contract/      # 前後端共享 DTO 型別
├── tsconfig.json         # TypeScript 配置
└── package.json          # 腳本與相依套件
```

## ⚠️ 注意事項

1. 座標判斷採用矩形區域簡化算法，涵蓋台灣本島與金馬澎離島共 22 縣市。
2. 超出台灣地理範圍的座標將回傳 `400 Bad Request`。
3. 請確保 CWA API Key 有效且未達每日限額。

## 授權

MIT
