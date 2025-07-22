import { Box, Text, Image, VStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useColorModeValue } from "./ui/color-mode";

export function ForecastCard({ day, icon, temp, weather, feelsLike }) {
  return (
    <Tooltip
      content={`Feels like: ${feelsLike}°C`}
      showArrow
      contentProps={{
        bg: "gray.700",
        color: "white",
        px: 3,
        py: 2,
        borderRadius: "md",
        fontSize: "sm",
      }}
    >
      <Box
        p={4}
        borderRadius="2xl"
        boxShadow="md"
        textAlign="center"
        w="100px"
        bgColor={useColorModeValue('white','#ff9040')}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
      >
        <VStack spacing={2} >
          <Text fontSize="md" fontWeight="bold" color={useColorModeValue('grey.800','white')}>
            {day}
          </Text>
          <Image
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={weather}
            boxSize="50px"
          />
          <Text fontSize="sm" color={'orange.800'} fontWeight={'bold'}>
            {weather}
          </Text>
          <Text fontSize="sm" color={useColorModeValue('grey.800','white')} fontWeight={'bold'}>
            {temp.min}° / {temp.max}°
          </Text>
        </VStack>
      </Box>
    </Tooltip>
  );
}
