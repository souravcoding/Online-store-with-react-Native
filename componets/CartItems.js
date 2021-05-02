import React from 'react'
import { View, Text,StyleSheet, Touchable } from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Color from '../Color'
const CartItems = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.number}>
                <Text style={styles.quant}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.remove}>
                <Text style={styles.amount}>$ {props.amount.toFixed(2)}</Text>
               {props.deletable && <TouchableOpacity onPress={props.removeItem}>
                <Ionicons name="md-trash" color="red" size={23} />
                </TouchableOpacity>}
                
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    item:{
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        alignItems:'center'
    },
    number:{
        width:"50%",
        flexDirection:'row',
        alignItems:'center'
    },
    remove:{
        flexDirection:"row",
        alignItems:'center'
    },
    quant:{
        color:"#888",
        fontSize:18,
        marginRight:5,
        fontFamily:'sans-bold'
    },
    title:{
        color:Color.primary,
        fontSize:18,
        marginRight:5,
        fontFamily:'sans-bold'
    },
    amount:{
        color:"black",
        fontSize:18,
        marginRight:5
    }
})

export default CartItems
