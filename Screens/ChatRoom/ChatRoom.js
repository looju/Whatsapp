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
  const userB=route.params.user

  const senderUser=currentUser.photoURL?{name:currentUser.displayName, _id:currentUser.uid, avatar:currentUser.photoURL}
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}

