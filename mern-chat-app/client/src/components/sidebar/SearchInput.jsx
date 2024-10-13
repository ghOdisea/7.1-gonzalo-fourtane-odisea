import { ImSearch } from "react-icons/im";
import { useState } from "react";
import  useGetConversations  from '../../hooks/useGetConversations'
import  useConversation  from '../../store/useConversation'
import '../styles/sidebar/SearchInput.css'
import toast from "react-hot-toast";
import { Button, Input } from '@chakra-ui/react'



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
    <div className="sidebar-search">
      <form id="search-form" onSubmit={handleSubmit}>
          <Input id="searching-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value) }
            variant="filled"
            />
          <Button type="submit" colorScheme='teal' size='xs' className="search-button"><ImSearch /></Button>
          
      </form>
  </div>
  )
}

export default SearchInput