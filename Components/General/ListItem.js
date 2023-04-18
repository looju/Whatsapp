import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "./../../Services/Context/Context";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Avatar } from "./Avatar";

export const ListItem = ({ type, description, user, room, image, style }) => {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={[Styles.container, { ...style }]}
      onPress={() =>
        navigation.navigate("chat", {
          user: user,
          room: room,
          image: image,
        })
      }
    >
      <Grid style={Styles.grid}>
        <Col style={Styles.col}>
          <Avatar size={(type = "contacts" ? 40 : 65)} user={user} />
        </Col>
        <Col style={Styles.col2}>
          <Row style={Styles.row}>
            <Col>
              <Text>{user.contactName || user.displayName}</Text>
            </Col>
          </Row>
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 80,
  },
  grid: {
    maxHeight: 80,
  },
  col: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  col2: {
    marginLeft: 10,
  },
  row: {
    alignItems: "center",
  },
});
