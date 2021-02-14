import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import "../../styles/menuItems.css"
import {SET_ORDER} from "../../reducers/RootReducer";

const SideOrderItem = ({ item }) => {//ACTUAL ORDERS IN GET_MENU_ITEMS.JS

    const dispatch = useDispatch()
    const isOrder = useSelector(state => state.orderReducer)

    useEffect(() => {

    }, [isOrder])

    const removeSideOrderItem = (e) => {
        e.preventDefault()
        let order = JSON.parse(localStorage.getItem("order"))

        for(let [k,v] of Object.entries(order)){
            const foundIdx = order[k].findIndex(el => el.id === item.id)
            if(foundIdx > -1) order[k].splice(foundIdx, 1)
            if(!v?.length) delete order[k]
        }

        localStorage.setItem("order", JSON.stringify(order))

        dispatch({ type: SET_ORDER, payload: order })
    }

    return(
        <div className="OrderItemWrapper">
            <p>
                <span>{item.name}</span> <span>{item.price.toFixed(2)}</span>
                <span onClick={removeSideOrderItem}>X</span>
            </p>
        </div>
    )
}

export default SideOrderItem
