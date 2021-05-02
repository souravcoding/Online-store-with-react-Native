import React, { useEffect } from 'react'
import { View, Text,StyleSheet,ActivityIndicator,AsyncStorage} from 'react-native'
import { useDispatch } from 'react-redux'
import Color from '../Color'
import { auth } from '../store/action'

const StartScreen = (props) => {

    const dispatch=useDispatch()
    useEffect(()=>{
        const login=async ()=>{
            const userData=await AsyncStorage.getItem('userData')
            if(!userData){
                props.navigation.navigate('Authentication')
                return;
            }
            
            const transformData=JSON.parse(userData)
            const {token,userId,expireTime}=transformData 
            const time=new Date(expireTime)
            if(time<=new Date() || !token || !userId){
                props.navigation.navigate('Authentication')
                return ;
            }
            props.navigation.navigate('main')
            dispatch(auth(token,userId))
        }   
        login()
    })


    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Color.primary} />
        </View>
    )
}


const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})

export default StartScreen
