import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Photo } from "../Screens/Home/Photo";
import { Chat } from "../Screens/Home/Chat";
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
        tabBarIcon: () => {
          let iconName;
          if (route.name === "Photo") {
            iconName = "camera-enhance-outline";
          } else if (route.name === "Chat") {
            iconName = "message-text";
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={colors.white}
            />
          );
        },
        tabBarShowIcon: true,
        tabBarLabelStyle:{color:colors.white},
        tabBarStyle: { backgroundColor: colors.foreground },
      })}
    >
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};
