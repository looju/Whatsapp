import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { SignUp, SignIn } from "../Config/firebase";
import { Button } from "react-native-paper";
import { GlobalContext } from "../Services/Context/Context";

export const SignIn = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("SignUp");

  const handlePress = async () => {
    if (mode === "SignUp") {
      await SignUp(email, password);
    }
    if (mode === "SignIn") {
      await SignIn(email, password);
    }
  };

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
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
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
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
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
          style={{ width: 200 }}
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

//Hello. My name is Loju. I am a mobile developer with react native. I saw the recent posting from Kuda for this position but i know i do not have the required experience.So far, i have been able to build applications that can scale such as a tinder messaging app, delivery app, news application and i am currently building something similar to WhatsApp. Please i would love if i can work as an intern or a junior  for FREE because right now i seek real world experience and not finance. I would proove my work abilities and i promise to be dutiful and give my best to Kuda bank. Attached here is my CV sir. Thank you sir
