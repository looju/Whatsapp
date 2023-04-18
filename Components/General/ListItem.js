import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "./../../Services/Context/Context";

export const ListItem = ({ type, description, user, room, image, style }) => {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={[Styles.container, { ...style }]}
      onPress={() =>
        navigation.navigate("chat", {
          user: user,
          room: room,
          image: image,
        })
      }
    >
      <Text>ListItem</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 80,
  },
});
