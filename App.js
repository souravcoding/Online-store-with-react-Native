import React, { useState } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { ProductNavigation } from './navigator/ProductNavigation'
import { store } from './store/store'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'


const fontFetcher=()=>{
  return Font.loadAsync({
    'sans-open':require('./assets/Fonts/OpenSans-Regular.ttf'),
    'sans-bold':require("./assets/Fonts/OpenSans-Bold.ttf")
  })
}

const App = () => {

  const [loading,setLoading]=useState(true)

  if(loading){
    return <AppLoading startAsync={fontFetcher} onFinish={()=>setLoading(false)} 
    onError={(err)=>console.log(err)} />
  }
  return (
    <Provider store={store}>
    <ProductNavigation/>
    </Provider>
  )
}

const styles=StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default App
