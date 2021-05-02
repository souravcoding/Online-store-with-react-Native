import { log } from "react-native-reanimated";
import Cart from "../models/Cart";

const initialState = {
    items: {},
    totalAmount: 0
  };

export const cartReducer=(state=initialState,action)=>{
   
    switch (action.type) {
        case "ADD_TO_CART":
            const addedItem=action.product
            const prodPrice=addedItem.price
            const prodTitle=addedItem.title
            let NewOrUpdatedItem;

            if(state.items[addedItem.id]){
                NewOrUpdatedItem=new Cart(
                    state.items[addedItem.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedItem.id].sum+prodPrice
                )
            }else{
                NewOrUpdatedItem=new Cart(1,prodPrice,prodTitle,prodPrice)
            }
            console.log(state)
            return {
                ...state,
                items:{...state.items,[addedItem.id]:NewOrUpdatedItem},
                totalAmount:state.totalAmount+prodPrice
            }
        case "REMOVE_FROM_CART":
            const id=action.pId
            
            let updatedCart;
            if(state.items[id].quantity>1){
              const  UpdatedItem=new Cart(
                    state.items[id].quantity-1,
                    state.items[id].pPrice,
                    state.items[id].pTitle,
                    state.items[id].sum-state.items[id].pPrice
                )
                updatedCart={...state.items,[id]:UpdatedItem}
            }else{
                 updatedCart={...state.items}
                delete updatedCart[id]
            }
            return {
                ...state,
                items:updatedCart,
                totalAmount:state.totalAmount-state.items[id].pPrice
            }
        
        case "EMPTY_CART":
            return initialState
        case "DELETE_PRODUCT":
            if(state.items[action.pId]){
                const amount=state.items[action.pId].sum

                const updatedItem={...state.items}
                delete updatedItem[action.pId]
                return {
                    ...state,
                    items:updatedItem,
                    totalAmount:state.totalAmount-amount
                }
            }else{
                return state;
            }
            
        default:
            return state
    }
}