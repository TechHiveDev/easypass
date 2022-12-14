import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Controller } from "react-hook-form";
import theme from "../../Theme/paper.theme";
import i18n from "i18n-js";
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  Layout,
} from "react-native-reanimated";
import { toReadableText } from "../../Utils/string.util";
// ========================================================
export default function Input(props) {
  const {
    name,
    control,
    errors,
    numberOfLines = 1,
    required = true,
    inputWidth = 90,
    icon = name === "password" ? "lock" : "account",
    mode = "",
    autoCorrect = false,
    autoCapitalize = "none",
    secureTextEntry = null,
    label,
    rules = {},
    noLabel = false,
    animate = false,
    editable = true,
  } = props;
  // --------------------------------------------

  const [passwordVisible, setPasswordVisible] = useState(true);
  const widthStyle = { width: wp(inputWidth + "%") };
  const styleTextArea =
    numberOfLines > 1
      ? { textAlignVertical: "top" }
      : { textAlignVertical: "center" };

  // --------------------------------------------

  const toggleVisible = () => setPasswordVisible(!passwordVisible);
  // --------------------------------------------

  const requiredBorder = errors ? (errors[name] ? "red" : null) : null;

  // --------------------------------------------

  const render = ({ field: { onChange: onChangeText, onBlur, value } }) => (
    <TextInput
      style={
        props.editable !== false
          ? {
              ...styles.input,
              ...styleTextArea,
              // borderRaduis: 20,
            }
          : {
              ...styles.input,
              ...styleTextArea,
              ...styles.disabled,
            }
      }
      {...{
        mode,
        autoCorrect,
        autoCapitalize,
        onChangeText,
        value,
        onBlur,
        outlineColor: requiredBorder,
        ...props,
        disabled: !editable || props.disabled,
        secureTextEntry: secureTextEntry ? passwordVisible : null,
        label: noLabel
          ? false
          : i18n.t(label || name).startsWith("[missing")
          ? label
          : i18n.t(label || name),
      }}
      // theme={{ roundness: 15 }}
      placeholderTextColor={theme.colors.accent}
      textBreakStrategy={"balanced"}
      left={<TextInput.Icon name={icon} color={theme.colors.grey} />}
      right={
        secureTextEntry ? (
          <TextInput.Icon
            name={passwordVisible ? "eye" : "eye-off"}
            onPress={toggleVisible}
          />
        ) : null
      }
    />
  );

  // --------------------------------------------
  return (
    <Animated.View
      entering={animate ? LightSpeedInLeft.delay(props.delay) : undefined}
      exiting={animate ? LightSpeedOutLeft.delay(props.delay) : undefined}
      layout={animate ? Layout.springify() : undefined}
      style={{ ...styles.inputContainer, ...widthStyle }}
    >
      <Controller
        {...{ name, control, render }}
        rules={{ required, ...rules }}
      />
      {errors && errors[name] ? (
        <HelperText
          type="error"
          visible={errors[name]}
          style={{ textAlign: "right" }}
        >
          {errors[name]["type"] === "required"
            ? toReadableText(name) + " " + i18n.t("required")
            : toReadableText(errors[name]["type"])}
        </HelperText>
      ) : null}
    </Animated.View>
  );
}

// ========================================================

const styles = StyleSheet.create({
  info: {},
  txtIcon: {},
  placeholder: {},
  inputContainer: {
    alignSelf: "center",
    marginVertical: hp("1.2%"),
  },
  input: {
    backgroundColor: "transparent",
  },
  disabled: {
    color: "red",
  },
  error: {},
  requiredBorder: {
    backgroundColor: "green",
    borderColor: "red",
  },
});
