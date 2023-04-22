//@refresh reset
import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { auth } from '../../Config/Firebase';

export const ChatRoom = () => {
  const route=useRoute()
  const {currentUser}=auth
  const room=route.params.room
  const selectedImage=route.params.image
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}

