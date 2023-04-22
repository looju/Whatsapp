//@refresh reset
import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { auth } from "../../Config/Firebase";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { GlobalContext } from "./../../Services/Context/Context";
import { collection, doc } from "firebase/firestore";
import { db } from "./../../Config/Firebase";

export const ChatRoom = () => {
  const { theme } = useContext(GlobalContext);
  const route = useRoute();
  const { currentUser } = auth;
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const randomId = nanoid();

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "room", roomId);
  const roomMessageRef = collection(db, "room", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currentUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currentUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName,
          email: userB.email,
        };
      }
    })();
  }, []);

  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  );
};
