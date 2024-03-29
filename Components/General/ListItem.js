import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "./../../Services/Context/Context";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Avatar } from "./Avatar";

export const ListItem = ({
  type,
  description,
  user,
  time,
  room,
  image,
  style,
  dark,
}) => {
  const navigation = useNavigation();
  const {
    theme: { colors },
    unfilteredRooms,
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={[Styles.container, { ...style }]}
      onPress={() =>
        navigation.navigate("ChatRoom", {
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
              <Text
                style={[
                  Styles.text,
                  { color: (dark ? colors.black : colors.white) },
                ]}
              >
                {user.contactName || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={Styles.time}>
                <Text
                  style={[Styles.timeText, { color: (dark = "true" ? colors.white : colors.secondaryText) },]}
                >
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={Styles.desc}>
              <Text style={[Styles.descText, { color: colors.secondaryText }]}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 60,
  },
  grid: {
    maxHeight: 60,
  },
  col: {
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 0.2,
  },
  col2: {
    marginLeft: 10,
    flex: 1,
    height: 80,
    paddingBottom: 5,
  },
  row: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 11,
  },
  desc: {
    marginTop: -5,
  },
  descText: {
    fontSize: 13,
  },
});
