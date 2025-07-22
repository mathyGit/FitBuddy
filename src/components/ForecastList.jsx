import { ForecastCard } from "./ForecastCard";
import {
  Box,
  Heading,
  HStack,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

export function ForecastList({ forecastData }) {
  const bg = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("orange", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      my={6}
      p={4}
      bg={useColorModeValue("orange.100", bg)}
      borderRadius="2xl"
      border="1px solid"
      borderColor={border}
      boxShadow="sm"
    >
      <Stack spacing={4}>
        <Box>
          <Heading
            as="h3"
            size="md"
            mb={1}
            color={useColorModeValue("gray.800", "white")}
          >
            5-Day Forecast
          </Heading>
          <Text fontSize="sm" color={useColorModeValue("gray.700", "gray.300")}>
            Weather summary for the upcoming days
          </Text>
        </Box>

        <HStack
          spacing={2}
          overflowX={isMobile ? "auto" : "visible"}
          wrap={isMobile ? "nowrap" : "wrap"}
          justify={isMobile ? "flex-start" : "center"}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          p={1}
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
