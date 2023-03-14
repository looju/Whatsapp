import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export const ReceiverMessage = ({ key, message }) => {
  return (
    <View style={Styles.messageView}>
      <Image style={Styles.image} source={{ uri: message.photoURL }} />
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
    marginLeft: "auto",
  },
  text: {
    color: "#fff",
  },
  image: {
    height: 12,
    width: 12,
    position: "absolute",
    borderRadius: 6,
    borderWidth: 1,
    left: 14,
  },
});
