import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { GlobalContext } from "../Services/Context/Context";

export const SignIn = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View style={[Styles.container, { backgroundColor: colors.black }]}>
      <Text style={[Styles.text, { color: colors.foreground }]}>
        Welcome to whatsapp
      </Text>
      <Image
        source={require("../assets/welcomeimg.jpg")}
        style={Styles.image}
        resizeMode="cover"
      />
      <View style={Styles.inputView}>
        <TextInput
          style={[
            Styles.inputemail,
            { borderBottomColor: colors.primary, color: colors.white },
          ]}
          placeholder="Email"
          autoComplete="email"
          placeholderTextColor={colors.iconGray}
          textAlign="center"
          keyboardType="email-address"
        />
        <TextInput
          style={[
            Styles.inputpassword,
            { borderBottomColor: colors.primary, color: colors.white },
          ]}
          placeholder="Password"
          autoComplete="password"
          placeholderTextColor={colors.iconGray}
          textAlign="center"
          secureTextEntry
          blurOnSubmit
          keyboardType="default"
        />
      </View>
      <View style={Styles.buttonView}>
        <Button
          accessibilityLabel="Sign Up"
          dark={true}
          mode="contained"
          buttonColor={colors.secondary}
          textColor={colors.white}
        >
          SIGN UP
        </Button>
      </View>
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
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  inputView: {
    marginTop: 20,
  },
  inputemail: {
    borderBottomWidth: 2,
    width: 200,
  },
  inputpassword: {
    borderBottomWidth: 2,
    width: 200,
    marginTop: 20,
  },
  buttonView: {
    marginTop: 20,
  },
});
