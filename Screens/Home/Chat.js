import { View, Text } from "react-native";
import React, {useContext} from "react";
import { db, auth } from "../../Config/Firebase";
import { query, collection, where } from "firebase/firestore";
import { GlobalContext } from './../../Services/Context/Context';

export const Chat = () => {
  const { currentUser } = auth;
  const {rooms, setRooms}=useContext(GlobalContext)

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsarray", "array-contains", currentUser.email)
  );
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};
