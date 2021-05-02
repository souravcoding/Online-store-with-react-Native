import React from 'react'
import {View,Button,SafeAreaView} from 'react-native'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Color from "../Color";
import Cart from "../Screens/shop/Cart";
import Orders from "../Screens/shop/Orders";
import ProductDetails from "../Screens/shop/ProductDetails";
import ProductsOverView from "../Screens/shop/ProductsOverView";
import {Ionicons} from '@expo/vector-icons'
import UserProduct from '../Screens/User/UserProduct';
import EditProduct from '../Screens/User/EditProduct';
import LoginScreen from '../Screens/User/LoginScreen';
import StartScreen from '../Screens/StartScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/action';

const productNavigate=createStackNavigator({
    productOverView: ProductsOverView,
    productDetails:ProductDetails,
    cart:Cart
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Color.primary
        },
        headerTintColor:'white'
    }
})

const orderNavigator=createStackNavigator({
    order:Orders
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Color.primary
        },
        headerTintColor:'white'
    }
})

const adminNavigator=createStackNavigator({
    adminNavigation:UserProduct,
    EditItems:EditProduct
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Color.primary
        },
        headerTintColor:'white'
    }
})

const shopNavigator=createDrawerNavigator({
    Products:productNavigate,
    Orders:orderNavigator,
    Admin:adminNavigator
},{
    contentOptions:{
        activeTintColor:Color.primary
    },
    contentComponent:props=>{
        const dispatch=useDispatch()
        return <View style={{paddingTop:20}}>
        <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
        <DrawerNavigatorItems {...props}/>
            <Button title="Logout" onPress={()=>{
                dispatch(logout())
                props.navigation.navigate('Authentication')
            }} />
        </SafeAreaView>
        </View>
        
    }
})

const loginNavigator=createStackNavigator({
    Authenticate:LoginScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Color.primary
        },
        headerTintColor:'white'
    }
})

const mainNavigator=createSwitchNavigator({
    start:StartScreen,
    Authentication:loginNavigator,
    main:shopNavigator

})

export const ProductNavigation= createAppContainer(mainNavigator)