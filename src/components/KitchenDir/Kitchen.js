import "../../styles/home.css"
import { useHistory} from "react-router-dom";

const Kitchen = ({ kitchen }) => {

    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        localStorage.setItem("kitchen", JSON.stringify(kitchen))
        history.push("/get_menu_items")
    }

    return(
        <div className="kitchenWrapper">{/*STYLE IN HOME.CSS*/}
            <h3>{kitchen.name}</h3>
            <img src={kitchen.image} alt="Kitchen image"/>
            {kitchen.working_days.length > 0 &&
                kitchen.working_days.map(day => {
                    return <p key={day.id}>{`${day.day}: ${day.from} to ${day.to}`}</p>
                })
            }
            <button onClick={handleClick}>View Menu</button>
        </div>
    )
}

export default Kitchen