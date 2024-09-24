import SearchInput from '../sidebar/SearchInput'
import Conversations from '../sidebar/Conversations'
import LogoutButton from '../sidebar/LogoutButton'
import Divider from '@mui/material/Divider';
import '../styles/sidebar/SideBar.css'

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