//@refresh reset
import { View, Text, ImageBackground,StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { auth } from "../../Config/Firebase";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { GlobalContext } from "./../../Services/Context/Context";
import { collection, doc, setDoc, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./../../Config/Firebase";
import { GiftedChat } from "react-native-gifted-chat";
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

export const ChatRoom = () => {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const { theme } = useContext(GlobalContext);
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

  const roomId = room ? room.id : "hdhdudu-sscs-e23ec"; // optimize with nanoid. Currently a problem with the nanoid package

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
          return { ...messages, createdAt: messages.createdAt.toDate() };
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



function onSend(messages=[]){
const writes=messages.map(value=>addDoc(roomMessageRef,value)) 
const lastMessage=messages[messages.length-1] // returns last element in the array. Could also use  messages.slice(-1)
}

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
     onSend={(message)=>onSend(message)}
     />
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
