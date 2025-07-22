import {
  Input,
  Icon,
  Flex,
  IconButton,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { TiWeatherSunny } from "react-icons/ti";
import DashboardLayout from '../components/layouts/DashboardLayout'

export default function Dashboard() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [history, setHistory] = useState([])

  const handleSearch = async () => {
    if (!city.trim()) return

    // Mocked API result — will replace with real API later
    const fakeWeather = {
      city: city,
      temp: 28,
      condition: 'Sunny',
      wind: 10,
      humidity: 45,
    }

    setWeather(fakeWeather)
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)]
      return updated.slice(0, 5)
    })

    setCity('')
  }

  return (
    <DashboardLayout>
      <VStack spacing={6} align="stretch">
        {/* Search Input */}
          <Flex w="100%" maxW="md">
            <Input
                borderRightRadius="0"
                borderLeftRadius={10}
                placeholder="Enter city name"
                value={city}
                bg={useColorModeValue('white', 'orange.100')}
                border={'1px solid #ff9040'}
                onChange={(e) => setCity(e.target.value)}
            />
            <IconButton
                borderLeftRadius="0"
                icon={<Icon as={TiWeatherSunny} />}
                bg={'#ff9040'}
                onClick={handleSearch}
                aria-label="Search city"
            />
            </Flex>

        {/* Weather Display */}
        {weather && (
          <Box
            bg={useColorModeValue('whiteAlpha.900', 'orange.100')}
            rounded="lg"
            shadow="md"
            p={6}
          >
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {weather.city}
            </Text>
            <Text>🌡️ Temperature: {weather.temp}°C</Text>
            <Text>🌥️ Condition: {weather.condition}</Text>
            <Text>💨 Wind: {weather.wind} km/h</Text>
            <Text>💧 Humidity: {weather.humidity}%</Text>
            <Text mt={3} fontWeight="medium">
              {getOutfitSuggestion(weather)}
            </Text>
          </Box>
        )}

        {/* Search History */}
        {/* {history.length > 0 && (
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Recent Searches
            </Text>
            <VStack align="start" spacing={1}>
              {history.map((item, index) => (
                <Text key={index} fontSize="sm">
                  • {item}
                </Text>
              ))}
            </VStack>
          </Box>
        )} */}
      </VStack>
    </DashboardLayout>
  )
}

function getOutfitSuggestion(weather) {
  const condition = weather.condition.toLowerCase()
  const temp = weather.temp

  if (condition.includes('rain')) return '🌧️ Take an umbrella!'
  if (temp <= 10) return '🧥 Wear a warm jacket.'
  if (temp >= 30) return '😎 Sunglasses suggested!'
  return '👕 Comfortable clothing should be fine.'
}
