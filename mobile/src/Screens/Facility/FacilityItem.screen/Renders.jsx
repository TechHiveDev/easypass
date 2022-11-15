import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useCreateMutation } from "../../../API/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { widthPercentageToDP } from "react-native-responsive-screen";
import theme from "../../../Theme/paper.theme";
import { useListContext } from "../../../Navigators/FacilityContext";

export const renderEmptyDate = () => {
  return (
    <View style={styles.item}>
      <Text>No available slots here!</Text>
    </View>
  );
};
export const RenderItem = ({ reservation, facilityId, price }) => {
  const { refetch, data } = useListContext();
  const currentSlot = data
    .find((d) => d.id === facilityId)
    ?.slots?.find(
      (s) => s.from === reservation.fromAPI && s.to === reservation.toAPI
    );
  const fontSize = 14;
  const color = "#43515c";
  const userId = useAppSelector((state) => state?.auth?.user?.id);
  const { compoundId, id: userCompoundId } = useAppSelector(
    (state) => state?.auth?.currentCompound
  );
  const [bookService, { isLoading }] = useCreateMutation();
  const from =
    reservation.from.substring(1, 2) === ":"
      ? ("0" + reservation.from).substring(0, 5)
      : reservation.from.substring(0, 5);
  const to =
    reservation.to.substring(1, 2) === ":"
      ? ("0" + reservation.to).substring(0, 5)
      : reservation.to.substring(0, 5);
  const pressHandler = async () => {
    const res = await bookService({
      entity: "request",
      body: {
        compoundId,
        userCompoundId,
        userId,
        facilityId,
        availableDateFrom: reservation.fromAPI,
        availableDateTo: reservation.toAPI,
        type: "Facility",
      },
    });
    if (res?.data?.id) {
      Toast.show({
        type: "success",
        text1: "Booked successfully!",
      });
      refetch();
    }
  };
  return (
    <View style={[styles.item]}>
      <View>
        <Text style={{ fontSize, color }}>
          from: {from} to {to}
        </Text>
        {price ? <Text style={{ fontSize, color }}>Price: {price}</Text> : null}
      </View>
      {currentSlot?.available === false ? (
        <Text>Booked X</Text>
      ) : (
        <Button
          style={{
            borderWidth: widthPercentageToDP(1),
            borderColor: theme.colors.primary,
          }}
          disabled={isLoading || reservation.available === false}
          onPress={pressHandler}
        >
          {isLoading ? <ActivityIndicator /> : "Book"}
        </Button>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
