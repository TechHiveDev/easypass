import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// ===============================================

export default function MyButton({ onPress, ...props }) {
  // -------------------------------------

  const style = {
    ...styles.button,
    width: wp(props?.width || 29),
    height: hp(props?.height || 5),
    ...props.style,
  };

  // -------------------------------------

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {React?.Children.map(props?.children, (child) => {
        if (child) return React.cloneElement(child, props);
      })}
    </TouchableOpacity>
  );
}

// ===============================================

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 6,
    marginVertical: hp(0.5),
    marginHorizontal: wp(2),
  },
});
