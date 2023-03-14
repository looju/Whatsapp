import { View, Text, StyleSheet,Dimensions } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../../Services/Context/Context";

export const SenderMessage = ({ key, message }) => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <View style={[Styles.messageView, { backgroundColor: colors.foreground }]}>
      <Text style={[Styles.text,{color:colors.white}]}>{message}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageView: {
    borderTopEndRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 2,
    marginHorizontal: 4,
    alignSelf: "flex-start",
    marginLeft: "auto",
    maxWidth:Dimensions.get("Screen").width*0.4,
  },
  text: {
   fontSize:12
  },
});
