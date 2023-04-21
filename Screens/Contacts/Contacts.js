import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UseContacts } from "../../Hooks/UseHooks";
import { FlatList, StyleSheet } from "react-native";
import { GlobalContext } from "./../../Services/Context/Context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./../../Config/Firebase";
import { ListItem } from "../../Components/General/ListItem";
import { useRoute } from "@react-navigation/native";


export const Contacts = () => {
  const contact = UseContacts();
  const route = useRoute();
  const image = route.params && route.params.image;

  const ContactPreview = ({ contact, image }) => {
    const { rooms } = useContext(GlobalContext);
    const {theme:{colors}}=useContext(GlobalContext);
    const [user, setUser] = useState(contact);

    useEffect(() => {
      const q = query(
        collection(db, "users"),
        where("email", "==", contact.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length > 0) {
          const userDoc = snapshot.docs[0].data(); //userDoc only returns an object that contains only contacts
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
    <View>
      {contact.length==0 &&(
        <ActivityIndicator size={15} color={colors.white}/>
      )}
      <FlatList
        style={Styles.flatlist}
        data={contact}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <ContactPreview contact={item} image={image} />
        )}
      />
    </View>
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
