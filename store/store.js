import { applyMiddleware, combineReducers, createStore } from "redux";
import { cartReducer } from "./CartReducer";
import { OrderReducer } from "./OrderReducer";
import { productReducer } from "./productReducer";
import thunk from 'redux-thunk'
import { AuthReducer } from "./AuthReducer";
const rootReducer=combineReducers({
    product:productReducer,
    cart:cartReducer,
    order:OrderReducer,
    auth:AuthReducer
})

export const store=createStore(rootReducer,applyMiddleware(thunk))