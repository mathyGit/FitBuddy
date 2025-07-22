export function getOutfitData(weather, temp) {
  const { max } = temp;
  const condition = weather.toLowerCase();

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return "Raincoat, waterproof boots, umbrella";
  }

  if (max >= 32) {
    return "Tank top, shorts, sunglasses";
  }

  if (max >= 26) {
    return "T-shirt, jeans or shorts, cap";
  }

  if (max >= 18) {
    return "Long sleeves, light jacket";
  }

  if (max < 18) {
    return "Sweater, hoodie, or light coat";
  }

  return "Comfortable casual wear";
}
