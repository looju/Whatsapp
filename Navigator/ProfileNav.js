import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../Screens/Profile";

const Stack = createStackNavigator();

export const ProfileNav = () => {
  return (
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
  );
};
