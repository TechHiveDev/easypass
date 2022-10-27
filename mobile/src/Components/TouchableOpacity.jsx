import React, { useState } from "react";
import { TouchableOpacity as TO } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const TouchableOpacity = ({ onPress, children }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TO
      style={{
        translateY: pressed ? hp(1) : 0,
      }}
      onPress={onPress}
      onPressIn={() => {
        setPressed(true);
      }}
      onPressOut={() => setPressed(false)}
    >
      {children}
    </TO>
  );
};

export default TouchableOpacity;
