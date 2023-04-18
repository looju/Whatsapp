import { View, Text } from 'react-native'
import React from 'react'
import { UseContacts } from '../../Hooks/UseHooks'


export const Contacts = () => {
const contact=UseContacts()

  return (
    <View>
      <Text>Contacts</Text>
    </View>
  )
}

