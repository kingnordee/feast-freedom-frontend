import axios from "axios";
import {API} from "../../Constants";
import { useState, useEffect } from "react"
import {NavLink} from "react-router-dom";
import "../../styles/menuItems.css"

const MenuItemForm = ({ day }) => {

    const [ state, setState ] = useState({
        name:"", veg: false, price: 0.0, image:""
    })

    const handleAdd = async (e) => {
        // e.preventDefault()
        try{
            const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
            const response = await axios.post(`${API}/add_menu_item/${kitchenId}`, state)
        }catch (e) {
            console.log(`Error from MenuItem.js axios call: ${e}`);
        }
    }

    return(
        <div className="menuItemForm"> {/*STYLES IN FORMS.CSS*/}
            <form action="">
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                       onChange={e => setState({...state, name: e.target.value})}
                />
                <label htmlFor="veg">Veg</label>
                <select name="veg" id="veg"
                        onChange={e => setState({...state, veg: e.target.value})}
                >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>

                <label htmlFor="image">Image Url</label>
                <input type="text" id="image"
                       onChange={e => setState({...state, image: e.target.value})}
                />
                <label htmlFor="price">Price</label>
                <input type="Number" id="price"
                       onChange={e => setState({...state, price: e.target.value})}
                />

                <button onClick={handleAdd}>Add</button>
            </form>

            <NavLink class="finish" to="/">Finish</NavLink>
        </div>
    )
}

export default MenuItemForm
