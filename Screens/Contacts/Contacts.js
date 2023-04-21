import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UseContacts } from "../../Hooks/UseHooks";
import { FlatList, StyleSheet } from "react-native";
import { GlobalContext } from "./../../Services/Context/Context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./../../Config/Firebase";
import { ListItem } from "../../Components/General/ListItem";

export const Contacts = () => {
  const contact = UseContacts();
  console.log(contact)

  const ContactPreview = ({ contact, image }) => {
    const { rooms } = useContext(GlobalContext);
    const [user, setUser] = useState(contact);

    useEffect(() => {
      const q = query(
        collection(db, "users"),
        where("email","==", contact.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length > 0) {
          const userDoc = snapshot.docs[0].data();  //userDoc only returns an object that contains only contacts
          setUser((prevUser) => ({ ...prevUser, userDoc }));
        }
      });
      return () => unsubscribe();
    }, []);

    return (
      <ListItem
        style={Styles.listitem}
        type="contacts"
        user={user}
        image={image}
        room={rooms.find((room) =>
          room.participantsarray.includes(contact.email)
        )}
      />
    );
  };

  return (
    <FlatList
      style={Styles.flatlist}
      data={contact}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} />}
    />
  );
};

const Styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    padding: 10,
  },
  listitem: {
    marginTop: 7,
  },
});
