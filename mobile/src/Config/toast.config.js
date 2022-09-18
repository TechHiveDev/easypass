import { View, Text, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const styles = StyleSheet.create({
  successContainer: {
    minHeight: 60,
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: "#35d45f",
  },
  successText: {
    fontWeight: "600",
  },
  errorContainer: {
    minHeight: 60,
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: "tomato",
  },
  errorText: {
    fontWeight: "600",
  },
});

//============================================================

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <View style={styles.successContainer}>
      <Text style={styles.successText}>{props.text1}</Text>
    </View>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.text1}</Text>
    </View>
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

// ----------------------------------------------------------------

export default toastConfig;
