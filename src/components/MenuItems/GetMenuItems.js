import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import MenuItem from "./MenuItem";
import "../../styles/menuItems.css"
import OrderItem from "../Order/OrderItem";
import axios from "axios";
import {API} from "../../Constants";

const GetMenuItems = () => {
    const [ state, setState ] = useState({
        menuItems: []
    })

    const history = useHistory()

    const [total, setTotal] = useState(0)
    const [ordered, setOrdered] = useState(false)
    const [orderError, setOrderError] = useState(false)
    const [showOrders, setShowOrders] = useState(false)


    // const dispatch = useDispatch()
    const isOrder = useSelector(state => state.orderReducer.order)
    const isUser = useSelector(state => state.userReducer.user)

    useEffect(() => {
        let kitchen = JSON.parse(localStorage.getItem("kitchen"));
        setState({ ...state, menuItems: kitchen.menuItems })

        setShowOrders(localStorage.getItem("order") &&
            JSON.parse(localStorage.getItem("order")).length > 0
        )

        let items;
        if(localStorage.getItem("order")){
            items = JSON.parse(localStorage.getItem("order"))
            let tot = [];
            for(let item of items) {
                tot.push(item.price)
            }
            setTotal(tot.reduce((a,b) => a + b, 0))
        }

    }, [isOrder, isUser, ordered])

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        try{
            const order = JSON.parse(localStorage.getItem("order"))
            const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
            let user = JSON.parse(localStorage.getItem("user"))
            const userId = user.id

            let menuItemsIds = []
            for(let item of order){
                menuItemsIds.push(item.id)
            }

            menuItemsIds = menuItemsIds.toString()

            await axios.post(`${API}/place_order`, {
                kitchenId, userId, menuItemsIds
            })



            setOrdered(true)

            setTimeout(() => {
                setOrdered(false)
                localStorage.removeItem("order");
            }, 5000)
            clearTimeout()



        }catch (error) {

            setOrderError(true)

            setTimeout(() => {
                setOrderError(false)
            }, 3000)
            clearTimeout()

            console.log(`${error}`)

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

            {/*SIDE ORDER SIDE ORDER SIDE ORDER*/}

            { localStorage.getItem("order") &&
                <div className="sideOrders">
                    <h3> Cart </h3>
                    <hr/>
                    <div>
                        { JSON.parse(localStorage.getItem("order")).map((item, idx) => {
                                return <OrderItem key={idx} item={item}/>
                            })
                        }
                    </div>
                    <hr/>
                    <p>Total = ${total.toFixed(2)}</p>
                    <br/>
                    { ordered && <p className="orderSuccess">Your order has been placed successfully. Thank you!</p> }
                    { orderError && <p className="orderError">Sorry your order could NOT be processed, please try again!</p> }
                    <br/>
                    { isUser && <button onClick={handlePlaceOrder}> Place Order </button> }
                    { !isUser && <button onClick={e => history.push("/login_user")}>
                        Login/Signup to place order
                    </button> }
                </div>
            }
        </div>
    )
}

export default GetMenuItems
