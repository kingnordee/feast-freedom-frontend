import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import "../styles/nav.css"
import {SET_USER} from "../reducers/RootReducer";

const NavBar = () => {

    const [state, setState] = useState({
        userOptions: false
    })

    const history = useHistory()
    const dispatch = useDispatch()
    const isUser = useSelector(state => state.userReducer.user)

    useEffect(() => {

    }, [isUser])

    const manageKitchen = (e) => {
        e.preventDefault()
        switch (e.target.value) {
            case "RegisterKitchen": {
                history.push("/register_kitchen")
                return
            }
            default: { return; }
        }
    }

    return(
        <main className="navMain">
            <div className="navWrapper">
                <div className="navLeft">
                    <p><NavLink exact to="/" activeClassName="active">Home</NavLink></p>
                </div>
                <div className="navRight">
                    { !isUser && <p><NavLink to="/login_user" activeClassName="active">Sign-in</NavLink></p> }
                    { !isUser && <p><NavLink to="/register_user" activeClassName="active">Sign-up</NavLink></p> }

                    { isUser &&
                    <p className="welcomeUser">
                        {`Welcome, ${JSON.parse(localStorage.getItem("user")).fname}!`}
                    </p>
                    }

                    { isUser && <p className="pointer"
                                   onClick={e => setState({...state, userOptions: !state.userOptions})}>
                        &#8675;User Options&#8675;
                    </p>}

                    <select name="kitOptions" id="kitOptions" onChange={manageKitchen}>
                        <option value=""> – Manage Kitchen – </option>
                        <option value="RegisterKitchen">Register Kitchen</option>
                        <option value="ManageMenuItems">Manage Menu Items</option>
                        <option value="ManageWorkingDays">Manage Working Days</option>
                        <option value="LogoutKitchen">Logout Kitchen</option>
                    </select>
                    {/*<p><NavLink to="/register_kitchen" activeClassName="active">Register Kitchen</NavLink></p>*/}
                </div>
            </div>
            {
                state.userOptions &&
                    <div className="lowerNav">
                        <p onClick={e => {
                            setState({...state, userOptions: false})
                            history.push("/get_order");
                        }}>Manage Orders</p>

                        <p onClick={event => {
                            setState({...state, userOptions: false})
                            localStorage.removeItem("user")
                            localStorage.removeItem("order")
                            dispatch({type:SET_USER, payload:null})
                            history.push("/");
                        }}>Logout</p>
                    </div>
            }
        </main>

    )
}

export default NavBar
