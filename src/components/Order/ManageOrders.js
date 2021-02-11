import { useState, useEffect } from "react"
import axios from "axios";
import {API} from "../../Constants";

const ManageOrders = () => {

    const [state, setState] = useState({
        order: [], loaded: false, error: false
    })

    useEffect(() => {
        axios.get(`${API}/get_order/${JSON.parse(localStorage.getItem("user")).id}`)
            .then(response => {
                console.log(response.data)
            }).catch(e => {
                console.log(`${e}`)
        })
    })

    return(
        <div>
            ManageOrders
        </div>
    )
}

export default ManageOrders
