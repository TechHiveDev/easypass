import React from "react";
import handleOffset from "../../Utils/handleOffset";
import { Button, Card, Dialog, Paragraph, Portal } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Text, View } from "react-native";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUpdateMutation } from "../../API/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { motify } from "moti";

const MotiCard = motify(Card)();

export const ListItem = ({ item, cancel = true, notificationId }) => {
  const cancelled = item.status === "Cancelled";
  const { facility, ...restOfRequest } = item;
  const [cancelBooking] = useUpdateMutation({
    entity: "request",
    id: item.id,
    body: { ...restOfRequest, status: "Cancelled" },
  });
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const cancelRequest = async () => {
    const res = await cancelBooking({
      entity: "request",
      id: item.id,
      body: { status: "Cancelled" },
    });
    const data = res.data;
    if (data?.id) {
      Toast.show({
        type: "success",
        text1: "Cancelled reservation successfully ",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error happened while cancelling reservation",
      });
    }
    hideDialog();
  };
  const from = handleOffset(item.availableDateFrom)
    .split("T")[1]
    .substring(0, 5);
  const to = handleOffset(item.availableDateTo).split("T")[1].substring(0, 5);
  return (
    <MotiCard
      animate={{
        scale: item.id === notificationId ? [1.1, 1, 1.1, 1] : 1,
        borderColor:
          item.id === notificationId
            ? [theme.colors.primary, null, theme.colors.primary, null]
            : null,
        borderWidth: item.id === notificationId ? [wp(0.1), 0, 0.1, 0] : 0,
      }}
      style={{
        width: wp(80),
        marginBottom: hp(1.5),
        paddingBottom: hp(1),
        opacity: cancelled ? 0.6 : cancel ? 1 : 0.6,
      }}
    >
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: cancelled ? "center" : "flex-start",
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
            />
            {from} to {to}
          </Text>
          {item?.respondNote ? (
            <Text>
              response:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.respondNote}
              </Text>
            </Text>
          ) : null}
        </View>
        {cancelled ? (
          <Text>Cancelled</Text>
        ) : cancel ? (
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
      {cancelled ? null : cancel ? (
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
    </MotiCard>
  );
};
