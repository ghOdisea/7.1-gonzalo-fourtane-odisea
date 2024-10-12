import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { ImSpinner } from "react-icons/im";

const LogoutButton = () => {

  const { loading, logout} = useLogout()

  return (
    <div id="sidebar-footer">
      {!loading ? ( 
        <BiLogOut 
          color="black" 
          size={35} 
          onClick={logout} 
          cursor={'pointer'}
        />
      ) : (
        <ImSpinner />
      )
      }
       

    </div>
  )
}

export default LogoutButton