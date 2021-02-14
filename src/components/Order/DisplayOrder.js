import  { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {API} from "../../Constants";
import { DELETED } from "../../reducers/RootReducer";

const DisplayOrder = ({ order }) => {

    const [state, setState] = useState({
        showingItems: false, cancelled: false
    })

    const [kitchenName, setKitchenName] = useState("")

    useEffect(() => {
        try{
            axios.get(`${API}/kitchen_name/${order.id}`).then(response => {
                setKitchenName(response.data)
            }).catch(e => console.log(`${e}`))
        }catch (e) {
            console.log(`${e}`)
        }

    }, [])

    const dispatch = useDispatch()

    const cancelOrder = async (e) => {
        e.preventDefault()
        if(!window.confirm("Are you sure you want to cancel this order?")) return
        try{
            await axios.delete(`${API}/delete_order/${order.id}`)

            setState({ ...state, cancelled: true})

            setTimeout(() => {
                setState({ ...state, cancelled: false })
                dispatch({type: DELETED, payload: true})
            }, 2000)


        }catch (e) {
            console.log(`${e}`)
        }
    }

    return(
        <div className="eachOrder">
            <table>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Date</th>
                        <th>No. of items</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {order.id}
                    </td>
                    <td>
                        {order.orderTime}
                    </td>
                    <td>
                        {order.menuItems.length}
                    </td>
                    <td>
                        $ {order.amountPaid.toFixed(2)}
                    </td>
                </tr>
                </tbody>
            </table>
            {
                !state.cancelled &&
                <div>
                    <button onClick={(e => setState({...state, showingItems: !state.showingItems}))}>
                        {state.showingItems ? "Hide Items" : "Show Items"}
                    </button>
                    <button onClick={cancelOrder}> Cancel Order </button>
                </div>
            }

            { state.cancelled && <p style={{color:"goldenrod"}}>This order has been cancelled!</p> }

            { state.showingItems &&
                <table style={{width:"80%"}}>
                    <thead>
                        <tr>
                            <th>Item</th><th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {order.menuItems.map((item, idx) => <tr key={idx}>
                        <td>{item.name}</td>
                        <td>$ {item.price.toFixed(2)}</td>
                    </tr>)}
                    </tbody>
                </table>
            }


        </div>
    )
}

export default DisplayOrder
