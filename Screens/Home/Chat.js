import { View, Text,StyleSheet} from "react-native";
import React, { useContext, useEffect } from "react";
import { db, auth } from "../../Config/Firebase";
import { query, collection, where, onSnapshot, doc } from "firebase/firestore";
import { GlobalContext } from "./../../Services/Context/Context";
import { ContactFloatingIcon } from "../../Components/General/ContactFloatingIcon";

export const Chat = () => {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(GlobalContext);

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsarray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unSubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot?.docs
        ?.filter((doc) => doc.data().lastMessage) // create an array containing only the last message property
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userB: doc.data.participants.find(
            (p) => p.email !== currentUser.email
          ), // So that user B is the other user possessing a different email
        }))
        setRooms(parsedChats)
    });

    return ()=> unSubscribe()
  }, []);

  return (
    <View style={Styles.container}>
      <Text>Chat</Text>
      <ContactFloatingIcon/>
    </View>
  );
};


const Styles=StyleSheet.create({
  container:{
    flex:1,
    padding:5,
    paddingRight:10
  }
})