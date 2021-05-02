import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View,TextInput, Text,ScrollView,StyleSheet,Button,ActivityIndicator, Alert } from 'react-native'
import { log, set } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import Color from '../../Color'
import { loginIn,signUser } from '../../store/action'

const LoginScreen = (props) => {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()
    const [signUp,setSignUp]=useState(false)
    const dispatch=useDispatch()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    

    useEffect(()=>{
        if(error){
            return Alert.alert('Error',error,[{
                text:'close', style:"destructive"
            }])
        }
    },[error])
    return (
        <View style={styles.screen}>
        <LinearGradient style={styles.grad}  colors={['pink','lightgrey']}>
        <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.input} keyboardType="email-address"  value={email} onChangeText={(e)=>setEmail(e)} />
        </View>
        <View style={styles.item}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} keyboardType="default" secureTextEntry onChangeText={(e)=>setPassword(e)} />
        </View>
            <View style={styles.btn_container}>
            <Button onPress={()=>{
                if(signUp){
                    setError(null)
                    setLoading(true)
                    dispatch(signUser(email,password)).then((res)=>{
                        setLoading(false)
                    }).catch((err)=>{
                        console.log(err)
                        setError(err.message)
                        setLoading(false)
                    })
                }else{
                    setError(null)
                    setLoading(true)
                    dispatch(loginIn(email,password)).then((res)=>{
                        setLoading(false)
                        props.navigation.navigate('main')
                    }).catch((err)=>{
                        console.log("----------------")
                        console.log(err)
                        setError(err.message)
                        setLoading(false)
                    })
                }
                }} title={signUp?"sign up":"login"} color={Color.primary} />
            </View>
          

           <View style={styles.btn_container}>
           {loading?<ActivityIndicator color='red' size="large" /> : <Button title={signUp?"Switch to Login in":"Switch to sign up" } color={Color.accent} 
           onPress={()=>setSignUp(!signUp)} />
}
            </View>
            
            </View>
        
        </LinearGradient>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    label:{
        fontFamily:'sans-bold',
        fontSize:20,
        textAlign:'center'

    },
    input:{
        borderColor:'black',
        borderBottomWidth:1,
        width:'70%',
        

    },
    item:{
        width:'100%',
        marginBottom:20,
        alignItems:'center'
    },
    container:{
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.26,
        shadowRadius:5,
        backgroundColor:'white',
        elevation:5,
        margin:20,
        width:'90%',
        padding:10,
        alignItems:'center'
    },
    btn_container:{
        marginVertical:5,
        width:150,
        
    },
    grad:{
        width:'100%',
        height:'100%',
        justifyContent:'center'
    }

})

export default LoginScreen
