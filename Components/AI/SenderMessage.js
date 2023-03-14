import { View, Text, StyleSheet } from "react-native";
import React from "react";

export const SenderMessage = ({ key, message }) => {
  return (
    <View style={Styles.messageView}>
      <Text style={Styles.text}>{message.message}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageView: {
    backgroundColor: "purple",
    borderTopEndRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 2,
    marginHorizontal: 4,
    alignSelf: "flex-start",
    marginLeft:"auto"
  },
  text:{
    color: "#fff"
  }
});
