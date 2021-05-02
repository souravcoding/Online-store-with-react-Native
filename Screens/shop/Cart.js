import React, { useState } from 'react'
import { View,Text,StyleSheet,Button,FlatList,ActivityIndicator} from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Color from '../../Color'
import CartItems from '../../componets/CartItems'
import { addToOrder, emptyCart, removeFromCart } from '../../store/action'



const Cart = () => {
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const totalAmount=useSelector(state=>state.cart.totalAmount)
    const cartItems=useSelector(state=>{
        const transformedItems=[];
        for(const key in state.cart.items){
            transformedItems.push({
                productId:key,
                productTitle:state.cart.items[key].pTitle,
                productPrice:state.cart.items[key].pPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,
            })  
        }
        return transformedItems;
    })


    const buttonHandler=async ()=>{
        setLoading(true)
        dispatch(addToOrder(cartItems,totalAmount)).then((res)=>setLoading(false))
       dispatch(emptyCart())}

       
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
            <View style={styles.total}>
            <Text style={styles.total_text} >Total </Text>
            <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
            </View>
            {loading ? <ActivityIndicator size="large" color={Color.primary} /> : <Button color={Color.accent} title="Order Now" disabled={cartItems.length===0} 
                onPress={buttonHandler}
            />}
            
            </View>
            <FlatList data={cartItems} keyExtractor={item=>item.productId} renderItem={(items)=>{
                return <CartItems deletable title={items.item.productTitle} 
                    quantity={items.item.quantity} amount={items.item.sum}
                    removeItem={()=>dispatch(removeFromCart(items.item.productId))}
                />
            }} />
        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.26,
        shadowRadius:5,
        backgroundColor:'white',
        elevation:5,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        padding:10
    },
    total:{
        flexDirection:'row'
    },
    total_text:{
        fontSize:20,
        fontFamily:'sans-bold'
    },
    amount:{
        fontSize:20,
        fontFamily:'sans-bold',
        color:Color.primary
    }
})

export default Cart
