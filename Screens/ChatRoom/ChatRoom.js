//@refresh reset
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { auth } from "../../Config/Firebase";
import { GlobalContext } from "./../../Services/Context/Context";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../Config/Firebase";
import {
  Actions,
  GiftedChat,
  InputToolbar,
  Bubble,
} from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  PickImage,
  randomString,
  UploadImage,
} from "../../Functions/Functions";

export const ChatRoom = () => {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const {
    theme: { colors },
    unfilteredRooms,
  } = useContext(GlobalContext);
  const route = useRoute();
  const { currentUser } = auth;
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomString();

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
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }

        const roomData = {
          participants: [currentUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };

        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log("error creating Doc at ChatRoom.js" + error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
    })();
  }, []);
  // return an array containing only added messages
  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessageRef, (snapShot) => {
      const messagesFirestore = snapShot
        .docChanges()
        .filter(({ type }) => type == "added")
        .map(({ doc }) => {
          const messages = doc.data();
          return { ...messages, createdAt: messages.createdAt.toDate() }; // would return the last added value to the roomMessageRef. This would be the last message since the onsend function adds a message to the roomMessageRef
        });
      appendMesages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMesages = useCallback(
    (messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((value) => addDoc(roomMessageRef, value));
    const lastMessage = messages[messages.length - 1]; // returns last element in the array. Could also use  messages.slice(-1)
    const updateWrites = writes.push(
      updateDoc(roomRef, { lastMessage: lastMessage })
    );
    await Promise.all(updateWrites);
  }

  const sendImage = async (uri, roomPath) => {
    const { url, fileName } = await UploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessageRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  };

  const handlePhotoPicker = async () => {
    const result = await PickImage();
    if (!result.canceled) {
      console.log(" image uri :"+ result.assets[0].uri);
      sendImage( result.assets[0].uri);
    }
    if (result.canceled) {
      console.log("image canceled");
    }
  };

  return (
    <ImageBackground
      resizeMethod="auto"
      resizeMode="cover"
      source={require("../../assets/background.jpg")}
      style={Styles.container}
    >
      <GiftedChat
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        onSend={(message) => onSend(message)}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={Styles.action}
            icon={() => (
              <View style={Styles.iconView}>
                <MaterialCommunityIcons
                  name="camera"
                  size={25}
                  color={colors.iconGray}
                  onPress={() => handlePhotoPicker()}
                />
                <MaterialCommunityIcons
                  name="microphone"
                  size={28}
                  color={colors.foreground}
                />
              </View>
            )}
          />
        )}
        renderSend={(props) => {
          const { onSend, text, user, messageIdGenerator } = props;
          return (
            <TouchableOpacity
              style={Styles.send}
              onPress={() => {
                if (text && onSend) {
                  onSend({
                    text: text.trim(),
                    user,
                    _id: messageIdGenerator(),
                  });
                }
              }}
            >
              <MaterialCommunityIcons
                name="send"
                size={30}
                color={colors.foreground}
              />
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} style={Styles.inputBar} />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: colors.text } }}
            wrapperStyle={{
              left: { backgroundColor: colors.white },
              right: { backgroundColor: colors.tertiary },
            }}
          />
        )}
        timeTextStyle={{ right: { color: colors.iconGray } }}
      />
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    position: "absolute",
    right: 50,
    bottom: 2,
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    bottom: 5,
  },
  iconView: {
    flexDirection: "row",
    width: 60,
    alignItems: "center",
    justifyContent: "space-evenly",
    right: 10,
  },
  inputBar: {
    marginHorizontal: 10,
    marginBottom: 2,
    borderRadius: 20,
    paddingTop: 5,
  },
});
