import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "./Avatar";
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../Services/Context/Context";
import { UseContacts } from './../../Hooks/UseHooks';

export const ComponentHeader = ({ ind, routeVal, avatar, title }) => {
  const route = useRoute();
  const contact=UseContacts()
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <View style={Styles.container}>
      {avatar && (
        <View>
          <Avatar size={40} user={route.params.user} />
        </View>
      )}

      {routeVal && (
        <View style={Styles.title}>
          <Text style={{ color: colors.white, fontSize: 18 }}>
            {route.params.user.contactName || route.params.user.displayName}
          </Text>
        </View>
      )}

      {title && (
        <View style={Styles.title}>
          <Text style={{ color: colors.white, fontSize: 18 }}>{title}</Text>
        </View>
      )}

      {ind == "true" && contact.length==0 && (
        <View style={Styles.ind}>
          <ActivityIndicator color={colors.white} size={17} />
        </View>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  title: {
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ind: {
    left: Dimensions.get("screen").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
});
