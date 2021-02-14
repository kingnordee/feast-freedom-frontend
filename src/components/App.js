import { BrowserRouter, Route } from "react-router-dom";
import KitchenRegistration from "./KitchenDir/KitchenRegistration";
import UserRegistration from "./User/UserRegistration";
import NavBar from "./NavBar";
import Home from "./Home";
import '../styles/App.css';
import WorkingDaysForm from "./WorkingDays/WorkingDaysForm";
import GetMenuItems from "./MenuItems/GetMenuItems";
import MenuItemForm from "./MenuItems/MenuItemForm";
import UserLogin from "./User/UserLogin";
import ManageOrders from "./Order/ManageOrders";
import SideOrder from "./Order/SideOrder";
import LoginKitchen from "./KitchenDir/LoginKitchen";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            {/*<div className="components">*/}
                <Route exact path='/' component={Home} />
                <Route exact path='/register_kitchen' component={KitchenRegistration} />
                <Route exact path='/register_user' component={UserRegistration} />
                <Route exact path='/login_user' component={UserLogin} />
                <Route exact path='/add_workingdays' component={WorkingDaysForm} />
                <Route exact path='/add_menu_item' component={MenuItemForm}/>
                <Route exact path='/get_menu_items/:kitchenId' component={GetMenuItems}/>
                <Route exact path='/get_order' component={ManageOrders}/>
                <Route exact path='/cart' component={SideOrder}/>
                <Route exact path='/kitchen_login' component={LoginKitchen}/>
            {/*</div>*/}
        </BrowserRouter>
        <footer><h5>&copy; Adams Daouda <h6> and </h6> King Nordee 2021</h5></footer>
    </div>
  );
}

export default App;

// const order = JSON.parse(localStorage.getItem("order"))
// const kitchenId = JSON.parse(localStorage.getItem("kitchen")).id
// let user = JSON.parse(localStorage.getItem("user"))
// const userId = user.id
//
// let menuItemsIds = []
// for(let item of order){
//     menuItemsIds.push(item.id)
// }
//
// menuItemsIds = menuItemsIds.toString()
//
// console.log(menuItemsIds)
//
// await axios.post(`${API}/place_order`, {
//     kitchenId, userId, menuItemsIds
// })
//
// setOrdered(true)
//
// setTimeout(() => {
//     setOrdered(false)
//     localStorage.removeItem("order");
// }, 5000)
// clearTimeout()


