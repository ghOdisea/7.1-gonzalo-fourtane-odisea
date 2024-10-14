/* eslint-disable react/prop-types */
import '../styles/sidebar/Conversation.css'
import { Avatar, AvatarBadge, Box, HStack, Text } from '@chakra-ui/react'
import useConversation from '../../store/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  const onlineColor = isOnline ? 'green.500' : 'red.500'
  return (
    <HStack
      onClick={() => setSelectedConversation(conversation)}
      w="100%"
      p={3}
      bg={isSelected ? 'teal.100' : 'white'}
      borderRadius="md"
      boxShadow="sm"
      _hover={{ bg: 'gray.100', cursor: 'pointer' }}
      spacing={4} // Espacio entre el avatar y el texto
    >
      <Avatar name={conversation.username} src={conversation.avatar}>
        <AvatarBadge boxSize="1em" bg={onlineColor} />
      </Avatar>

      <Box flex="1">
        <Text fontWeight="bold">{conversation.username}</Text>
        <Text fontSize="sm" color={isOnline ? 'green.500' : 'red.500'}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </Box>
    </HStack>
  )
}

export default Conversation