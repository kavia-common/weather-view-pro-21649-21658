# WeatherView Pro – Frontend

Next.js app implementing the "Ocean Professional" themed UI for searching, saving, and viewing weather information.

## Features
- Search locations and view current conditions + forecast
- Save/remove locations and quickly switch between them
- Clean, modern UI with blue and amber accents, subtle gradients, rounded corners, and shadows
- REST calls to backend:
  - `GET /api/weather?location=<q>&days=<n>`
  - `GET /api/locations`
  - `POST /api/locations` (JSON body: `{ name, coordinates? }`)
  - `DELETE /api/locations/:id`
  - `GET /api/users/me`

## Development
- Install dependencies: `npm i`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

No external environment variables are required for the frontend.

## Notes for Backend Integration
- The UI expects the listed endpoints to be available from the same origin.
- Weather data response shape (example):
  ```json
  {
    "current": {
      "location": "London",
      "description": "Partly cloudy",
      "tempC": 18.3,
      "feelsLikeC": 17.0,
      "humidity": 62,
      "windKph": 14,
      "windDir": "WSW",
      "sunrise": "06:12",
      "sunset": "19:42",
      "updatedAt": "2024-08-01T12:00:00Z"
    },
    "hourly": [
      { "time": "2024-08-01T12:00:00Z", "tempC": 18.3 },
      { "time": "2024-08-01T13:00:00Z", "tempC": 19.1 }
    ]
  }
  ```
Adjust server output accordingly if needed.

## Layout
- Header with search and actions
- Sidebar for saved locations
- Main content with current conditions and forecast chart
- Footer with app info

