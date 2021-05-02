import React, { useState } from 'react'
import { View, Text ,StyleSheet,Button} from 'react-native'
import Color from '../Color'
import CartItems from './CartItems'

const OrderItem = (props) => {
    const [showDetails,setShowDetails]=useState(false)
    return (
        <View style={styles.screen}>
        <View style={styles.order}>
        <View style={styles.detail}>
        <Text style={styles.amount}>$ {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
        </View>

            <Button onPress={()=>{
                if(showDetails){
                    setShowDetails(false)
                }else{
                    setShowDetails(true)
                }
                }} color={Color.primary} title={showDetails?"Hide deatils":"Show Details"}/>
            
        </View>
        {showDetails && <View>
            {props.item.map(items=>{
                return <CartItems quantity={items.quantity} amount={items.sum} 
                    title={items.productTitle}
                />
            })}
        </View>}
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        width:"100%",
        alignItems:'center'
    },
    order:{
        width:"80%",
        alignItems:'center',
        marginVertical:10,
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.26,
        shadowRadius:5,
        backgroundColor:'white',
        elevation:5,
        padding:10
    },
    detail:{
        width:'100%',
        flexDirection:'row',
        justifyContent:"space-between",
        marginBottom:10,

    },
    date:{
        fontFamily:'sans-open',
        color:'#888',
        fontSize:16
    },
    amount:{
        fontFamily:'sans-bold',
        color:'black',
        fontSize:16
    }
})

export default OrderItem
