import React, { useState } from "react";
import dayjs from "dayjs";
import { TouchableOpacity, StyleSheet, View, I18nManager } from "react-native";
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

// mode : time | date | default
export default function DateTimeInput({
  mode = "default",
  defaultValue = null,
  name = "datetime",
  setValue,
  label = "",
}) {
  const [date, setDate] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const showDatePicker = () => setOpen(true);
  const hideDatePicker = () => setOpen(false);

  const handleConfirm = (pickedDate) => {
    setDate(pickedDate);
    hideDatePicker();
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const dateTimeText = () => {
    if (!date) {
      return !label ? `${i18n.t("choose")} ${i18n.t(mode)}` : i18n.t("choose");
    }

    if (mode === "time") {
      return dayjs(date).format("hh : mm  a");
    } else {
      return dayjs(date).format("hh:mm a  ddd  DD / MM / YYYY");
    }
  };

  return (
    <TouchableOpacity onPress={showDatePicker} style={styles.container}>
      <View style={styles.textBody}>
        <MyText style={styles.text} text={dateTimeText()} />
        <MaterialCommunityIcons
          name={mode === "time" ? "clock-outline" : "calendar"}
          size={28}
          color="black"
        />
      </View>
      <DateTimePickerModal
        isVisible={open}
        mode={"datetime"}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}

//----------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(7),
    borderRadius: 7,
    marginHorizontal: wp(4),
    marginVertical: hp(1.2),
    borderWidth: 1,
    borderColor: theme.colors.placeholder,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  textBody: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  text: {
    fontSize: 18,
  },
});
