import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const ContactFloatingIcon = () => {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name="android-messages"
        color="#fff"
        size={30}
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
};
