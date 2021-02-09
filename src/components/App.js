import { BrowserRouter, Route } from "react-router-dom";
import KitchenRegistration from "./KitchenDir/KitchenRegistration";
import UserRegistration from "./User/UserRegistration";
import NavBar from "./NavBar";
import Home from "./Home";
import '../styles/App.css';
import WorkingDaysForm from "./WorkingDays/WorkingDaysForm";
import PostMenuItemsForm from "./MenuItems/PostMenuItemsForm";
import GetMenuItems from "./MenuItems/GetMenuItems";
import MenuItemForm from "./MenuItems/MenuItemForm";
import UserLogin from "./User/UserLogin";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            <div className="components">
                <Route exact path='/' component={Home} />
                <Route exact path='/register_kitchen' component={KitchenRegistration} />
                <Route exact path='/register_user' component={UserRegistration} />
                <Route exact path='/login_user' component={UserLogin} />
                <Route exact path='/add_workingdays' component={WorkingDaysForm} />
                <Route exact path='/add_menu_item' component={MenuItemForm}/>
                <Route exact path='/get_menu_items' component={GetMenuItems}/>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
