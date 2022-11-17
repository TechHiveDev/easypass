import React from "react";
import { handleOffsetObject } from "../../Utils/handleOffset";
import { Button, Card, Dialog, Paragraph, Portal } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Alert, Text, View } from "react-native";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const getFormattedTime = (time) => {
  const hours = time.getHours().toString();
  const minutes = time.getMinutes().toString();
  const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
  return `${hours}:${formattedMinutes}`;
};
export const ListItem = ({ item, cancel = true }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const cancelRequest = () => {
    Alert.alert("cancel", JSON.stringify(item));
    hideDialog();
  };
  const from = handleOffsetObject(item.availableDateFrom);
  const to = handleOffsetObject(item.availableDateTo);
  return (
    <Card
      style={{
        width: wp(80),
        marginBottom: hp(1.5),
        paddingBottom: hp(1),
        opacity: cancel ? 1 : 0.6,
      }}
    >
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingBottom: hp(1),
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: wp(1),
              width: wp(15),
              height: wp(15),
              borderRadius: wp(15 / 2),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={item?.facility?.icon}
              color={theme.colors.white}
              size={wp(10)}
            />
          </View>
          <Text
            style={{
              fontSize: wp(4.2),
              fontWeight: "bold",
              marginTop: wp(1.8),
              // marginTop: hp(0.3),
            }}
          >
            {item?.facility?.name}
          </Text>
          <Text
            style={{
              fontSize: wp(3.5),
              color: theme.colors.text,
            }}
          >
            <MaterialCommunityIcons
              name={"clock-outline"}
              color={theme.colors.black}
            />{" "}
            {getFormattedTime(from)} to {getFormattedTime(to)}
          </Text>
        </View>
        {cancel ? (
          <Button
            onPress={showDialog}
            style={{
              position: "absolute",
              top: hp(1),
              right: wp(1),
            }}
          >
            <MaterialCommunityIcons
              name={"dots-horizontal"}
              size={wp(10)}
              color={theme.colors.grey}
            />
          </Button>
        ) : null}
      </Card.Content>
      {cancel ? (
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Cancel</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to cancel ? </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  cancelRequest();
                }}
              >
                I'm sure
              </Button>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
    </Card>
  );
};
