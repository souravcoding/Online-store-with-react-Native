import React, { useCallback, useEffect, useState,useReducer } from 'react'
import { View, Text,TextInput,StyleSheet, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../componets/CustomButton'
import { addProduct, updateProduct } from '../../store/action'

const formReducer=(state,action)=>{
    if(action.type==="UPDATE"){
        const updatedInput={...state.inputValue,[action.input]:action.value}
        const updatedValid={...state.inputValid,[action.input]:action.valid}
        
        let formIsValid=true
        for (const key in updatedValid){
            formIsValid=formIsValid && updatedValid[key]
        }

        return {
            formValid:formIsValid, 
            inputValue:updatedInput,
            inputValid:updatedValid,

            
        }
    }
    return state
}


const EditProduct = (props) => {


    const dispatch=useDispatch()

    const productId=props.navigation.getParam('productId')
    
    const product=useSelector(state=>state.product.userProducts.find((item)=>item.id===productId))

    
    const [formState,formDispatch]=useReducer(formReducer,{
        inputValue:{
            title:product?product.title:'',
            imageUrl:product?product.imageUrl:'',
            price:product?product.price:'',
            desc:product?product.description:''
      },
      inputValid:{
        title:product?true:false,
        imageUrl:product?true:false,
        price:product?true:false,
        desc:product?true:false
      },
      formValid:product?true:false
    })

    const submitHandler=useCallback(()=>{
        if(!formState.formValid){
            Alert.alert('Error',"please Fill all the Fields",[{
                text:'close',style:"destructive"
            }])
            return;
        }
        if(product){
            dispatch(updateProduct(productId,formState.inputValue.title,formState.inputValue.desc,formState.inputValue.imageUrl))
            props.navigation.navigate("adminNavigation")
        }else{
            dispatch(addProduct(formState.inputValue.title,formState.inputValue.desc,formState.inputValue.imageUrl,+formState.inputValue.price))
            props.navigation.navigate("adminNavigation")
        }
    },[dispatch,formState])

    useEffect(()=>{
        props.navigation.setParams({handler:submitHandler})
    },[submitHandler])
    
    const titleHandler=(text,inputTitle)=>{
        let isValid=false
        if(text.trim().length>0){
           isValid=true
        }
        formDispatch({
            type:'UPDATE',
            value:text,
            input:inputTitle,
            valid:isValid
        })
        
    }
    return (
        <View style={styles.screen}>
          <View style={styles.item}>
          <Text  style={styles.label}>Title</Text>
            <TextInput  autoCapitalize="words" 
            autoCorrect value={formState.inputValue.title}
             onChangeText={(e)=>titleHandler(e,'title')} 
             style={styles.input} />
            {!formState.inputValue.title && <Text>Please enter valid text</Text>}
          </View>
            <View style={styles.item}>
            <Text style={styles.label}>ImageUrl</Text>
                <TextInput value={formState.inputValue.imageUrl} onChangeText={(e)=>titleHandler(e,'imageUrl')} style={styles.input} />
            </View>
            
            {!product && <View style={styles.item}>
            <Text style={styles.label}>Price</Text>
            <TextInput keyboardType="decimal-pad" value={formState.inputValue.price} onChangeText={(e)=>titleHandler(e,'price')} style={styles.input} />
            </View>}
          
            <View style={styles.item}>
            <Text style={styles.label}>Description</Text>
            <TextInput value={formState.inputValue.desc} onChangeText={(e)=>titleHandler(e,'desc')} style={styles.input} />
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        margin:20
    },
    label:{
        fontFamily:'sans-bold',
        fontSize:18,

    },
    input:{
        borderColor:'black',
        borderBottomWidth:1,

    },
    item:{
        marginBottom:20
    }

})

EditProduct.navigationOptions=navigator=>{
    const productId=navigator.navigation.getParam('productId')
    const handle=navigator.navigation.getParam('handler')
    return {
        headerTitle:productId ? 'Edit Product' : "Add Product",
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={CustomButton}>
            <Item title="check"  iconName="md-checkmark" 
                onPress={handle}
            />
            </HeaderButtons>
        )
    }
}

export default EditProduct


