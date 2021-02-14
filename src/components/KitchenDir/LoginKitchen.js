import {useHistory} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {API} from "../../Constants";
import {SET_KITCHEN, SET_USER} from "../../reducers/RootReducer";
import {useDispatch} from "react-redux";

const LoginKitchen = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [ state, setState ] = useState({
        email:"", password:""
    })

    const [valid, setValid] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const kitchen = await axios.post(`${API}/kitchen_login`, state)

            if(!kitchen.data) throw "Invalid credentials"

            localStorage.setItem('kitchen', JSON.stringify(kitchen.data))
            // localStorage.removeItem("order") //So user can sign in to place order
            dispatch({ type: SET_KITCHEN, payload: kitchen.data })
            history.push("/")
        }catch (e) {
            setValid(false)
            setTimeout(() => {
                setValid(true)
            }, 5000)

            clearTimeout()
            console.log(`${e}`)
        }
    }

    return(
        <div className="formWrapper">
            <h2>Kitchen Login Form</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" required
                       value={state.email}
                       onChange={(e) =>
                           setState({...state, email: e.target.value})}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required
                       value={state.password}
                       onChange={(e) =>
                           setState({...state, password: e.target.value})}
                />

                <button type="submit" value="Submit">Login</button>
            </form>
        </div>
    )
}

export default LoginKitchen
