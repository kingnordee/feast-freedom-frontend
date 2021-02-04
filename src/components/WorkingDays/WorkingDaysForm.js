import axios from "axios";
import {API} from "../../Constants";
import { useState, useEffect } from "react"
import {useHistory} from "react-router-dom";

const WorkingDaysForm = () => {
    const [ state, setState ] = useState({
        name:"", email:"", password:"", image:"", added:false
    })

    const history = useHistory()

    useEffect(() => {

    }, [])

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

                <label htmlFor="image">Image</label>
                <input type="text" id="image"
                       value={state.image}
                       onChange={(e) =>
                           setState({...state, image: e.target.value})}
                />

                {/*<NavLink to="/">*/}
                <button type="submit" value="Submit">Next</button>
                {/*</NavLink>*/}
            </form>
            {/*<button onClick={(event => history.push("/add_workingdays"))}>Go to WDYs</button>*/}
        </div>
    )
}

export default WorkingDaysForm
