// src/components/layout/DashboardLayout.jsx
import {
  Box,
  Container,
  Flex,
  Heading,
  Image
} from '@chakra-ui/react'
import { ColorModeButton } from '../ui/color-mode'
import { useColorModeValue } from '../ui/color-mode'
import {images} from '../../assets/images'

export default function DashboardLayout({ children }) {
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.700')}>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        px={6}
        py={2}
        bg={useColorModeValue('white', 'gray.800')}
        shadow="md"
      >
        <Image src={images.logo} alt="FitBuddy Logo" w={'8%'}/>
        <ColorModeButton />
      </Flex>

      <Container maxW="6xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}
