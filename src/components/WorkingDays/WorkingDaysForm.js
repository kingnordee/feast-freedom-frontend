import {DAYS} from "../../Constants";
import {useState, useEffect} from "react"
import {useHistory} from "react-router-dom";
import WorkingDay from "./WorkingDay";

const WorkingDaysForm = () => {
    const history = useHistory()

    const [ state, setState ] = useState({

    })



    const days = DAYS
    const time = [1,2,3,4,5,6,7,8,9,10,11,12]

    useEffect(() => {
        days.map(d => setState({...state, [d]:null}))
    }, [])
    const handleNext = (e) => {
        e.preventDefault()
        history.push("/add_menu_item")
    }

    // return(
    //     <div className="formWrapper">
    //         <h2>Working Days Form</h2>
    //         {days.map(d => <WorkingDay key={d} day={d}/>)}
    //         <div className="prevNextWrapper">
    //             <button onClick={handleNext}>Next</button>
    //         </div>
    //     </div>
    // )

    return(
        <div className="formWrapper workingDaysForm">
            <h2>Working Days Form</h2>
            {/*{days.map(d => setState({...state, [d]:null}))}*/}
            {days.map(d => {
                return <div>
                    <h3>{d}</h3>
                    <label htmlFor="day">From</label>
                    <input type="Number" id="day"/>
                    <button>am</button><button>am</button>
                    <label htmlFor="day">To</label>
                    <input type="Number" id="day"/>
                    <button>am</button><button>am</button>
                </div>
            })}
            <div className="prevNextWrapper">
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default WorkingDaysForm
