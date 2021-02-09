import axios from "axios";
import {API} from "../../Constants";
import { useState, useEffect } from "react"
import {useHistory} from "react-router-dom";

const WorkingDay = ({ day }) => {

    const [ state, setState ] = useState({
        _day: day, _from: "", _to:""
    })
    const [dis, setDis] = useState(false)

    const time = ["-- From --", 1,2,3,4,5,6,7,8,9,10,11,12]
    const time2 = ["-- To --", 1,2,3,4,5,6,7,8,9,10,11,12]


    const handleAdd = async (e) => {
        e.preventDefault()
        try{
            const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
            const response = await axios.post(`${API}/add_day/${kitchenId}`, state)
            setDis(true)
        }catch (e) {
            console.log(`Error from WorkingDay.js axios call: ${e}`);
        }
    }

    return(
        <div className="workingDay"> {/*STYLES IN FORMS.CSS*/}
            <p>{day}</p>
            <div className="from">
                <select name="" id="_from"
                        onChange={(e => setState({...state, _from: e.target.value}))}
                >
                    {time.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                </select>
                <select name="" id=""
                        value="am"
                        onChange={(e => setState({...state, _from: state._from.concat(e.target.value)}))}
                >

                    <option value="am">am</option>
                    <option value="pm">pm</option>
                </select>
            </div>

            <div className="to">
                <select name="" id="_to"
                        onChange={(e => setState({...state, _to: e.target.value}))}
                >
                    {time2.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                </select>
                <select name="" id=""
                        onChange={(e => setState({...state, _to: state._to.concat(e.target.value)}))}
                >
                    <option value="am">am</option>
                    <option value="pm">pm</option>
                </select>
            </div>
            <button onClick={handleAdd} disabled={dis}>Add</button>
        </div>
    )
}

export default WorkingDay
