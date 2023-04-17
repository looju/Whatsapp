import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalContext } from "../../Services/Context/Context";
import { useNavigation } from "@react-navigation/native";

export const ContactFloatingIcon = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const navigation=useNavigation()
  return (
    <TouchableOpacity
      style={{
        backgroundColor:colors.secondary,
        position: "absolute",
        right: 20,
        bottom:20,
        borderRadius: 60,
        width: 60,
        height: 60,
        alignItems:"center",
        justifyContent:"center"
      }}
      onPress={()=>navigation.navigate("contacts")}
    >
      <MaterialCommunityIcons
        name="android-messages"
        color="#fff"
        size={30}
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
};
