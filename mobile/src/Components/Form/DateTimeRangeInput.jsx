import React, { useState } from "react";
import dayjs from "dayjs";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import theme from "../../Theme/paper.theme";
import MyText from "../../Components/MyText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";

// ----------------------------------------------------------------

// mode : time | date | default "datetime"
export default function DateTimeInput({
  mode = "default",
  defaultValue = null,
  name = "datetime",
  setValue,
  label = "",
}) {
  const [fromDate, setFromDate] = useState(defaultValue);
  const [toDate, setToDate] = useState(defaultValue);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const showFromModal = () => setOpenFrom(true);
  const hideFromModal = () => setOpenFrom(false);
  const showToModal = () => setOpenTo(true);
  const hideToModal = () => setOpenTo(false);

  const handleFromDate = (pickedDate) => {
    setFromDate(pickedDate);
    hideFromModal();
  };

  const handleToDate = (pickedDate) => {
    setToDate(pickedDate);
    hideToModal();
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const dateTimeText = (date) => {
    if (!date) {
      return !label ? `${i18n.t("choose")} ${i18n.t(mode)}` : i18n.t("choose");
    }

    if (mode === "time") {
      return dayjs(date).format("hh : mm  a");
    } else if (mode === "date") {
      return dayjs(date).format(" DD / MM / YYYY");
    } else {
      return dayjs(date).format("hh:mm a  ddd");
    }
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <View style={styles.container}>
      <View style={styles.textBody}>
        <TouchableOpacity onPress={showFromModal} style={styles.picker}>
          <MyText
            style={styles.text}
            text={`${dateTimeText(fromDate)}  ${i18n.t("from")}`}
          />
          <MaterialCommunityIcons
            name={mode === "time" ? "clock-outline" : "calendar"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textBody}>
        <TouchableOpacity onPress={showToModal} style={styles.picker}>
          <MyText
            style={styles.text}
            text={`${dateTimeText(toDate)}  ${i18n.t("to")}`}
          />
          <MaterialCommunityIcons
            name={mode === "time" ? "clock-outline" : "calendar"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={openFrom}
        mode={mode}
        onConfirm={handleFromDate}
        onCancel={hideFromModal}
      />
      <DateTimePickerModal
        isVisible={openTo}
        mode={mode}
        onConfirm={handleToDate}
        onCancel={hideToModal}
      />
    </View>
  );
}

//----------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  pickers: {
    backgroundColor: "red",
  },
  picker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: wp(45),
    borderColor: theme.colors.placeholder,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-around",
    borderRadius: 7,
    marginVertical: hp(1),
    height: hp(7),
    borderWidth: 1,
  },
  textBody: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  text: {
    fontSize: 15,
    marginHorizontal: wp(0.5),
  },
});
