import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import TypeWriter from "react-native-typewriter";
import { GlobalContext } from "../../Services/Context/Context";

export const AiMessage = ({ key, message, time }) => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View>
      <View style={[Styles.messageView, { backgroundColor: colors.white }]}>
        <TypeWriter style={[Styles.text, { color: colors.black }]} typing={1} minDelay={5}>
          {message}
        </TypeWriter>
      </View>
      <View style={[Styles.timeTextView, { color: colors.foreground }]}>
        <Text style={[Styles.timeText, { color: colors.white }]}>{time}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageView: {
    borderBottomEndRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 4,
    marginHorizontal: 4,
    alignSelf: "flex-start",
    marginRight: "auto",
    maxWidth: Dimensions.get("screen").width * 0.6,
  },
  timeTextView: {
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  text: {
    fontSize: 12,
  },
  image: {
    height: 12,
    width: 12,
    position: "absolute",
    borderRadius: 6,
    borderWidth: 1,
    left: 14,
  },
  timeText: {
    fontSize: 12,
  },
});
