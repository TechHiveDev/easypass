import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgQRCode from "react-native-qrcode-svg";
import theme from "../Theme/paper.theme";
import { futureDate } from "./Timer";
import useTimer from "../Utils/useTimer";
import { useCreateMutation } from "../API/api";
import { useAppSelector } from "../Store/redux.hooks";
import { useIsFocused } from "@react-navigation/native";
import { interpolate } from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import globalStyles from "../Theme/global.styles";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function QrCode() {
  const [qrCode, setQrCode] = useState(new Date());
  const { milliseconds, seconds, restart, pause, isRunning } = useTimer({
    expiryTimestamp: futureDate({ date: new Date() }),
  });
  const { compoundId, userId } = useAppSelector(
    (s) => s?.auth?.currentCompound
  );
  const [generateQrCode] = useCreateMutation();
  const isFocused = useIsFocused();

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

  const updateQrCodeHandler = async () => {
    if (!isFocused) {
      pause();
      return;
    }
    if (seconds < 10 && seconds > 0 && isRunning) return;

    if (seconds <= 10 && !isRunning) {
      restart(futureDate({ date: new Date() }));
      return;
    }

    if (seconds === 0 && isRunning) {
      restart(futureDate({ date: new Date() }));
      return;
    }

    if (seconds === 10) {
      await fetchQrCode();
      restart(futureDate({ date: new Date(), seconds: 9 }));
      return;
    }

    return true;
  };

  useEffect(() => {
    updateQrCodeHandler();
  }, [seconds, isFocused, isRunning]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(milliseconds, [0, 10], [500, 100]),
  }));
  if (!isFocused) return null;
  return (
    <SafeAreaView style={styles.container}>
      <Svg
        height="92%"
        width={"92%"}
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          top: hp(1.4),
        }}
      >
        <AnimatedRect
          x="10"
          y="10"
          width="80"
          height="80"
          stroke={theme.colors.primary}
          strokeWidth="2"
          strokeDasharray={"480"}
          animatedProps={animatedProps}
        ></AnimatedRect>
      </Svg>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgQRCode size={wp(50)} value={qrCode.toString()} />
      </View>
      {/*<View>*/}
      {/*  <Text>{seconds}</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(80),
    height: hp(35),
  },
});
