import React, { useEffect, useState } from 'react'
import { View, Text ,StyleSheet,FlatList} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../componets/CustomButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import OrderItem from '../../componets/OrderItem'
import { getOrders } from '../../store/action'

const Orders = () => {
    const dispatch=useDispatch()

    useEffect( async ()=>{
      await dispatch(getOrders())
    },[])


    const orders=useSelector(state=>state.order.order)
    return ( <FlatList  data={orders}  renderItem={items=>{
        return <OrderItem amount={items.item.totalAmount} 
        date={items.item.readableDate} item={items.item.items}  />
    }}/>
    )
}


Orders.navigationOptions=navigator=>{
    return {headerTitle:"Your Orders",
    headerLeft:()=>(
     <HeaderButtons HeaderButtonComponent={CustomButton}>
     <Item title="menu" iconName="md-menu" 
         onPress={()=>{
             navigator.navigation.toggleDrawer()
         }}
     />
     </HeaderButtons>
 )
 }
 }

export default Orders
