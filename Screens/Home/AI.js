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
import React, { useEffect, useState, useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AiMessage } from "./../../Components/AI/AiMessage";
import { SenderMessage } from "./../../Components/AI/SenderMessage";
import { GlobalContext } from "./../../Services/Context/Context";
import {
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  startAt,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./../../Config/Firebase";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_KEY } from "@env";

export const AI = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const user = auth.currentUser;
  const [input, setInput] = useState(null);
  const [prevMsgs, setPrevMsgs] = useState("");

  console.log(input);

  const handleSend = async () => {
    const configuration = new Configuration({
      apiKey: OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });

    const storeAIandUserMessage = await setDoc(doc(db, "AIchat", user.email), {
      user: user.email,
      usermessage: input,
      AImessage: completion?.data?.choices[0]?.message.content,
      timestamp: serverTimestamp(),
    });

    await Promise.all([completion, storeAIandUserMessage])
      .then(setInput(""))
      .then(console.log("done"))
      .catch((error) => console.log(error));
  };

  useEffect(
    () =>
      onSnapshot(doc(db, "AIchat", user.email), (snapshot) => {
        setPrevMsgs(snapshot.data());
      }),
    [db]
  );

  console.log(prevMsgs);

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
          <View style={Styles.container}>
            <SenderMessage message={prevMsgs?.usermessage}  time={prevMsgs?.timestamp?.seconds}/>
            <AiMessage
              message={prevMsgs?.AImessage}
              time={prevMsgs?.timestamp?.seconds}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={Styles.inputView}>
          <TextInput
            style={Styles.messageInput}
            placeholder="Chat with AI..."
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={() => handleSend()}
          />
          <MaterialCommunityIcons
            color={colors.foreground}
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
    height: 60,
  },
  messageInput: {
    height: 20,
    width: "90%",
  },
  messageList: {
    marginVertical: 10,
  },
});
