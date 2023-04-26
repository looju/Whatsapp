import { View, Text } from "react-native";
import React,{useState} from "react";
import { useNavigation } from "@react-navigation/native";

export const Photo = () => {
  const navigation = useNavigation();
  const [cancelled, setCancelled] = useState(false);

  useEffect(()=>{

  },[navigation, cancelled])

  return (
    <View>
      <Text>Photo</Text>
    </View>
  );
};
