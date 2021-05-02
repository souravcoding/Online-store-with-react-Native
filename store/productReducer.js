import PRODUCTS from "../data/dummy-data";
import Product from "../models/product";



initialState={
    availableProducts:[],
    userProducts:[]
}

export const productReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "GET_PRODUCT":
            return {
                availableProducts:action.product,
                userProducts:action.userProd
            }
        case "DELETE_PRODUCT":
            return {
                ...state,
                availableProducts:state.availableProducts.filter(item=>item.id!==action.pId),
                userProducts:state.userProducts.filter(item=>item.id!==action.pId)
            }
            
        case "ADD_PRODUCT":
            const newProduct=new Product(action.productData.id,
            action.productData.ownerId,
            action.productData.title,
            action.productData.imageUrl,
            action.productData.description,
            action.productData.price)
            return {
                ...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct)
            }

        case "UPDATE_PRODUCT":
            const productIndex=state.userProducts.findIndex((item)=>item.id===action.pId)
            const updatedProduct=new Product(action.pId,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price)
            const updatedUserProduct=[...state.userProducts]
            updatedUserProduct[productIndex]=updatedProduct

            const itemIndex=state.availableProducts.findIndex((item)=>item.id===action.pId)
            const updatedAvailableProducts=[...state.availableProducts]
            updatedAvailableProducts[itemIndex]=updatedProduct

           
            
            return {
                ...state,
                availableProducts:updatedAvailableProducts,
                userProducts:updatedUserProduct
            }
        default:
            return state
    }
    
}