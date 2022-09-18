import React from "react";
import { View, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";

// ----------------------------------------------------------------

export default function Select({
  name,
  choices,
  placeholder = "Choose Option",
  getValues,
  setValue,
}) {
  // --------------------------------

  const handleStatusChange = ({ value }) => setValue(name, value);

  // --------------------------------

  const defaultValue = choices?.find(
    (choice) => choice.value === getValues(name)
  );

  // --------------------------------

  return (
    <View style={styles.container}>
      <SelectDropdown
        defaultValue={defaultValue}
        data={choices}
        defaultButtonText={i18n.t(placeholder)}
        onSelect={handleStatusChange}
        buttonTextAfterSelection={({ label }) => i18n.t(label)}
        rowTextForSelection={({ label }) => i18n.t(label)}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownIconPosition={"right"}
        rowTextStyle={styles.rowsText}
        renderDropdownIcon={(isOpened) => {
          return (
            <MaterialCommunityIcons
              name={isOpened ? "chevron-up" : "chevron-down"}
              size={30}
            />
          );
        }}
      />
    </View>
  );
}

// ----------------------------------------------------------------

const styles = StyleSheet.create({
  container: {},
  buttonStyle: {
    width: wp(90),
    marginHorizontal: wp(1),
    marginVertical: hp(2),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: theme.colors.placeholder,
    backgroundColor: "#f2f2f2",
  },
  buttonTextStyle: {
    // color: colors.white,
    // fontFamily: "Tajawal_500Medium",
    // fontSize: RFValue(25, 1024),
  },
  rowsText: {
    // fontFamily: "Tajawal_500Medium",
    // fontSize: RFValue(25, 1024),
  },
});
