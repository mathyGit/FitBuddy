import {
  Box,
  Container,
  Flex,
  Image
} from '@chakra-ui/react'
import { ColorModeButton } from '../ui/color-mode'
import { useColorModeValue } from '../ui/color-mode'
import {images} from '../../assets/images'
import { Toaster } from '../ui/toaster'

export default function DashboardLayout({ children }) {
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.700')}>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        px={6}
        py={2}
        bg={useColorModeValue('orange.100', 'gray.100')}
        shadow="md"
      >
        <Image src={images.logo} alt="FitBuddy Logo" w={{base:'40%',md:'15%',lg:'10%'}}/>
        <ColorModeButton />
      </Flex>

      <Container maxW="6xl" py={8}>
        {children}
        <Toaster/>
      </Container>
    </Box>
  )
}
