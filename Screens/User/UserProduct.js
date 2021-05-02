import React from 'react'
import { View, Text,FlatList,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../componets/CustomButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Admin from '../../componets/Admin'
import { deleteProduct } from '../../store/action'

const UserProduct = (props) => {
    const handleDelete=(id)=>{
        Alert.alert('Are You Sure?',"Do you really want to delete this item?", [
            {text:"No",style:"default" },
        {text:'Yes',style:'destructive',onPress:()=>dispatch(deleteProduct(id))}])
    }
    const dispatch=useDispatch()
   const userProducts= useSelector(state=>state.product.userProducts)
    return (
        <FlatList  data={userProducts} renderItem={(itemData)=>{
            return <Admin img={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                   delete={()=>handleDelete(itemData.item.id)}
                    edit={()=>props.navigation.navigate('EditItems',{productId:itemData.item.id})}
                   />
        }}/>
    )
}

UserProduct.navigationOptions=navigator=>{
    return {
        headerTitle:"Admin",
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomButton}>
            <Item title="menu" iconName="md-menu" 
                onPress={()=>{
                    navigator.navigation.toggleDrawer()
                }}
            />
            </HeaderButtons>
        ),
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={CustomButton}>
            <Item title="menu" iconName="md-create" 
                onPress={()=>{
                    navigator.navigation.navigate('EditItems')
                }}
            />
            </HeaderButtons>
        )
    }
}

export default UserProduct
