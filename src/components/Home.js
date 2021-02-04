import { useState, useEffect } from "react"
import axios from "axios";
import { API } from "../Constants";
import Kitchen from "./Kitchen/Kitchen";
import "../styles/home.css"

const Home = () => {

    const [ state, setState ] = useState({
        data:[], loaded:false, error:false
    })

    useEffect(() => {
        axios.get(`${API}/`).then(res => {
            setState({ ...state, data: res.data, loaded: true })
            console.log(res.data);
        }).catch(error => {
            console.log(`Axios fetch: ${error}`)
            setState({ ...state, error: true})
            console.log(state.data)
        })
    }, [])

    if(state.error) return <div> Error loading Page </div>
    else if(!state.loaded) return <div><i> Loading . . . </i></div>
    else {
        return(
            <div className="homeWrapper">
                {
                    state.data.map(kit => {
                        return <Kitchen key={kit.id} kitchen={kit}/>
                    })
                }
            </div>
        )
    }

}

export default Home
