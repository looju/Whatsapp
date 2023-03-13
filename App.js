import "react-native-gesture-handler";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { SignInNav } from "./Navigator/SignInNav";
import { Home } from "./Screens/Home"; 
import {Profile} from "./Screens/Profile";
import { GlobalContext } from "./Services/Context/Context";
import { ContextWrapper } from "./Services/Context/ContextWrapper";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(GlobalContext);

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
        // <SignInNav />
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 2,
            },
            headerTintColor: colors.black,
          }}
        >
          {!currentUser.displayName && (
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: "Whatsapp" }}
          />
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
