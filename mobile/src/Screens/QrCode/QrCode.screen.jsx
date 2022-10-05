import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import SvgQRCode from "react-native-qrcode-svg";
import theme from "../../Theme/paper.theme";
import { futureDate } from "../../Components/Timer";
import { useTimer } from "react-timer-hook";
import { useCreateMutation } from "../../API/api";
import { useAppSelector } from "../../Store/redux.hooks";
import { useIsFocused } from "@react-navigation/native";
import { Circle } from "react-native-progress";
import { interpolate } from "react-native-reanimated";

// =================================================================

export default function QrCodeScreen() {
  // ---------------------------------------------------

  const [qrCode, setQrCode] = useState(new Date());
  const { seconds, restart, pause, isRunning } = useTimer({
    expiryTimestamp: futureDate({ date: new Date() }),
  });
  const { compoundId, userId } = useAppSelector(
    (s) => s?.auth?.currentCompound
  );

  const [generateQrCode] = useCreateMutation();
  const isFocused = useIsFocused();

  // ---------------------------------------------------

  const fetchQrCode = async () => {
    const { data } = await generateQrCode({
      entity: "generate-resident-qrcode",
      body: {
        compoundId,
        userId,
      },
    });

    if (data?.encryptedQrcode) {
      const { encryptedQrcode } = data;
      setQrCode(encryptedQrcode);
    }
  };

  // ---------------------------------------------------

  const updateQrCodeHandler = async () => {
    if (!isFocused) return pause();

    if (seconds < 10 && seconds > 0 && isRunning) return;

    if (seconds <= 10 && !isRunning) {
      return restart(futureDate({ date: new Date() }));
    }

    if (seconds === 0 && isRunning) {
      return restart(futureDate({ date: new Date() }));
    }

    if (seconds === 10) {
      await fetchQrCode();
      return restart(futureDate({ date: new Date(), seconds: 9 }));
    }

    return true;
  };

  // ---------------------------------------------------

  useEffect(() => {
    updateQrCodeHandler();
  }, [seconds, isFocused, isRunning]);

  // ---------------------------------------------------
  const animationValue = interpolate(seconds, [0, 9], [0, 1]);
  return (
    <SafeAreaView style={{ ...globalStyles.screen, ...styles.container }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Circle
          progress={animationValue}
          size={wp(80)}
          color={theme.colors.primary}
          style={{
            position: "absolute",
            top: -55,
          }}
        />
        <SvgQRCode size={wp(50)} value={qrCode.toString()} />
      </View>
      <View>
        <Text>{seconds}</Text>
      </View>
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
  },
  square: {
    borderColor: theme.colors.primary,
    borderWidth: 3.5,
    borderRadius: 10,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
  },
});
