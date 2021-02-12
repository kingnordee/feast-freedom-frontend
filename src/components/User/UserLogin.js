import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import {API} from "../../Constants";
import {SET_USER} from "../../reducers/RootReducer";

const UserLogin = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [ state, setState ] = useState({
        email:"", password:""
    })

    const [valid, setValid] = useState(true)

    // useEffect(() => {
    //
    // }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = await axios.post(`${API}/user_login`, state)

            if(!user.data) throw "Invalid credentials"

            localStorage.setItem('user', JSON.stringify(user.data))
            // localStorage.removeItem("order") //So user can sign in to place order
            dispatch({ type: SET_USER, payload: user.data })
            history.push("/")
        }catch (e) {
            setValid(false)
            setTimeout(() => {
                setValid(true)
            }, 8000)

            clearTimeout()
            console.log(`${e}`)
        }
    }

    return(
        <div className="formWrapper">
            <h2>User Login Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                       required
                       value={state.email}
                       onChange={(e => setState({...state, email:e.target.value}))}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       required
                       value={state.password}
                       onChange={(e => setState({...state, password:e.target.value}))}
                />

                { !valid && <p className='orderError'> Invalid Credentials </p> }
                { !valid && <br/>}

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UserLogin
