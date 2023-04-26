import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";
import { Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { SignInNav } from "./Navigator/SignInNav";
import { Profile } from "./Screens/Account/Profile";
import { GlobalContext } from "./Services/Context/Context";
import { ContextWrapper } from "./Services/Context/ContextWrapper";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNav } from "./Navigator/HomeNav";
import { Contacts } from "./Screens/Contacts/Contacts";
import { ComponentHeader } from "./Components/General/ComponentHeader";
import { ChatRoom } from "./Screens/ChatRoom/ChatRoom";

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

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        jsonValue != null ? setCurrentUser(JSON.parse(jsonValue)) : null
      } catch (e) {
        console.log("Problem fetching local user data at App.js " + e);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {!currentUser ? (
        <SignInNav />
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
            component={HomeNav}
            options={{
              headerTitle: "Whatsapp",
              headerTitleStyle: { color: colors.white },
            }}
          />
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{
              headerTitle: (props) => (
                <ComponentHeader
                  ind="true"
                  title={"Select contact"}
                  {...props}
                />
              ),
              headerTitleStyle: { color: colors.white },
              headerBackTitleStyle: { color: colors.white },
            }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{
              headerTitle: (props) => (
                <ComponentHeader {...props} routeVal avatar />
              ),
            }}
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
