import Order from "../models/Order"

const initialState={
    order:[]
}

export const OrderReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "SET_ORDERS":
            return {
                order:action.order
            }
        case "ADD_TO_ORDER":
            const newOrder=new Order(action.orderData.id,action.orderData.item,action.orderData.amount,action.orderData.date)
            return {
                ...state,
                order:state.order.concat(newOrder)
            }
            
    
        default:
            return state
    }
}