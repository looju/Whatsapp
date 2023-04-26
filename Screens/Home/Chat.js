import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { db, auth } from "../../Config/Firebase";
import { query, collection, where, onSnapshot, doc } from "firebase/firestore";
import { GlobalContext } from "./../../Services/Context/Context";
import { ContactFloatingIcon } from "../../Components/General/ContactFloatingIcon";
import { ListItem } from "../../Components/General/ListItem";
import { UseContacts } from "../../Hooks/UseHooks";

export const Chat = () => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms} = useContext(GlobalContext);
  const contact=UseContacts()

  const chatsQuery = query(
    collection(db, "room"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unSubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot?.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userB: doc.data().participants.find(
            (p) => p.email !== currentUser.email
          ), // So that user B is the other user possessing a different email
        }));
      setRooms(parsedChats.filter(doc=>doc.lastMessage));
      setUnfilteredRooms(parsedChats)
     
    });

    return () => unSubscribe();
  }, []);

  

  const getUserB = (user, contacts) => {
  const userContact=contacts.find(contact=>contact.email==user.email)
  if(userContact && userContact.contactName){
    return {...user, contactName:userContact.contactName}
  }
  return user
  };

  return (
    <View style={Styles.container}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contact)}
          
        />
      ))}
      <ContactFloatingIcon />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    backgroundColor:"#000"
  },
});
