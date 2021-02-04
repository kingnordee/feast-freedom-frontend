import { BrowserRouter, Route } from "react-router-dom";
import KitchenRegistration from "./Kitchen/KitchenRegistration";
import UserRegistration from "./User/UserRegistration";
import NavBar from "./NavBar";
import Home from "./Home";
import '../styles/App.css';
import WorkingDaysForm from "./WorkingDays/WorkingDaysForm";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            <div className="comps">
                <Route exact path='/' component={Home} />
                <Route exact path='/register_kitchen' component={KitchenRegistration} />
                <Route exact path='/register_user' component={UserRegistration} />
                <Route exact path='/add_workingdays' component={WorkingDaysForm} />
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
