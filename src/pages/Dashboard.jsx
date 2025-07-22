import {
  Input,
  Flex,
  IconButton,
  Box,
  Text,
  VStack,
  Spinner,
  Heading,
  Alert,
  List,
  ListItem
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { TiWeatherSunny } from 'react-icons/ti'
import DashboardLayout from '../components/layouts/DashboardLayout'
import { fetchWeather } from '../utils/weatherAPI'
import { toaster } from '@/components/ui/toaster'
import { parseForecastData } from '@/utils/parseForecast'
import { ForecastList } from '@/components/ForecastList'
// import { useDebounce } from 'use-debounce'
// import { CityData } from '@/components/mock/cities'

export default function Dashboard() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([])
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [lastCity, setLastCity] = useState('')
  const [manualLat, setManualLat] = useState('')
  const [manualLon, setManualLon] = useState('')


  // const [debouncedCity] = useDebounce(city, 200)
  // const [suggestions, setSuggestions] = useState([]);
  // const [selectedCity, setSelectedCity] = useState(null);
  const API_KEY = "4b2f10809278e611fada6ff1bdd1129a";

//   useEffect(() => {
//   if (debouncedCity.length > 1) {
//     const matches = CityData.filter(c =>
//       c.name.toLowerCase().includes(debouncedCity.toLowerCase())
//     ).slice(0, 5); // limits to top 5 suggestions
//     setSuggestions(matches);
//   } else {
//     setSuggestions([]);
//   }
// }, [debouncedCity]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      toaster.create({
          description: "Back online!",
          type: "success",
          closable: true,
        })
    }

    const handleOffline = () => {
      setIsOffline(true)
      toaster.create({
          description: "You are offline.",
          type: "warning",
          closable: true,
        })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleSearch = async () => {
    if (!city.trim() || isOffline ) return;
    setIsLoading(true)

    try {
      //fetching for Chennai by default
      const weatherData = await fetchWeather(manualLat, manualLon, API_KEY)
      const forecast = parseForecastData(weatherData)
      setWeather(forecast)
      setHasSearched(true)

      setHistory(prev =>
        [city, ...prev.filter(c => c !== city)].slice(0, 5)
      )

      setCity('')
    } catch (err) {
      toaster.create({
        description: 'Failed to fetch data. Try again later.',
        type: 'error',
        closable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <VStack spacing={6} align="stretch">
        {isOffline && (
          <Alert status="warning" borderRadius="md">
            <Alert.Indicator />
            You're offline. Please check your internet connection.
          </Alert>
        )}

        <VStack spaceY={4}>
          {!hasSearched && !isLoading && (
            <VStack spaceY={0}>
              <Heading size="2xl" fontWeight="extrabold" color="#ff9040">
                Welcome to FitBuddy!
              </Heading>
              <Text
                fontSize="lg"
                textAlign="center"
                color={useColorModeValue('gray.600', 'gray.300')}
                mt={6}
              >
                Enter a city name to get the latest forecast and outfit suggestions!
              </Text>
            </VStack>
          )}

          <Flex w="100%" maxW="md">
            <Input
              borderRightRadius="0"
              borderLeftRadius="10px"
              placeholder="Enter city name"
              color="orange.800"
              value={city}
              bg="white"
              border="1px solid #ff9040"
              _dark={{ border: 'none' }}
              onChange={e => setCity(e.target.value)}
              disabled={isOffline}
            />

            <IconButton
              borderLeftRadius="0"
              bg="#ff9040"
              color="white"
              _hover={{ bg: '#e27b30' }}
              onClick={handleSearch}
              aria-label="Search city"
              disabled={isOffline}
            >
              <TiWeatherSunny />
            </IconButton>
          </Flex>
          <Text fontWeight={'extrabold'} color={'gray.500'}>OR</Text>
          <Flex gap={2}>  
            <Input
              placeholder="Latitude"
              type="number"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              border="1px solid #ff9040"
              bg="white"
              borderRadius={10}
            />
            <Input
              placeholder="Longitude"
              type="number"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              border="1px solid #ff9040"
              bg="white"
              borderRadius={10}
            />
            <IconButton
              aria-label="Search by coordinates"
              onClick={async () => {
                if (!manualLat || !manualLon) return
                setIsLoading(true)
                setLastCity(`${manualLat},${manualLon}`)
                try {
                  const weatherData = await fetchWeather(
                    parseFloat(manualLat),
                    parseFloat(manualLon),
                    API_KEY
                  )
                  const forecast = parseForecastData(weatherData)
                  setWeather(forecast)
                  setHasSearched(true)
                  setCity('')
                } catch (err) {
                  toaster.create({
                    description: 'Failed to fetch data for coordinates.',
                    type: 'error',
                    closable: true,
                  })
                } finally {
                  setIsLoading(false)
                }
              }}
              bg="#ff9040"
              color="white"
              _hover={{ bg: '#e27b30' }}
              fontSize={12}
              px={2}
              fontWeight={'bold'}
            >
              Check
            </IconButton>
          </Flex>

          {isLoading && (
            <Flex justify="center">
              <Spinner size="lg" color="orange.400" />
            </Flex>
          )}
        </VStack>

        {/* Forecast cards */}
        {hasSearched && weather.length > 0 && !isLoading && (
          <ForecastList forecastData={weather} />
        )}

        {/* Retry logic if fetch failed */}
        {!isOffline && hasSearched && !weather.length && !isLoading && (
          <Box textAlign="center" mt={4}>
            <Text color="orange.600" mb={2}>
              Couldn't load weather data.
            </Text>
            <IconButton
              icon={<TiWeatherSunny />}
              onClick={() => {
                setCity(lastCity)
                handleSearch()
              }}
              colorScheme="orange"
              aria-label="Retry"
            />
          </Box>
        )}

        {/* Recent searches */}
        {history.length > 0 && (
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="sm" color="orange.400">
              Recent Searches
            </Text>
            {history.map((item, i) => (
              <Text
                key={i}
                fontSize="sm"
                color={useColorModeValue('gray.800', 'white')}
                cursor="pointer"
                _hover={{ textDecoration: 'underline', color: 'orange.400' }}
                onClick={async () => {
                  setIsLoading(true)
                  setLastCity(item)
                  try {
                    const weatherData = await fetchWeather(13.08, 80.27, API_KEY)
                    const forecast = parseForecastData(weatherData)
                    setWeather(forecast)
                    setHasSearched(true)
                    setHistory(prev =>
                      [item, ...prev.filter(c => c !== item)].slice(0, 5)
                    )
                    setCity('')
                  } catch (err) {
                    toaster.create({
                      description: 'Something went wrong',
                      type: 'error',
                      closable: true,
                    })
                  } finally {
                    setIsLoading(false)
                  }
                }}
              >
                • {item}
              </Text>
            ))}
          </VStack>
        )}
      </VStack>
    </DashboardLayout>
  )
}
