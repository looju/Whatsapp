import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
} from "react-native";
import React,{useEffect,useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ReceiverMessage } from "./../../Components/AI/ReceiverMessage";
import { SenderMessage } from "./../../Components/AI/SenderMessage";


export const AI = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title:
        "Lorem incididunt aute excepteur consectetur voluptate. Exercitation sunt amet mollit eu ut laborum. Nulla minim ut laboris aliqua dolore in deserunt ex. Qui quis velit non commodo.Cillum ad aliquip excepteur velit aliquip ea duis in veniam irure quis. Laborum consequat do adipisicing nisi adipisicing incididunt eiusmod mollit amet pariatur anim. Cupidatat exercitation dolor cillum est dolor. Est mollit eu voluptate officia fugiat ad exercitation adipisicing minim ut. Sit fugiat labore occaecat laborum ullamco ipsum aliqua proident. Veniam aliquip ut exercitation qui exercitation in excepteur consectetur enim. Ullamco velit id ipsum sint cupidatat culpa sint Ex Lorem laboris et elit deserunt laboris nostrud nostrud proident laborum. Tempor velit laborum consectetur exercitation ipsum minim nostrud. Laboris voluptate exercitation labore adipisicing consectetur anim excepteur. Aliqua cillum eu duis occaecat ad tempor fugiat proident. Veniam fugiat tempor elit ullamco officia enim duis ullamco cillum id eu consequat quis. Do occaecat dolore magna labore et id pariatur cillum ad exercitation incididunt dolore fugiat. Deserunt ea occaecat magna reprehenderit.Amet fugiat laboris commodo aliqua ipsum in dolore pariatur mollit sint aute excepteur esse. Dolor reprehenderit eiusmod esse in occaecat nostrud velit ex veniam duis qui ea est mollit. Sint enim incididunt quis exercitation magna officia do occaecat occaecat incididunt adipisicing laboris. Incididunt duis consectetur non voluptate labore ullamco in aute laborum mollit dolor excepteur est. Adipisicing ut commodo nostrud ut qui officia enim aliquip consequat duis id. Quis nostrud ex minim est exercitation culpa officia elit id ullamco reprehenderit id cupidatat id",
    },
  ];

  const Item = ({ title }) => (
    <View style={Styles.item}>
      <Text style={Styles.title}>{title}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/Aibg.jpg")}
      resizeMode="cover"
      style={Styles.container}
      blurRadius={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Styles.container}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            style={Styles.messageList}
            inverted={-1}
            renderItem={({ item }) => <SenderMessage message={item.title} />}
          />
        </TouchableWithoutFeedback>

        <View style={Styles.inputView}>
          <TextInput
            style={Styles.messageInput}
            placeholder="Send a message..."
          />
          <MaterialCommunityIcons color="#FF5864" size={30} name="send" />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderColor: "#808080",
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 15,
  },
  messageList: {
    marginVertical:10
  },
});
