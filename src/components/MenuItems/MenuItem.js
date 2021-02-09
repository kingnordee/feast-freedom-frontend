
const MenuItem = ({ item }) => {

    const addToOrder = (e) => {
        e.preventDefault()
        if(!localStorage.getItem("order"))
            localStorage.setItem("order", JSON.stringify([]))

        let currentOrder = JSON.parse(localStorage.getItem("order"))
        currentOrder = [...currentOrder, item]
        localStorage.setItem('order', JSON.stringify(currentOrder))
    }

    return(
        <div className="itemWrapper">
            <img src={item.image} alt="Menu item image"/>
            <div className="itemInner">
                <p>{item.name}</p>
                <p>Vegetarian: { item.veg ? "Yes" : "No" }</p>
                <p>Price: ${item.price}</p>
                <button onClick={addToOrder}>+ Add to Cart +</button>
            </div>
        </div>
    )
}

export default MenuItem
