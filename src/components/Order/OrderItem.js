import "../../styles/menuItems.css"

const OrderItem = ({ item }) => {

    const handleClick = (e) => {
        let loc = JSON.parse(localStorage.getItem("order"))
        const found = loc.findIndex(el => el.name === item.name)
        let removed = loc.splice(found, 1)
        localStorage.setItem("order", JSON.stringify(loc))
    }

    return(
        <div className="OrderItemWrapper">
            <p>
                {item.name} ––> <span>{item.price}</span>
                <span onClick={handleClick}>X</span>
            </p>
        </div>
    )
}

export default OrderItem
