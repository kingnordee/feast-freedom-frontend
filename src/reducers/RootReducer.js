import { combineReducers } from "redux";
import {KitchenFormReducer} from "./KitchenFormReducer";
import {WorkingDaysFormReducer} from "./WorkingDaysFormReducer";
import {MenuItemFormReducer} from "./MenuItemFormReducer";

export const RootReducer = combineReducers({
    KitchenFormReducer, WorkingDaysFormReducer, MenuItemFormReducer
})
