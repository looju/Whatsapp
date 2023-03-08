import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../Services/Context/Context";

export const SignIn = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View style={[Styles.container, { backgroundColor: colors.black }]}>
      <Text style={[Styles.text, { color: colors.foreground }]}>Welcome to whatsapp</Text>
      <Image source={require('../assets/welcomeimg.jpg')} style={Styles.image} resizeMode="cover"/>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    marginBottom: 20,
    fontSize: 24,
  },
  image:{
   width:180,
   height:180,
   borderRadius:90
  }
});
