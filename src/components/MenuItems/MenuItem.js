import { useDispatch } from "react-redux";
import {SET_ORDER} from "../../reducers/RootReducer";

const MenuItem = ({ item }) => {

    const dispatch = useDispatch()

    const addToOrder = (e) => {
        e.preventDefault()
        if(!localStorage.getItem("order"))
            localStorage.setItem("order", JSON.stringify([]))

        let currentOrder = JSON.parse(localStorage.getItem("order"))
        currentOrder = [...currentOrder, item]
        localStorage.setItem('order', JSON.stringify(currentOrder))
        dispatch({ type: SET_ORDER, payload: currentOrder })
    }

    return(
        <div className="itemWrapper">
            <img src={item.image} alt="Menu item image"/>
            <div className="itemInner">
                <p>{item.name}</p>
                <p>Vegetarian: { item.veg ? "Yes" : "No" }</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <button onClick={addToOrder}>+ Add to Cart +</button>
            </div>
        </div>
    )
}

export default MenuItem
