import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PickImage } from "../../Functions/Functions";

export const Photo = () => {
  const navigation = useNavigation();
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", async () => {
      const result = await PickImage();
      navigation.navigate("Contacts", { image: result });
      if (result.canceled) {
        setCancelled(true);
        navigation.navigate("Chat");
      }
    });

    return () => unSubscribe();
  }, [navigation, cancelled]);

  return <View />;
};
