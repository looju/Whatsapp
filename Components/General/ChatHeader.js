import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "./Avatar";
import { useRoute } from "@react-navigation/native";

export const ChatHeader = () => {
  const route = useRoute();
  return (
    <View style={Styles.container}>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View style={Styles.title}>
      <Text>{route.params.user.contactName || route.params.user.displayName}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  title:{
    marginLeft:15,
    alignItems:"center",
    justifyContent:"center"
  }
});
