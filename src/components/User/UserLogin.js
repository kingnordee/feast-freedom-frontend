import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import {API} from "../../Constants";

const UserLogin = () => {

    const history = useHistory()

    const [ state, setState ] = useState({
        email:"", password:""
    })

    const [reload, setReload] = useState(false)

    useEffect(() => {

    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = await axios.post(`${API}/user_login`, state)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.removeItem("order")
        }catch (e) {
            console.log(`${e}`)
        }
        history.push("/")
    }

    return(
        <div className="formWrapper">
            <h2>User Login Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                       required={true}
                       value={state.email}
                       onChange={(e => setState({...state, email:e.target.value}))}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       required={true}
                       value={state.password}
                       onChange={(e => setState({...state, password:e.target.value}))}
                />

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UserLogin
