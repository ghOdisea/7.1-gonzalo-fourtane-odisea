import { ImSearch } from "react-icons/im";
import '../styles/sidebar/SearchInput.css'

const SearchInput = () => {
  return (
    <form action="" id="search-form">
        <input type="text" placeholder="Search..."/>
        <button type="submit"><ImSearch /></button>
        
    </form>
  )
}

export default SearchInput