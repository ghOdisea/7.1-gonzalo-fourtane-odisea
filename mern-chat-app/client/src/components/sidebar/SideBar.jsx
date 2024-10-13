import SearchInput from '../sidebar/SearchInput'
import Conversations from '../sidebar/Conversations'
import LogoutButton from '../sidebar/LogoutButton'
import '../styles/sidebar/SideBar.css'
import { Divider } from '@chakra-ui/react'

const SideBar = () => {
  return (
    <div id='sidebar-container'>
        <SearchInput />
        <Divider />
        <Conversations />
        <Divider />
        <LogoutButton />
      </div>
  )
}

export default SideBar