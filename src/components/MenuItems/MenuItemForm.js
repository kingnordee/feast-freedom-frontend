import axios from "axios";
import {API} from "../../Constants";
import { useState } from "react"
import {NavLink} from "react-router-dom";
import "../../styles/menuItems.css"

const MenuItemForm = ({ day }) => {

    const [ state, setState ] = useState({
        name:"", veg: "false", price: 0.0, image:""
    })

    const [itemAdded, setItemAdded] = useState(false)

    const handleAdd = async (e) => {
        e.preventDefault()
        try{
            const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
            await axios.post(`${API}/add_menu_item/${kitchenId}`, state)
            setState({ name:"", veg: false, price:0.0, image:"" })
            setItemAdded(true)
            setTimeout(() => {
                setItemAdded(false)
            }, 8000)
            clearTimeout()

        }catch (e) {
            console.log(`Error from MenuItem.js axios call: ${e}`);
        }
    }

    return(
        <div  className="menuItemForm"> {/*STYLES IN MENUITEMS.CSS*/}
            <form action="">
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                       value={state.name}
                       onChange={e => setState({...state, name: e.target.value})}
                />

                <label htmlFor="veg">Vegetarian?</label>
                <select name="veg" id="veg"
                        value={state.veg}
                        onChange={(e) => setState({...state, veg: e.target.value})}>
                >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>

                <label htmlFor="image">Image Url</label>
                <input type="text" id="image"
                       value={state.image}
                       onChange={e => setState({...state, image: e.target.value})}
                />

                <label htmlFor="price">Price</label>
                <input type="Number" id="price"
                       value={state.price}
                       onChange={e => setState({...state, price: e.target.value.toFixed(2)})}
                />

                { itemAdded && <p className='orderError'> Menu item added </p> }
                { itemAdded && <br/>}

                <button type="submit" onClick={handleAdd}>Add</button>
            </form>

            <NavLink className="finish" to="/">Finish</NavLink>
        </div>
    )
}

export default MenuItemForm
