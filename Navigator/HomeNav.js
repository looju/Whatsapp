import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Screens/Home";

const Stack = createStackNavigator();

export const HomeNav = () => {
  return (
    <Stack.Screen
      name="Home"
      component={Home}
      options={{headerTitle:"Whatsapp"}}
    />
  );
};
