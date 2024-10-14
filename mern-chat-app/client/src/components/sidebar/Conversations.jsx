import Conversation from '../sidebar/Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { Box, Container, Spinner, Text, VStack } from '@chakra-ui/react'


const Conversations = () => {
  const {loading, conversations} = useGetConversations()

  return (
    <Box>
      <Text fontSize="xl" mb={4} fontWeight="bold">Conversations:</Text>

      <Container
        id='sidebar-conversations'
        overflowY="scroll"
        maxHeight="60vh"
        w="100%"
        bg="gray.50"
        borderRadius="md"
        padding={2}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" h="100%">
            <Spinner size="xl" />
          </Box>
        ) : (
          <VStack spacing={2}>
            {conversations.map((conversation) => (
              <Box
                key={conversation._id}
                w="100%"
                p={2}
                borderRadius="md"
                bg="white"
                boxShadow="md"
              >
                <Conversation conversation={conversation} />
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default Conversations