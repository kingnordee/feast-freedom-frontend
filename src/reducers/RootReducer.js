import { combineReducers } from "redux";
import {DAYSO} from "../Constants";
export const KITCHEN_FORM = "kitchenForm"
export const WORKING_DAYS_FORM = "workingDaysForm"
export const MENU_ITEM_FORM = "menuItemForm"
export const SET_CURRENT = "current"


const initialState = {
    kitchenData: null, workingDaysData: DAYSO,
    menuItemData: null,
    current: KITCHEN_FORM
}

export const AllReducers = (state = initialState, action) => {
    switch(action.type){
        case KITCHEN_FORM:
            return { ...state, kitchenData: action.payload}
        case WORKING_DAYS_FORM:
            return { ...state, workingDaysData: {...state.workingDaysData,
                    [action.payload._day]: action.payload.val }
            }
        case MENU_ITEM_FORM:
            return { ...state, menuItemData:  action.payload}
        case SET_CURRENT:
            return { ...state, current: action.payload }
        default:
            return state
    }
}


export const RootReducer = combineReducers({
    AllReducers
})
