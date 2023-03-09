import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import Constants from "expo-constants";
import { GlobalContext } from "../Services/Context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Profile = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: colors.black,
          paddingTop: Constants.statusBarHeight + 20,
        },
      ]}
    >
      <Text style={{ fontSize: 22, color: colors.foreground }}>
        Profile Info
      </Text>
      <Text style={{ fontSize: 14, color: colors.iconGray, marginTop: 20 }}>
        Please provide a display name and an optional profile photo
      </Text>
      <TouchableOpacity
        style={[
          Styles.selectImgButton,
          { backgeoundColor: colors.lightIconGrey },
        ]}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color={colors.iconGray}
            selectionColor={colors.foreground}
            size={45}
          />
        ) : (
          <Image source={{ uri: selectedImage }} style={Styles.image} />
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Enter your username"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        style={[Styles.input, { borderBottomColor: colors.primary }]}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 22,
  },
  selectImgButton: {
    MarginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 120,
  },
  input: {
    marginTop: 40,
    borderBottomWidth: 2,
    width: "100%",
  },
});
