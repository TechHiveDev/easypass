/**
 *  Form Module
 *
 *
 *
 * @author MarioMonir
 */

// ----------------------------------------------------------------

import React from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useForm } from "react-hook-form";
import SubmitOrCancel from "./SubmitOrCancel";
import Toast from "react-native-toast-message";
import i18n from "i18n-js";
import theme from "../../Theme/paper.theme";

// ----------------------------------------------------------------

export default function Form({
  title = "Title",
  defaultValues,
  submitButton,
  submitText,
  submitIcon,
  onSubmit,
  cancelButton,
  cancelText,
  cancelIcon,
  onCancel,
  isLoading = false,
  error = null,
  children: childrens,
  useValues = null,
  btnsColumn,
  hideSubmitButton = false,
  disabled = false,
  ...reset
}) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  console.log(cancelButton);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState,
    formState: { isValid, errors, isSubmitted },
  } = useForm({
    defaultValues,
  });

  useValues = getValues;
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  /** Dont remove this section  */
  // if (Object.keys(errors)?.length) {
  //   Object.keys(errors).forEach((e) => {
  //     Toast.show({
  //       type: "error",
  //       text1: `🧐   ${e}  ${errors[e]?.type}   `,
  //     });
  //   });
  // }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  /** Dont remove this section it's a very important section */
  // if (isSubmitted) {
  //   Object.keys(getValues()).forEach((key) => {
  //     if (!getValues()[key]) {
  //       Toast.show({
  //         type: "error",
  //         text1: `🧐  ${i18n.t(key)}  ${i18n.t("required")} `,
  //       });
  //     }
  //   });
  // }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // if (error) if (error) return <LoadingOrErrorScreen {...{ error }} />;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaView style={styles.container}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.body}>
        <ScrollView style={styles.scroll}>
          {React.Children.map(
            childrens,
            (child, key) =>
              child &&
              React.cloneElement(child, {
                ...child.props,
                key,
                getValues,
                setValue,
                control,
                errors: formState?.errors,
                disabled,
              })
          )}
        </ScrollView>
        {!hideSubmitButton && (
          <SubmitOrCancel
            {...{
              isLoading,
              handleSubmit,
              submitButton,
              submitText,
              submitIcon,
              onSubmit,
              cancelButton,
              cancelText,
              cancelIcon,
              onCancel,
              btnsColumn,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// ----------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  title: { marginTop: hp(3), fontSize: 25, color: theme.colors.primary },
  body: {
    justifyContent: "space-between",
    flex: 1,
    // height: hp(85),
  },
  scroll: {
    // alignSelf: "center",
    // textAlign: "center",
    // width: wp(100),
  },
});
