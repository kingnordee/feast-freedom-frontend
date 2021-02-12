import { combineReducers } from "redux";
export const SET_USER = 'SET_USER'
export const SET_ORDER = 'SET_ORDER'
export const ROUTED = 'ROUTED'
export const DELETED = 'DELETED'


const userState = {
    user: localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user")) : null
}

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case SET_USER: return { ...state, user: action.payload }
        default: return state
    }
}

const orderState = {
    order: localStorage.getItem("order") ?
        JSON.parse(localStorage.getItem("order")) : null,
    deleted: false
}

const orderReducer = (state = orderState, action) => {
    switch (action.type) {
        case SET_ORDER: return { ...state, order: action.payload }
        case DELETED: return { ...state, deleted: action.payload }
        default: return state
    }
}

export const RootReducer = combineReducers({
    userReducer, orderReducer
})
