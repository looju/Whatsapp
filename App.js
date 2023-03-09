import "react-native-gesture-handler";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { SignInNav } from "./Navigator/SignInNav";
import { ProfileNav } from "./Navigator/ProfileNav";
import { ContextWrapper } from "./Services/Context/ContextWrapper";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unSubscribe();
  }, []);

  return (
    <NavigationContainer>
      {!currentUser ? (
        <SignInNav />
      ) : (
        <Stack.Navigator>
        
          {!currentUser.displayName && <ProfileNav />}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function Main() {
  const [Assets] = useAssets(require("./assets/favicon.png"));
  if (!Assets) {
    return (
      <View
        style={{
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator color="green" size={15} />
      </View>
    );
  } else {
    return (
      <ContextWrapper>
        <App />
      </ContextWrapper>
    );
  }
}

export default Main;
