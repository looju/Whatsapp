import { View, Text, StyleSheet, Image ,Dimensions} from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../../Services/Context/Context";

export const ReceiverMessage = ({ key, message }) => {

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View style={[Styles.messageView, { backgroundColor: colors.white }]}>
      <Text style={[Styles.text,{color:colors.black}]}>{message}</Text>
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
    maxWidth:Dimensions.get("screen").width*0.6,
  },
  text: {
    fontSize:12
  },
  image: {
    height: 12,
    width: 12,
    position: "absolute",
    borderRadius: 6,
    borderWidth: 1,
    left: 14,
  },
});
