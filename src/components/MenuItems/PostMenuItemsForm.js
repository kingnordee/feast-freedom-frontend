import axios from "axios";
import {API} from "../../Constants";
import { useState } from "react"
import {useHistory} from "react-router-dom";
import { SET_CURRENT, WORKING_DAYS_FORM } from "../../reducers/RootReducer";
import {useDispatch, useSelector} from "react-redux";
import MenuItemForm from "./MenuItemForm";

const PostMenuItemsForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const ph = useSelector(cur => cur.AllReducers.workingDaysData)

    const [ state, setState ] = useState({
        _day:"", from:"", _to:"", _image:""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${API}/kitchen_registration`,{
            name: state.name, email: state.email, password: state.password, image: state.image
        }).then( response => {
            setState({...state, added: true})
            // dispatch({type: SHOW_ADD, payload: false})
            history.push("/add_workingdays")
        }).catch(error => {
            console.log(`Error from addKitchen axios call: ${error}`);
        })
    }

    const handlePrev = (e) => {
        e.preventDefault()
        dispatch({ type: SET_CURRENT, payload: WORKING_DAYS_FORM})
    }

    const handleSubmitAll = (e) => {
        e.preventDefault()
        // dispatch({ type: WORKING_DAYS_FORM, payload: state })
        // dispatch({ type: SET_CURRENT, payload: MENU_ITEM_FORM})
    }

    return(
        <div className="formWrapper">
            <h2>Menu Items Form</h2>
            <MenuItemForm />
            <div className="prevNextWrapper">
                <button onClick={handleSubmitAll}>Finish</button>
            </div>
        </div>
    )
}

export default PostMenuItemsForm
