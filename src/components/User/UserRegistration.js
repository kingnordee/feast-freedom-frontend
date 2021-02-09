import { useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import axios from "axios";
import {API} from "../../Constants";

const UserRegistration = () => {

    const history = useHistory()

    const [ state, setState ] = useState({
        fname:"", lname:"", email:"",
        password:"", image:"", phone:""
    })

    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = await axios.post(`${API}/user_signup`, state)
            localStorage.setItem('user', JSON.stringify(user))
        }catch (e) {
            console.log(`${e}`)
        }
        history.push("/")
    }

    return(
        <div className="formWrapper">
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname"
                       required={true}
                       value={state.fname}
                       onChange={(e => setState({...state, fname:e.target.value}))}
                />

                <label htmlFor="fname">Last Name</label>
                <input type="text" id="lname"
                       value={state.lname}
                       onChange={(e => setState({...state, lname:e.target.value}))}
                />

                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                       value={state.email}
                       onChange={(e => setState({...state, email:e.target.value}))}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                       value={state.password}
                       onChange={(e => setState({...state, password:e.target.value}))}
                />

                <label htmlFor="phone">Phone Number</label>
                <input type="Number" id="phone"
                       value={state.phone}
                       onChange={(e => setState({...state, phone:e.target.value}))}
                />

                <label htmlFor="image">Image URL</label>
                <input type="text" id="image"
                       value={state.image}
                       onChange={(e => setState({...state, image:e.target.value}))}
                />

                <button type="submit" value="submit" onClick={handleSubmit}> Submit </button>
            </form>
        </div>
    )
}

export default UserRegistration
