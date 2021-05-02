import React from 'react'
import { View, Text} from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
const CustomButton = (props) => {
    return (
        <HeaderButton {...props}  IconComponent={Ionicons} iconSize={23}
        color="white" />
    )
}

export default CustomButton
