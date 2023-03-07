import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { ActivityIndicator } from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function Main() {
  consst[Assets] = useAssets(require("./assets/favicon.png"));
  if (!Assets) {
    return <ActivityIndicator color="green" />;
  } else {
    return <App />;
  }
}

export default Main;
