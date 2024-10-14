import { ImSearch } from "react-icons/im";
import { useState } from "react";
import  useGetConversations  from '../../hooks/useGetConversations'
import  useConversation  from '../../store/useConversation'
import toast from "react-hot-toast";
import { Button, Container, Input } from '@chakra-ui/react'



const SearchInput = () => {

  const [search, setSearch] = useState('')
  const {setSelectedConversation} = useConversation()
  const { conversations } = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return;
    if(search.length < 2){
      return toast.error('Search must be at least 3 characters long')
    }
    const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()))

    if(conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    }else{
      toast.error('user not found')
    }
  }

  return (
    <Container className="sidebar-search" h={'10dvh'}>
      <form id="search-form" onSubmit={handleSubmit}>
          <Input id="searching-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value) }
            variant="filled"
            w={"65%"}
            />
          <Button 
            className="search-button" 
            type="submit" 
            colorScheme='teal' 
            size='md' 
            ml={"10px"}
          ><ImSearch />
          </Button>
          
      </form>
  </Container>
  )
}

export default SearchInput