import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { db, auth } from "../../Config/Firebase";
import { query, collection, where, onSnapshot, doc } from "firebase/firestore";
import { GlobalContext } from "./../../Services/Context/Context";

export const Chat = () => {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(GlobalContext);

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsarray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unSubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage) // to create an array containing documents with the last message property
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userB: doc.data.participants.find(
            (p) => p.email !== currentUser.email
          ), // So that user B is the other user possessing a different email
        }));
    });
  }, []);

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};
