export function parseForecastData(rawData) {
  const dailyMap = {};

  rawData.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0]; // e.g., "2025-07-23"
    const time = new Date(entry.dt * 1000).getHours(); // e.g., 15 for 3PM

    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        temps: [],
        feelsLike: [],
        weatherCounts: {},
        icons: {},
        maxTemp: -Infinity,
        minTemp: Infinity,
      };
    }

    const { temp, feels_like } = entry.main;
    const weather = entry.weather[0].main;
    const icon = entry.weather[0].icon;

    dailyMap[date].temps.push(temp);
    dailyMap[date].feelsLike.push(feels_like);
    dailyMap[date].weatherCounts[weather] = (dailyMap[date].weatherCounts[weather] || 0) + 1;
    dailyMap[date].icons[icon] = (dailyMap[date].icons[icon] || 0) + 1;
    dailyMap[date].maxTemp = Math.max(dailyMap[date].maxTemp, temp);
    dailyMap[date].minTemp = Math.min(dailyMap[date].minTemp, temp);
  });

  const result = Object.values(dailyMap).map((day) => {
    const mostCommonWeather = Object.entries(day.weatherCounts).sort((a, b) => b[1] - a[1])[0][0];
    const mostCommonIcon = Object.entries(day.icons).sort((a, b) => b[1] - a[1])[0][0];
    const dateObj = new Date(day.date);

    return {
      date: day.date,
      day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      temp: {
        min: Math.round(day.minTemp),
        max: Math.round(day.maxTemp),
      },
      weather: mostCommonWeather,
      icon: mostCommonIcon,
      feels_like: Math.round(
        day.feelsLike.reduce((sum, val) => sum + val, 0) / day.feelsLike.length
      ),
    };
  });

  return result;
}