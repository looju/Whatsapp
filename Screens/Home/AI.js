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
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ReceiverMessage } from "./../../Components/AI/ReceiverMessage";
import { SenderMessage } from "./../../Components/AI/SenderMessage";
import { doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./../../Config/Firebase";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_KEY } from "@env";

export const AI = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Lorem incididunt aute excepteur consectetur voluptate.",
    },
  ];

  const Item = ({ title }) => (
    <View style={Styles.item}>
      <Text style={Styles.title}>{title}</Text>
    </View>
  );

  const [input, setInput] = useState(null);
  const [message, setMessage] = useState(null);

  console.log(input);

  const handleSend = async () => {
    const user = auth.currentUser;
    const configuration = new Configuration({
      apiKey: OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    setMessage(completion.data.choices[0].message.content);

    const storeAIMessage = await setDoc(doc(db, "AIchat", "AIchatMsg"), {
      timestamp: serverTimestamp(),
      AImessage: message,
    });

    const storeUserMessage=await setDoc(doc(db,"AIchat","useremailgoeshere"),{
      usermessage:input,
      timestamp: serverTimestamp(),
      user:"useremailgoeshere"
    })

    await Promise.all([completion, storeAIMessage, storeUserMessage])
      .then(setInput(""))
      .catch((error) => console.log(error));
  };

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
            renderItem={({ item }) => (
              <SenderMessage message={input?.length > 0 ? input : null} />
            )}

          />
        </TouchableWithoutFeedback>

        <View style={Styles.inputView}>
          <TextInput
            style={Styles.messageInput}
            placeholder="Send a message to AI..."
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={() => handleSend()}
          />
          <MaterialCommunityIcons
            color="#FF5864"
            size={30}
            name="send"
            onPress={() => handleSend()}
          />
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
    marginVertical: 10,
  },
});

// setDoc(doc(db, "AIchat", user.email), {
//   email: user.email,
//   timestamp: serverTimeStamp(),
//   message: input,
// }),
