import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Controller } from "react-hook-form";
import { colors } from "../Theme/colors.theme";

// ========================================================

export default function Input(props) {
  const {
    name,
    control,
    placeholder,
    label = "",
    errors,
    numberOfLines = 1,
    hideBorder = false,
    hideLabel = false,
    required = true,
    inputWidth = 90,
    // icon,
  } = props;

  // --------------------------------------------

  //   const [passwordVisible, setPasswordVisible] = useState(true);
  const hideBodrderStyle = hideBorder ? styles.hideBorder : null;
  const widthStyle = { width: wp(inputWidth + "%") };
  const styleTextArea =
    numberOfLines > 1
      ? { textAlignVertical: "top" }
      : { textAlignVertical: "center" };

  // --------------------------------------------

  const requiredBorder = errors
    ? errors[name]
      ? styles.requiredBorder
      : null
    : null;

  // --------------------------------------------

  const render = ({ field: { onChange, onBlur, value } }) => (
    <TextInput
      style={{
        ...styles.input,
        ...styleTextArea,
        ...hideBodrderStyle,
        ...requiredBorder,
      }}
      autoCorrect={false}
      autoCapitalize="none"
      {...props}
      mode="outlined"
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      placeholderTextColor={colors.primary}
      textBreakStrategy={"balanced"}
    />
  );

  // --------------------------------------------

  return (
    <View style={{ ...styles.inputContainer, ...widthStyle }}>
      <Controller {...{ name, control, render }} rules={{ required }} />
      {errors[name] ? (
        <HelperText type="error" visible={errors[name]}>
          required !
        </HelperText>
      ) : null}
    </View>
  );
}

// ========================================================

const styles = StyleSheet.create({
  info: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  txtIcon: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  placeholder: {
    // fontWeight: "bold",
    // color: colors.primary,
    // fontSize: 25,
    // paddingHorizontal: wp("0.6%"),
  },
  inputContainer: {
    // width: wp("90%"),
    marginVertical: hp("1.2%"),
  },
  input: {
    // justifyContent: "flex-start",
    // flexWrap: "wrap",
    // borderColor: "#D8D8D8",
    // borderWidth: 1,
    // borderRadius: 7,
    // color: "black",
    // paddingVertical: hp("1%"),
    // paddingHorizontal: wp("2%"),
  },
  hideBorder: {
    // borderWidth: 0,
    // paddingVertical: hp("0%"),
    // paddingHorizontal: wp("0.7%"),
  },
  error: {
    // textAlign: "right",
    // color: "red",
  },
  requiredBorder: {
    borderColor: "red",
  },
});
