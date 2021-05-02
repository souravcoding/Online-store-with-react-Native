import React from 'react'
import { View, Text,StyleSheet,Image, Button} from 'react-native'
import Color from '../Color'

const Admin = (props) => {
    return (
        <View style={styles.product}>
            <Image style={styles.img} source={{uri:props.img}} />
            <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>$ {props.price}</Text>
            </View>
            <View style={styles.btn_container}>
                <View style={styles.btn}>
                <Button onPress={props.edit} color={Color.primary} title='Edit'/>
                </View>
                <View style={styles.btn}>
                <Button onPress={props.delete} color={Color.primary} title="Delete"/>    
                </View>
               
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    product:{
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
        borderRadius:10,
        height:300,
        overflow:"hidden",
        
        
    },
    img:{
        width:'100%',
        height:'60%'
    },
    details:{
        height:'15%',
        alignItems:'center',
        padding:10
    },
    title:{
        fontSize:18,
        fontFamily:'sans-bold',
    },
    price:{
        fontSize:16,
        color:"#888"
    },
    btn_container:{
        height:"25%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-around"
    },
    btn:{
        width:80
    }
})

export default Admin
