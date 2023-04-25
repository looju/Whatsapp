import { View, Text, ActivityIndicator, Dimensions } from "react-native";
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
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const ContactPreview = ({ contact, image }) => {
    const { unfilteredRooms } = useContext(GlobalContext);
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


    console.log(unfilteredRooms)

    return (
      <ListItem
        style={Styles.listitem}
        type="contacts"
        user={user}
        image={image}
        room={unfilteredRooms.find((room) =>
          room.participantsArray.includes(contact.email)
        )}
      />
    );
  };

  return (
    <View style={Styles.container}>
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
  container: {
    position: "absolute",
    flex: 1,
  },
  flatlist: {
    flex: 1,
    padding: 10,
    position: "absolute",
  },
  listitem: {
    marginTop: 7,
  },
  actInd: {
    backgroundColor: "#ff0",
    position: "absolute",
    left: Dimensions.get("screen").width * 0.5,
  },
});
