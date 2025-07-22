// components/ForecastList.jsx
import { ForecastCard } from "./ForecastCard";
import {
  Box,
  Heading,
  HStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

export function ForecastList({ forecastData }) {
  const bg = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      mt={6}
      px={4}
      py={6}
      bg={bg}
      borderRadius="2xl"
      border="1px solid"
      borderColor={border}
      boxShadow="sm"
    >
      <Stack spacing={4}>
        <Box>
          <Heading as="h3" size="md" mb={1} color={useColorModeValue('grey.800','white')}>
            5-Day Forecast
          </Heading>
          <Text fontSize="sm" color={useColorModeValue('grey.800','white')}>
            Weather summary for the upcoming days
          </Text>
        </Box>

        <HStack
          spacing={4}
        //   py={4}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          p={3}
        >
          {forecastData.map((item) => (
            <ForecastCard
              key={item.date}
              day={item.day}
              icon={item.icon}
              temp={item.temp}
              weather={item.weather}
              feelsLike={item.feels_like}
            />
          ))}
        </HStack>
      </Stack>
    </Box>
  );
}
