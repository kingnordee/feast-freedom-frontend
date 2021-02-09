import { useState, useEffect } from "react"
import MenuItem from "./MenuItem";
import "../../styles/menuItems.css"
import OrderItem from "../Order/OrderItem";
import axios from "axios";
import {API} from "../../Constants";

const GetMenuItems = (ref) => {
    const [ state, setState ] = useState({
        menuItems: []
    })

    const [total, setTotal] = useState(0)
    const [ordered, setOrdered] = useState(false)


    const [showOrders, setShowOrders] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        let kitchen = JSON.parse(localStorage.getItem("kitchen"));
        setState({ ...state, menuItems: kitchen.menuItems })
        setShowOrders(localStorage.getItem("order"))

        let items;
        if(localStorage.getItem("order")){
            items = JSON.parse(localStorage.getItem("order"))
            let tot = [];
            for(let item of items) {
                tot.push(item.price)
            }
            setTotal(tot.reduce((a,b) => a + b, 0))
        }

        window.addEventListener("click", (e) => setReload(!reload));
        return () => {
            window.removeEventListener("click", (e) => setReload(!reload));
        }

    }, [reload])

    const handlePlaceOrder = async (e) => {
        setOrdered(true)

        const order = JSON.parse(localStorage.getItem("order"))
        const kitchenId = JSON.parse(localStorage.getItem("kitchen"))
        const userId = 1

        let menuItemsIds = ""
        for(let item of order){
            if(!menuItemsIds.trim()) menuItemsIds.concat(item.id)
            else menuItemsIds.concat(`,${item.id}`)
        }

        try{
            await axios.post(`${API}/place_order`, {
                kitchenId, userId, menuItemsIds
            })
            // localStorage.removeItem("order");
        }catch (e) {
            console.log(`${e}`)
        }

    }

    return(
        <div className= "menuItemsWrapper">
            <div className="menuItemsWrapper2">
                <h2>{JSON.parse(localStorage.getItem("kitchen")).name}</h2>
                <h4>Menu Items</h4>
                <div className="menuItemsInner">
                    { state.menuItems.length > 0 &&
                        state.menuItems.map(item =>
                            <div key={item.id} className="item">
                                <MenuItem  item={item} />
                            </div>
                        )
                    }
                </div>
            </div>

            { showOrders &&
                <div className="sideOrders">
                    <h3> Cart </h3>
                    <hr/>
                    { JSON.parse(localStorage.getItem("order")).map(item => {
                            return <OrderItem item={item}/>
                        })
                    }
                    <hr/>
                    <p>Total = ${total.toFixed(2)}</p>
                    { ordered && <p>Your order has been placed successfully. Thank you!</p>}
                    <button onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            }
        </div>
    )
}

export default GetMenuItems
