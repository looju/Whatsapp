import React, { useContext } from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Photo } from "../Screens/Home/Photo";
import { Chat } from "../Screens/Home/Chat";
import { AI } from "../Screens/Home/AI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalContext } from "../Services/Context/Context";

const Tab = createMaterialTopTabNavigator();

export const HomeNav = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => {
          if (route.name === "Photo") {
            return (
              <MaterialCommunityIcons
                name="camera"
                size={20}
                color={colors.white}
              />
            );
          } else if (route.name === "AI") {
            return (
              <MaterialCommunityIcons
                name="comment-search-outline"
                size={20}
                color={colors.white}
              />
            );
          } else {
            return (
              <Text style={{ color: colors.white }}>
                {route.name}
              </Text>
            );
          }
        },
        tabBarShowIcon: true,
        tabBarLabelStyle: { color: colors.white },
        tabBarIndicatorStyle: { backgroundColor: colors.white },
        tabBarStyle: { backgroundColor: colors.foreground },
        
      })}
      initialRouteName="Chat"
    >
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Ai" component={AI} />
    </Tab.Navigator>
  );
};
