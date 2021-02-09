import { useState, useEffect } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import "../styles/nav.css"

const NavBar = () => {

    const [ user, setUser ] = useState((!!localStorage.getItem("user")))
    const [ reload, setReload ] = useState(true)
    let myP;

    const history = useHistory()

    useEffect(() => {

        if(localStorage.getItem("user"))
            setUser(true)

        window.addEventListener("click", (e) => setReload(!reload));
        return () => {
            window.removeEventListener("click", (e) => setReload(!reload));
        }
    }, [reload])

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("order");
        setUser(false)
        history.push("/")
    }

    return(
        <div className="navWrapper">
            <div className="navLeft">
                <p ref={p => myP = p}><NavLink to="/">Home</NavLink></p>
            </div>
            <div className="navRight">
                { !user && <p><NavLink to="/login_user">Sign-in</NavLink></p> }
                { !user && <p><NavLink to="/register_user">Sign-up</NavLink></p> }

                { user && <p>{`Welcome, ${JSON.parse(localStorage.getItem("user")).data.fname}!`} </p> }
                { user && <p onClick={logout}><NavLink to="/">Logout</NavLink></p> }
                <NavLink to="/register_kitchen">Register Kitchen</NavLink>
            </div>
        </div>
    )
}

export default NavBar
