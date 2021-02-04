import { NavLink } from 'react-router-dom'
import "../styles/nav.css"

const NavBar = () => {

    return(
        <div className="navWrapper">
            <div className="navLeft">
                <NavLink to="/">Home</NavLink>
            </div>
            <div className="navRight">
                <NavLink to="/register_user">Sign Up</NavLink>
                <NavLink to="/register_kitchen">Register Kitchen</NavLink>
            </div>
        </div>
    )
}

export default NavBar
