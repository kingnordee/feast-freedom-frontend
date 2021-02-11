import { useHistory} from "react-router-dom";

const Kitchen = ({ kitchen }) => {

    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        const savedKitchen = JSON.parse(localStorage.getItem('kitchen')) ?
            JSON.parse(localStorage.getItem('kitchen')) : null

        if(savedKitchen && savedKitchen.id !== kitchen.id){
            const myMsg = "Switching kitchens will clear your cart, " +
                "are you sure you want to continue?"
            if(!window.confirm(myMsg)) return
            else localStorage.removeItem("order")
        }

        localStorage.setItem("kitchen", JSON.stringify(kitchen))
        history.push("/get_menu_items")
    }

    return(
        <div className="kitchenWrapper">{/*STYLE IN KITCHEN.CSS*/}
            <h2>{kitchen.name}</h2>
            <img src={kitchen.image} alt="Kitchen image"/>
            {kitchen.working_days.length > 0 &&
                kitchen.working_days.map(day => {
                    return <p key={day.id}>{`${day.day}: ${day.from} – ${day.to}`}</p>
                })
            }
            <button onClick={handleClick}>View Menu</button>
        </div>
    )
}

export default Kitchen
