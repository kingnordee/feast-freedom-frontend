import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import "../styles/nav.css"
import {SET_KITCHEN, SET_USER} from "../reducers/RootReducer";
import axios from "axios";
import {API} from "../Constants";

const NavBar = () => {

    const [state, setState] = useState({
        userOptions: false, kitchenOptions: false, reload: false
    })

    const [reload, setReload] = useState(true)

    const history = useHistory()
    const dispatch = useDispatch()
    const isUser = useSelector(state => state.userReducer.user)
    const isKitchen = useSelector(state => state.kitchenReducer.kitchen)

    useEffect(() => {

    }, [isUser, isKitchen, state])

    const deactivateUser = async (e) => {
        e.preventDefault()

        try{
            const userId = JSON.parse(localStorage.getItem("user")).id
            if(!window.confirm("Are you sure you want to deactivate your account? You can't undo this action."))
                return
            await axios.delete(`${API}/delete_user/${userId}`)
            setState({...state, userOptions: false, kitchenOptions: false})
            localStorage.removeItem("user")
            localStorage.removeItem("order")
            dispatch({type:SET_USER, payload:null})
            history.push("/");

        }catch (e) {
            console.log(`${e}`)
        }
    }

    const deleteKitchen = async (e) => {
        e.preventDefault()
        const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
        try{

            if(!window.confirm("Are you sure you want to deactivate your Kitchen? You can't undo this action."))
                return
            await axios.delete(`${API}/delete_kitchen/${kitchenId}`)
            setState({...state, userOptions: false, kitchenOptions: false})
            localStorage.removeItem("kitchen")
            dispatch({type:SET_KITCHEN, payload:null})
            history.push("/");

        }catch (e) {
            console.log(`${e}`)
        }
    }

    return(
        <main className="navMain">
            <div className="navWrapper">
                <div className="navLeft">
                    <p onClick={e => {
                        setState({...state, userOptions:false, kitchenOptions:false})
                        history.push("/")
                    }} className="homeButton">
                        Home
                    </p>
                </div>
                <div className="navRight">
                    { isUser &&
                    <p className="welcomeUser">
                        {`Welcome, ${JSON.parse(localStorage.getItem("user")).fname}!`}
                    </p>
                    }

                    {<p className="pointer"
                                   onClick={e => setState({...state,
                                       userOptions: !state.userOptions,
                                       kitchenOptions: false
                                   })}>
                        &#8675;User Options&#8675;
                    </p>}

                    <p className="pointer"
                                      onClick={e => setState({
                                          ...state, kitchenOptions: !state.kitchenOptions,
                                          userOptions: false
                                      })}>
                        &#8675;Manage Kitchen&#8675;
                    </p>
                </div>
            </div>

            {/*
                USER USER USER USER USER USER USER USER USER USER USER
            */}
            {
                state.userOptions &&

                    <div className="lowerNav">

                        { !isUser && <p onClick={e => {
                            //For all three below, handle if !localStorage.getItem("user")
                            setState({...state, userOptions: false, kitchenOptions: false})
                            history.push("/login_user");
                        }}>User Login</p>}

                        { !isUser && <p onClick={e => {
                            //For all three below, handle if !localStorage.getItem("user")
                            setState({...state, userOptions: false, kitchenOptions: false})
                            history.push("/register_user");
                        }}>User Sign-Up</p>}

                        { isUser && <p onClick={e => {
                            //For all three below, handle if !localStorage.getItem("user")
                            setState({...state, userOptions: false, kitchenOptions: false})
                            history.push("/get_order");
                        }}>Manage Orders</p> }

                        { isUser && <p onClick={e => {
                            setState({...state, userOptions: false, kitchenOptions: false})
                            history.push("/cart")
                        }}>View Cart</p> }

                        { isUser && <p onClick={e => {
                            setState({...state, userOptions: false, kitchenOptions: false})
                            localStorage.removeItem("user")
                            localStorage.removeItem("order")
                            dispatch({type: SET_USER, payload: null})
                            history.push("/");
                        }}>Logout User</p> }

                        { isUser && <p onClick={deactivateUser}>Deactivate Account</p> }
                    </div>
            }

            {/*
                KITCHEN KITCHEN KITCHEN KITCHEN KITCHEN KITCHEN KITCHEN KITCHEN
            */}
            {
                state.kitchenOptions &&
                <div className="lowerNav">

                    { !isKitchen && <p onClick={e => {
                        //For all below, handle if !localStorage.getItem("kitchen")
                        setState({...state, userOptions: false, kitchenOptions: false})
                        history.push("/kitchen_login");
                    }}>Login Kitchen</p> }

                    { !isKitchen && <p onClick={e => {
                        //For all below, handle if !localStorage.getItem("kitchen")
                        setState({...state, userOptions: false, kitchenOptions: false})
                        history.push("/register_kitchen");
                    }}>Register Kitchen</p> }

                    {/*If current kitchen.id = menuItem.kitchen.id then show edit button*/}
                    { isKitchen && <p onClick={e => {
                        setState({...state, userOptions: false, kitchenOptions: false})
                        history.push(`/add_menu_item/`);
                    }}>Menu Items</p> }

                    { isKitchen && <p onClick={e => {
                        setState({...state, userOptions: false, kitchenOptions: false})
                        history.push("/add_workingdays");
                    }}>Working Days</p> }

                    {/*{ isKitchen && <p onClick={e => {*/}
                    {/*    setState({...state, userOptions: false, kitchenOptions: false})*/}
                    {/*    history.push("/cart")*/}
                    {/*}}> Orders </p> }*/}

                    { isKitchen && <p onClick={event => {
                        setState({...state, userOptions: false, kitchenOptions: false})
                        localStorage.removeItem("kitchen")
                        dispatch({type: SET_KITCHEN, payload: null})
                        history.push("/");
                    }}>Logout Kitchen</p> }

                    { isKitchen && <p onClick={deleteKitchen}>Deactivate Kitchen</p> }
                </div>
            }

        </main>

    )
}

export default NavBar
