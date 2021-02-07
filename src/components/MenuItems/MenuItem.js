import "../../styles/menuItems.css"

const MenuItem = ({ item }) => {

    const addToOrder = (e) => {
        console.log("Added to order")
    }

    return(
        <div className="itemWrapper">
            <img src={item.image} alt="Menu item image"/>
            <div>
                <p>{item.name}</p>
                <p>Vegetarian: { item.veg ? "Yes" : "No" }</p>
                <p>Price: ${item.price}</p>
                <button onClick={addToOrder}>Add to order</button>
            </div>
        </div>
    )
}

export default MenuItem
