import SearchInput from '../sidebar/SearchInput'
import Conversations from '../sidebar/Conversations'
import LogoutButton from '../sidebar/LogoutButton'
import '../styles/sidebar/SideBar.css'
import { Box, Divider, Flex } from '@chakra-ui/react'

const SideBar = () => {
  return (
    <Flex
      id='sidebar-container'
      w={'35%'}
      bg={'#f0f2f5'}
      direction="column"
      p={4}
    >
      {/* Caja para el input de búsqueda */}
      <Box mb={4}>
        <SearchInput />
      </Box>

      <Divider />

      {/* Caja flexible para las conversaciones, con scroll */}
      <Box flex="1" overflowY="auto" mt={4} mb={4}>
        <Conversations />
      </Box>

      <Divider />

      {/* Caja para el botón de logout */}
      <Box mt={4}>
        <LogoutButton />
      </Box>
    </Flex>
  )
}

export default SideBar