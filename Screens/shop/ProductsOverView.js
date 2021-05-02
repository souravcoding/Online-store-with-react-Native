import React, { useEffect, useState } from 'react'
import { View, Text,FlatList,StyleSheet,ActivityIndicator} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../../Color'
import CustomButton from '../../componets/CustomButton'
import Products from '../../componets/Products'
import { addToCart, getProducts } from '../../store/action'

const ProductsOverView = (props) => {
    const dispatch=useDispatch()
    const availableProduct=useSelector(state=>state.product.availableProducts)
    const [isloading,setisloading]=useState(false)
    useEffect(()=>{
        const fetcher=async ()=>{
            setisloading(true)
            await dispatch(getProducts())
            setisloading(false)
        }
      fetcher()
    },[])

    useEffect(()=>{
        props.navigation.addListener('willFocus',()=>{
            const fetcher=async ()=>{
                setisloading(true)
                await dispatch(getProducts())
                setisloading(false)
            }
          fetcher()
        })

    })


    if(isloading){
       return  <View style={styles.screen}>
            <ActivityIndicator size="large" color={Color.primary}/>
        </View>
    }
    return (
        <View>
            <FlatList onRefresh={async ()=>{
                setisloading(true)
                await dispatch(getProducts())
                setisloading(false)
            }} 
            refreshing={isloading}
            data={availableProduct} 
                renderItem={(itemData)=>{
                    return <Products img={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetails={()=>{
                        props.navigation.navigate({routeName:'productDetails',
                        params:{
                            productId:itemData.item.id,
                             productTitle:itemData.item.title
                        }
                        })
                    }} 
                    addCart={()=>{
                        dispatch(addToCart(itemData.item))
                    }} />
                }}
            />
        </View>
    )
}

ProductsOverView.navigationOptions=navigator=>{
   return {headerTitle:"All Products",
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
       <Item title="cart" iconName="md-cart" 
           onPress={()=>{
               navigator.navigation.navigate('cart')
           }}
       />
       </HeaderButtons>
   )
}
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProductsOverView
