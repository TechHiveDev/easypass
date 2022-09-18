import { View, StyleSheet } from "react-native";
import Button from "./Button";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// =================================================================

export default function SubmitOrCancel({
  isLoading,
  handleSubmit,
  submitButton = true,
  submitIcon = "check",
  cancelIcon = "cancel",
  cancelButton = false,
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit = (values) => null,
  onCancel = null,
  btnsColumn = true,
}) {
  return (
    <View style={btnsColumn ? styles.container2 : styles.container1}>
      {cancelButton && (
        <Button
          icon={cancelIcon}
          text={cancelText}
          mode="outlined"
          onPress={onCancel}
          width={btnsColumn ? wp(90) : wp(40)}
        />
      )}
      {submitButton && (
        <Button
          loading={isLoading}
          text={submitText}
          icon={submitIcon}
          onPress={handleSubmit(onSubmit)}
          width={btnsColumn ? wp(90) : wp(40)}
        />
      )}
    </View>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container1: {
    marginBottom: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container2: {
    marginBottom: hp(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
});
