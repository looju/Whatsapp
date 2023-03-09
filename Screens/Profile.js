import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Constants from "expo-constants";
import { GlobalContext } from "../Services/Context/Context";

export const Profile = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: colors.black,
          paddingTop: Constants.statusBarHeight + 20,
        },
      ]}
    >
      <Text style={{ fontSize: 22, color: colors.foreground }}>Profile</Text>
      <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
        Please provide a display name and an optional profile photo
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 22,
  },
});
