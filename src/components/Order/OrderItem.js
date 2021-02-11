import { useDispatch } from "react-redux";
import "../../styles/menuItems.css"
import {SET_ORDER} from "../../reducers/RootReducer";

const OrderItem = ({ item }) => {//ACTUAL ORDERS IN GET_MENU_ITEMS.JS

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        let order = JSON.parse(localStorage.getItem("order"))
        const foundIdx = order.findIndex(el => el.name === item.name)
        order.splice(foundIdx, 1)

        localStorage.setItem("order", JSON.stringify(order))
        dispatch({ type: SET_ORDER, payload: order })

        // if(order.length < 1)
        //     localStorage.removeItem("order")
    }

    return(
        <div className="OrderItemWrapper">
            <p>
                <span>{item.name}</span> ––><span>{item.price.toFixed(2)}</span>
                <span onClick={handleClick}>X</span>
            </p>
        </div>
    )
}

export default OrderItem
