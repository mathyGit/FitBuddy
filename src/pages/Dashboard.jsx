import {
  Input,
  Icon,
  Flex,
  IconButton,
  Box,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { TiWeatherSunny } from 'react-icons/ti'
import DashboardLayout from '../components/layouts/DashboardLayout'
import { getCoords, fetchWeather } from '../utils/weatherAPI'
import { toaster } from '@/components/ui/toaster'
import { parseForecastData } from '@/utils/parseForecast'
import { ForecastList } from '@/components/ForecastList'

export default function Dashboard() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([])
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const API_KEY = "4b2f10809278e611fada6ff1bdd1129a";

  const handleSearch = async () => {
    if (!city.trim()) return
    setIsLoading(true);

    try {
      //This is not available for free plan
      // console.log("Getting coordinates...");
      // const { lat, lon } = await getCoords(city, API_KEY);
      // console.log(`Coordinates: lat=${lat}, lon=${lon}`);

      console.log("Getting weather data...");
      //latitude and longitude values for Chennai
      const weatherData = await fetchWeather(13.08, 80.27, API_KEY);
      console.log("Weather data:", weatherData);
      const forecast = parseForecastData(weatherData);
      console.log(forecast);
      setWeather(forecast);

     

      setHistory(prev =>
        [city, ...prev.filter(c => c !== city)].slice(0, 5)
      )

      setCity('')
    } catch (err) {
      toaster.create({
          description: "File saved successfully",
          type: "info",
          closable: true,
        })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <VStack spacing={6} align="stretch">
        <Flex w="100%" maxW="md">
          <Input
            borderRightRadius="0"
            borderLeftRadius="10px"
            placeholder="Enter city name"
            value={city}
            bg={useColorModeValue('white', 'orange.100')}
            border="1px solid #ff9040"
            onChange={e => setCity(e.target.value)}
          />
          <IconButton
            borderLeftRadius="0"
            bg="#ff9040"
            color="white"
            _hover={{ bg: '#e27b30' }}
            onClick={handleSearch}
            aria-label="Search city"
          ><TiWeatherSunny/></IconButton>
        </Flex>

        {isLoading && (
          <Flex justify="center">
            <Spinner size="lg" color="orange.400" />
          </Flex>
        )}

  {/* displaying the forecast cards */}
        {weather && !isLoading && (
          <ForecastList forecastData={weather} />
        )}

        {history.length > 0 && (
          <Box>
            <Text fontWeight="semibold" mb={2} color={useColorModeValue('grey.800','white')}>
              Recent Searches
            </Text>
            <VStack align="start" spacing={1}>
              {history.map((item, i) => (
                <Text key={i} fontSize="sm" color={useColorModeValue('grey.800','white')}>
                  • {item}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </DashboardLayout>
  )
}
