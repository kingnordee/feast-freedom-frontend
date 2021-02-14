import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import {SET_KITCHEN} from "../../reducers/RootReducer";

const Kitchen = ({ kitchen }) => {


    const history = useHistory()
    const dispatch = useDispatch()
    // const [ kitchen, dispatch ] = useReducer(useReducer, useReducer.user)

    const handleClick = (e) => {
        e.preventDefault()

        // if(savedKitchen && savedKitchen.id !== kitchen.id){
        //     const myMsg = "Switching kitchens will clear your cart, " +
        //         "are you sure you want to continue?"
        //     if(!window.confirm(myMsg)) return
        //     else localStorage.removeItem("order")
        // }

        dispatch({type:SET_KITCHEN, payload: kitchen})
        history.push(`/get_menu_items/${kitchen.id}`)
    }

    return(
        <div className="kitchenWrapper">{/*STYLE IN KITCHEN.CSS*/}
            <h2>{kitchen.name}</h2>
            <img src={kitchen.image} alt="Kitchen image"/>
            {kitchen.working_days.length > 0 &&
                <div className="workdays" >
                    {
                        kitchen.working_days.map(day => {
                            // return <p key={day.id}>{`${day.day}: ${day.from} – ${day.to}`}</p>
                            return <p key={day.id}>
                                <span>{day.day}:</span>
                                <span>{day.from}</span>
                                { day.from.trim().length > 1 && day.to.trim().length > 1 &&
                                    <span>{`<–>`}</span>}
                                <span>{day.to}</span>
                            </p>
                        })
                    }
                </div>

            }
            <button onClick={handleClick}>View Menu</button>
        </div>
    )
}

export default Kitchen
