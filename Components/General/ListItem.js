import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export const ListItem = ({style}) => {
  return (
    <TouchableOpacity style={[Styles.container,{...style}]}>
      <Text>ListItem</Text>
    </TouchableOpacity>
  )
}

const Styles=StyleSheet.create({
    container:{
        height:80
    }
})