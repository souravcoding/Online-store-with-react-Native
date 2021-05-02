import Product from "../models/product"
import Order from "../models/Order"
import { View, Text,StyleSheet,ActivityIndicator,AsyncStorage} from 'react-native'

export const addToCart=product=>{
    return {
        type:"ADD_TO_CART",
        product:product
    }
}

export const removeFromCart=id=>{
    return {
        type:'REMOVE_FROM_CART',
        pId:id
    }
}

export const addToOrder=(cartItems,totalAmount)=>{
    return async (dispatch,getData)=>{
        const userId=getData().auth.userId
        const token=getData().auth.token
        console.log('====================================');
        console.log(userId);
        console.log('====================================');
        const date=new Date()
        const response= await fetch(`https://reactnative-ce2c4-default-rtdb.firebaseio.com/order/${userId}.json?auth=${token}`,{
              method:'POST',
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({

                  cartItems,
                  totalAmount,
                  date:date.toISOString()
              })
          })
          const data= await response.json()
  
    dispatch({
        type:'ADD_TO_ORDER',
        orderData:{id:data.name,item:cartItems,amount:totalAmount,date:date.toISOString()}
    })
}
}
export const emptyCart=()=>{
    return {
        type:'EMPTY_CART'
    }
}

export const getOrders=()=>{
    return async (dispatch,getData)=>{
        const userId=getData().auth.userId
        const token=getData().auth.token
      const response = await fetch(`https://reactnative-ce2c4-default-rtdb.firebaseio.com/order/${userId}.json?auth=${token}`)
      const data=await response.json()
   let Orders=[]
      for(const key in data){
       Orders.push(new Order(key,data[key].cartItems,data[key].totalAmount,new Date(data[key].date)) )
   }
    dispatch({type:'SET_ORDERS',order:Orders})
}

}



export const addProduct=(title,description,imageUrl,price)=>{
    return async (dispatch,getData)=>{
        const userId=getData().auth.userId
        const token=getData().auth.token
      const response= await fetch(`https://reactnative-ce2c4-default-rtdb.firebaseio.com/product.json?auth=${token}`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId:userId
            })
        })

        const data= await response.json()
        console.log(data);
        dispatch({
            type:'ADD_PRODUCT',
            productData:{
                id:data.name,
                title,
                description,
                imageUrl,
                price,
                ownerId:userId
            }
        })
    }
    
}

export const getProducts=()=>{
    return async (dispatch,getData)=>{
      const response = await fetch("https://reactnative-ce2c4-default-rtdb.firebaseio.com/product.json")
      const data=await response.json()
      const userId=getData().auth.userId
   console.log(data);
   let Products=[]
      for(const key in data){
       Products.push(new Product(key,data[key].ownerId,
       data[key].title,
       data[key].imageUrl,
       data[key].description,
       data[key].price))
   }
    dispatch({type:'GET_PRODUCT',product:Products,userProd:Products.filter((user)=>user.ownerId===userId)})
}

}

export const updateProduct=(id,title,description,imageUrl)=>{
    return async (dispatch,getstate)=>{
        const token=getstate().auth.token
        const response= await fetch(`https://reactnative-ce2c4-default-rtdb.firebaseio.com/product/${id}.json?auth=${token}`,{
              method:'PATCH',
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  title,
                  description,
                  imageUrl,
              })
          })
       
    dispatch({
        type:'UPDATE_PRODUCT',
        pId:id,
        productData:{
            title,
            description,
            imageUrl
        }
    })
}
}



export const deleteProduct=(id)=>{

    return async (dispatch,getstate)=>{
        const token=getstate().auth.token
         await fetch(`https://reactnative-ce2c4-default-rtdb.firebaseio.com/product/${id}.json?auth=${token}`,{
              method:'DELETE',
          })
    dispatch({
        type:'DELETE_PRODUCT',
        pId:id
    })
}
}

export const signUser=(email,password)=>{
    return async (dispatch)=>{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA5-qQ1qp5g_YGP9pMoAo58O8Q7rH8t70',{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
          })
      })
      const data=await response.json()
      console.log(data);
      dispatch({
          type:"SIGNUP",
          token:data.idToken,
          id:data.localId
      })
      const expireTime=new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString()
      saveData(data.idToken,data.localId,expireTime)

    }
}



export const loginIn=(email,password)=>{
    return async (dispatch)=>{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA5-qQ1qp5g_YGP9pMoAo58O8Q7rH8t70',{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
          })
      })

      if(!response.ok){
        const data=await response.json()
          console.log('====================================');
          console.log(data.error.message);
          console.log('====================================');

          let message=data.error.message
          
          throw new Error(message)
      }


      const data=await response.json()
      console.log(data);
      dispatch({  
          type:"LOGIN",
          token:data.idToken,
          id:data.localId
      })
      const expireTime=new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000)
      saveData(data.idToken,data.localId,expireTime)

    }
}


const saveData=(token,userId,expireTime)=>{
    AsyncStorage.setItem("userData",JSON.stringify({
        token:token,
        userId:userId,
        expireTime:expireTime.toISOString()
    }))
}


export const auth=(token,userId)=>{
    return {
        type:"AUTH",
        userId:userId,  
        token:token
    }
}

export const logout=()=>{
    AsyncStorage.removeItem('userData')
    return {
        type:'LOGOUT'
    }
}