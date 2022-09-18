import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar as SnackbarPaper } from "react-native-paper";

// =================================================================

export default function Snackbar({ message }) {
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  //   const action = {
  //     label: "Undo",
  //     onPress: () => onDismissSnackBar(),
  //   };

  return (
    <View style={styles.container}>
      <SnackbarPaper visible={visible} onDismiss={onDismissSnackBar}>
        {message}
      </SnackbarPaper>
    </View>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});
