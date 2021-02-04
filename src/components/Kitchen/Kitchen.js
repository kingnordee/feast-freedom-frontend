import "../../styles/home.css"

const Kitchen = ({ kitchen }) => {
    const imageUrl = "https://s3.envato.com/files/287767358/Preview%20Image%20Set/01.jpg"
    return(
        <div className="kitchenWrapper">{/*STYLE IN HOME.CSS*/}
            <h3>{kitchen.name}</h3>
            <img style={{height:"200px", width:"200px"}} src={imageUrl} alt="kitchen image"/>
            <button>View Menu</button>
        </div>
    )
}

export default Kitchen
