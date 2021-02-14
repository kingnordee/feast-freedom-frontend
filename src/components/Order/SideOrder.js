import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import SideOrderItem from "./SideOrderItem";
import axios from "axios";
import {API} from "../../Constants";
import {SET_ORDER} from "../../reducers/RootReducer";

const SideOrder = () => {

    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [orderError, setOrderError] = useState(false)
    const [ordered, setOrdered] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const isOrder = useSelector(state => state.orderReducer)
    const isUser = useSelector(state => state.userReducer)

    useEffect(() => {

    }, [])

    useEffect(() => {
        let itemsArray;
        if(localStorage.getItem("order")){
            itemsArray = JSON.parse(localStorage.getItem("order"))

            let accumItems = []
            for(let _values of Object.values(itemsArray)){
                accumItems = accumItems.concat(_values)
            }
            setItems(accumItems)

            let tot = [];
            for(let item of accumItems) {
                tot.push(item.price)
            }
            setTotal(tot.reduce((a,b) => a + b, 0))

            if(Object.keys(itemsArray) < 1)
                localStorage.removeItem("order")
        }


    }, [isUser, isOrder, ordered])//END OF USE_EFFECT

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        try{
            const order = JSON.parse(localStorage.getItem("order"))
            let user = JSON.parse(localStorage.getItem("user"))
            const userId = user.id


            await axios.post(`${API}/place_order/${userId}`, order)

            setOrdered(true)

            localStorage.removeItem("order");

            //CAUSING UNMOUNTED COMPONENT RERENDER ERROR
            setTimeout(() => {
                setOrdered(false)
                // localStorage.removeItem("order");
                dispatch({type: SET_ORDER, payload: null})
            }, 2000)

        }catch (error) {

            setOrderError(true)

            setTimeout(() => {
                setOrderError(false)
            }, 3000)

            console.log(`${error}`)
        }
    }

    return (
            <div className="sideOrders">
                <h3> Cart </h3>
                <hr/>
                <div>
                    { items.map((item, idx) => {
                        return <SideOrderItem key={idx} item={item}/>
                    })
                    }
                </div>
                <hr/>
                <p>Total = ${total.toFixed(2)}</p>
                <br/>
                { ordered && <p className="orderSuccess">Your order has been placed successfully. Thank you!</p> }
                { orderError && <p className="orderError">Sorry your order could NOT be processed, please try again!</p> }
                <br/>
                { isUser && <button onClick={handlePlaceOrder}
                                    disabled={!localStorage.getItem("order")}>
                    Place Order
                </button> }
                { !isUser && <button onClick={e => history.push("/login_user")}>
                    Login/Signup to place order
                </button> }
            </div>
        )
}

export default SideOrder
