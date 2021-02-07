import { useState, useEffect } from "react"
import "../../styles/menuItems.css"
import MenuItem from "./MenuItem";

const GetMenuItems = () => {
    const [ state, setState ] = useState({
        menuItems: []
    })

    useEffect(() => {
        let kitchen = JSON.parse(localStorage.getItem("kitchen"));
        setState({ ...state, menuItems: kitchen.menuItems })
    }, [])

    return(
        <div className="menuItemsWrapper">
            { state.menuItems.length > 0 &&
                state.menuItems.map(item => <MenuItem key={item.id} item={item} />)
            }
        </div>
    )
}

export default GetMenuItems
