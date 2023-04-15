import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../../Services/Context/Context";

export const SenderMessage = ({ message, time }) => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View>
      <View
        style={[Styles.messageView, { backgroundColor: colors.foreground }]}
      >
        <Text style={[Styles.text, { color: colors.white }]}>{message}</Text>
      </View>
      <View style={Styles.timeTextView}>

        <Text style={[Styles.timeText, { color: colors.iconGray }]}>{time || Date.now()}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageView: {
    borderTopEndRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 4,
    marginHorizontal: 4,
    alignSelf: "flex-start",
    marginLeft: "auto",
    maxWidth: Dimensions.get("screen").width * 0.6,
  },
  timeTextView:{
    marginVertical:2,
    paddingVertical:2,
    paddingHorizontal:2,
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  text: {
    fontSize: 12,
  },
  timeText: {
    fontWeight: "200",
    fontSize: 10,
  },
});
