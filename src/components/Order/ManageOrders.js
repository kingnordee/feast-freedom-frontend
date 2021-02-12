import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import axios from "axios";
import {API} from "../../Constants";
import {ROUTED} from "../../reducers/RootReducer";
import "../../styles/order.css"
import DisplayOrder from "./DisplayOrder";

const ManageOrders = () => {

    const [state, setState] = useState({
        order: [], loaded: false, error: false
    })

    const history = useHistory()
    const dispatch = useDispatch()
    const deleted = useSelector(state => state.orderReducer)

    useEffect(() => {

        dispatch({type: ROUTED, payload: true})

        try{
            axios.get(`${API}/get_order/${JSON.parse(localStorage.getItem("user")).id}`)
                .then(response => {
                    setState({
                        ...state, order:response.data, loaded: true
                    })
                }).catch(e => {
                setState({ ...state, error: true })
                console.log(`${e}`)
            })
        }catch (e) {
            if(!localStorage.getItem("user")) history.push("/login_user")
            else history.push("/")
            console.log(`${e}`)
        }

    }, [deleted])

    if(state.error) return <div> Error loading Page </div>
    else if(!state.loaded) return <div><i> Loading . . . </i></div>
    else {
        return(
            <div className="ordersWrapper">
                <h2>Your Orders</h2>
                {
                    state.order.sort((a,b) => b.id - a.id)
                        .map((ord, idx) => {
                        return(
                            <DisplayOrder key={idx} order={ord}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default ManageOrders
