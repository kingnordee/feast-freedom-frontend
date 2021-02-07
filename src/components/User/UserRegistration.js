import { useState, useEffect} from "react"
import "../../styles/forms.css"

const UserRegistration = () => {
    const [ state, setState ] = useState({

    })

    useEffect(() => {

    }, [])

    return(
        <div className="formWrapper">
            <h2>User Registration Form</h2>
            <form>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname"/>
                <label htmlFor="fname">Last Name</label>
                <input type="text" id="lname"/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
                <label htmlFor="image">Image</label>
                <input type="text" id="image"/>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}

export default UserRegistration
