import React from 'react'
import { View, Text,Image,StyleSheet,Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../../Color'
import { addToCart } from '../../store/action'


const ProductDetails = (props) => {
    const dispatch=useDispatch()
    const itemId=props.navigation.getParam('productId')
    const item=useSelector(state=>state.product.availableProducts.find((item)=>item.id==itemId))
    return (
        <View style={styles.details}>
            <Image style={styles.img} source={{uri:item.imageUrl}} /> 
           <Button onPress={()=>dispatch(addToCart(item))} color={Color.primary}  title="Add To Cart"/>
           <Text style={styles.price}>$ {item.price}</Text>
           <Text style={styles.des}>{item.description}</Text>
        </View>
    )
}

ProductDetails.navigationOptions=(navigator)=>{
    const title=navigator.navigation.getParam('productTitle')
    return {
        headerTitle:title
    }
    }

const styles=StyleSheet.create({
    img:{
        width:'100%',
        height:250,
        marginBottom:10
    },
    details:{
        alignItems:'center',
    },
    price:{
        fontSize:18,
        color:"#888",
        marginVertical:10
    },
    des:{
        fontSize:18,
        fontFamily:'sans-bold',
        marginHorizontal:5,
        textAlign:'center'
    }
})

export default ProductDetails
