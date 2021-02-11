import {API, DAYS} from "../../Constants";
import {useState, useEffect} from "react"
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import "../../styles/workingDays.css"

const WorkingDaysForm = () => {
    const history = useHistory()

    const [ state, setState ] = useState({
        "Monday": {_from: "", _to: ""},
        "Tuesday": {_from: "", _to: ""},
        "Wednesday": {_from: "", _to: ""},
        "Thursday": {_from: "", _to: ""},
        "Friday": {_from: "", _to: ""},
        "Saturday": {_from: "", _to: ""},
        "Sunday": {_from: "", _to: ""}
    })

    const _send = []

    const days = DAYS

    useEffect(() => {
        if(!localStorage.getItem("kitchen")) alert("You have to log in to your kitchen first!")
        history.push("/")
    }, [])

    const handleNext = async (e) => {
        e.preventDefault()
        console.log(state)

        for(const [k,v] of Object.entries(state)){
            _send.push({_day: k, ...v})
        }
        
        try{
            const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
            await axios.post(`${API}/add_days/${kitchenId}`, _send)
        }catch (e) {
            console.log(`${e}`)
        }

        history.push("/add_menu_item")
    }

    return(
        <div className="workingDaysForm">
            <h2>Working Days Form</h2>
            {days.map((day, idx) => {
                return <div key={idx} className="workingDaysInner">
                    <h3>{day}</h3>
                    <div className="_from fromTo">
                        <label htmlFor="day">From</label>
                        <input type="text" id="day"
                               value={state[day]._from}
                               onChange={e => setState({
                                   ...state, [day]: {...state[day], _from: e.target.value }
                               })}
                        />
                    </div>
                    <div className="_to fromTo">
                        <label htmlFor="day">To</label>
                        <input type="text" id="day"
                               value={state[day]._to}
                               onChange={e => setState({
                                   ...state, [day]: {...state[day], _to: e.target.value }
                               })}
                        />
                    </div>
                </div>
            })}
            <div className="next">
                <button onClick={handleNext}>Next</button>
            </div>
            <br/>
            <NavLink className="finish" to="/">Finish</NavLink>
        </div>
    )
}

export default WorkingDaysForm
