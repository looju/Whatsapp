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
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const AI = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
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
          renderItem={({ item }) => <Item title={item.title} />}
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
    height: 10,
  },
  messageList: {},
});