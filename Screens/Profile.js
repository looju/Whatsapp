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
          paddingTop: Constants.statusBarHeight+20,
          padding:20
        },
      ]}
    >
      <Text style={{color:colors.white}}>Profile</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
