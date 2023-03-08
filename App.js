import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { SignInNav } from "./Navigator/SignInNav";
import { ContextWrapper } from "./Services/Context/ContextWrapper";

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
      {!currentUser ? <SignInNav /> : <Text></Text>}
    </NavigationContainer>
  );
}

function Main() {
  consst[Assets] = useAssets(require("./assets/favicon.png"));
  if (!Assets) {
    return <ActivityIndicator color="green" />;
  } else {
    return (
      <ContextWrapper>
        <App />
      </ContextWrapper>
    );
  }
}

export default Main;
