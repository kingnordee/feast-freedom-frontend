import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import MenuItem from "./MenuItem";
import "../../styles/menuItems.css"
import axios from "axios";
import {API} from "../../Constants";
import SideOrder from "../Order/SideOrder";

const GetMenuItems = () => {
    const [ state, setState ] = useState({
        menuItems: [], kitchenName: "", loaded: false, error: false,
    })

    const { kitchenId } = useParams()
    const isOrder = useSelector(state => state.orderReducer)

    useEffect( () => {
        axios.get(`${API}/get_menu_items/${kitchenId}`).then( response => {
            setState({
                ...state, menuItems: response.data.menuItems,
                kitchenName: response.data.name, loaded: true
            })
        }).catch( e => {
            setState({ ...state, error: true})
            console.log(`${e}`)
        })
    }, [isOrder])



    if(state.error) return <div> Error </div>
    else if(!state.loaded) return <div> <i> Loading... </i> </div>
    else {
        const menuItems = state.menuItems.sort((a,b) => a.id-b.id)
        return(
            <div className= "menuItemsWrapper">
                <div className="menuItemsWrapper2">
                    <h2>{ state.kitchenName }</h2>
                    <h4>Menu Items</h4>
                    <div className="menuItemsInner">
                        { state.menuItems.length > 0 &&
                        menuItems.map(item =>
                            <div key={item.id} className="item">
                                <MenuItem  item={item} />
                            </div>
                        )
                        }
                    </div>
                </div>

                { localStorage.getItem("order") && <SideOrder/> }

            </div>
        )
    }

}

export default GetMenuItems
