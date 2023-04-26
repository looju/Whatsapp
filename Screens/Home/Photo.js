import { View, Text } from "react-native";
import React, { useState } from "react";
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
        setTimeout(() => navigation.navigate("Chat"), 1000);
      }
    });

    return () => unSubscribe();
  }, [navigation, cancelled]);

  return <View />;
};
