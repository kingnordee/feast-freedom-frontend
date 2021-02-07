import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { API } from "../../Constants";
import "../../styles/forms.css"
import {NavLink} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {KITCHEN_FORM, MENU_ITEM_FORM, SET_CURRENT, WORKING_DAYS_FORM} from "../../reducers/RootReducer";

const KitchenRegistration = ({ buttons }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const ph = useSelector(cur => cur.AllReducers.kitchenData)

    const [ state, setState ] = useState({
        name:"",
        email:"",
        password:"",
        image:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        // dispatch({ type: KITCHEN_FORM, payload: state })

        try{
            const response = await axios.post(`${API}/kitchen_registration`, state)
            localStorage.setItem("kitchen", JSON.stringify(response.data))
            history.push("/add_workingdays")
        }catch (e) {
            console.log(`Error from addKitchen axios call: ${e}`);
        }
    }

    return(
        <div className="formWrapper">
            <h2>Kitchen Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                       value={state.name}
                       onChange={(e) =>
                           setState({...state, name: e.target.value})}
                />

                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                       value={state.email}
                       onChange={(e) =>
                           setState({...state, email: e.target.value})}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       value={state.password}
                       onChange={(e) =>
                           setState({...state, password: e.target.value})}
                />

                <label htmlFor="image">Image Url</label>
                <input type="text" id="image"
                       value={state.image}
                       onChange={(e) =>
                           setState({...state, image: e.target.value})}
                />
                <button type="submit" value="Submit">Next</button>
            </form>
        </div>
    )
}

export default KitchenRegistration