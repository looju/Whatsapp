import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { GlobalContext } from "../../Services/Context/Context";
import { auth, db } from "../../Config/Firebase";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
  PickImage,
  RequestPermission,
  UploadImage,
} from "../../Functions/Functions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ModalComponent } from "../../Components/Modal";

export const Profile = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    const user = auth.currentUser; // fetch current user
    let photoURL;
    setLoading(true);
    if (selectedImage) {
      const { url } = await UploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }

    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL; //adding a new key to the userData object if photoURL exists
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]).then(setLoading(false));
    navigation.navigate("Home");
  };

  const handleProfilePicture = async () => {
    const result = await PickImage();
    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    }
    if (!permissionStatus) {
      return (
        <ModalComponent message={"Loading permissions"} buttonMessage={"OK!"} />
      );
    }
    if (permissionStatus !== "granted") {
      return (
        <ModalComponent
          message={"Whatsapp requires permissions for photos"}
          buttonMessage={"Proceed"}
        />
      );
    }
  };

  useEffect(() => {
    (async () => {
      const status = await RequestPermission();
      setPermissionStatus(status);
    })();
  }, []);

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
      <Text style={{ fontSize: 14, color: colors.white, marginTop: 20 }}>
        Please provide a display name and an optional profile photo
      </Text>
      <TouchableOpacity
        style={[Styles.selectImgButton, { backgroundColor: colors.background }]}
        onPress={handleProfilePicture}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color={colors.iconGray}
            selectionColor={colors.lightIconGrey}
            size={45}
          />
        ) : (
          <Image source={{ uri: selectedImage }} style={Styles.image} />
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Enter your username"
        placeholderTextColor={colors.iconGray}
        textAlign="center"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        style={[
          Styles.input,
          { borderBottomColor: colors.primary, color: colors.white },
        ]}
      />
      <View style={Styles.buttonView}>
        <Button
          accessibilityLabel="Next"
          dark={true}
          mode="contained"
          buttonColor={!displayName ? colors.iconGray : colors.secondary}
          textColor={colors.white}
          disabled={!displayName}
          style={{ width: 80 }}
          onPress={() => handlePress()}
        >
          Next
        </Button>
      </View>
      {loading && (
        <View style={Styles.indicator}>
          <ActivityIndicator color={colors.secondary} size={15} />
        </View>
      )}
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
  buttonView: {
    marginTop: "auto",
    width: 80,
  },
  indicator: {
    margniTop: Dimensions.get("screen").height * 0.7,
    width: "100%",
    height: 100,
  },
});
