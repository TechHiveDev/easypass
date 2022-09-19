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

// =================================================================

export default function QrCodeScreen() {
  // ---------------------------------------------------

  const [qrCode, setQrCode] = useState(new Date());
  const { seconds, restart } = useTimer({
    expiryTimestamp: futureDate({ oldDate: new Date() }),
  });
  const {
    currentCompoundId,
    user: { id },
  } = useAppSelector((s) => s?.auth);

  const [generateQrCode] = useCreateMutation();
  const [verifyQrCode] = useCreateMutation();

  // ---------------------------------------------------

  const updateQrCodeHandler = async () => {
    restart(futureDate({ oldDate: new Date() }));
    const { data } = await generateQrCode({
      entity: "generate-resident-qrcode",
      body: {
        compoundId: currentCompoundId,
        userId: id,
      },
    });

    if (data?.encryptedQrcode) {
      const { encryptedQrcode } = data;
      setQrCode(encryptedQrcode);
      const { data: verified } = await verifyQrCode({
        entity: "scan-qrcode",
        body: { encryptedQrcode },
      });
      console.log({ verified });
    }
  };

  // ---------------------------------------------------

  useEffect(() => {
    updateQrCodeHandler();
  }, []);

  // ---------------------------------------------------

  useEffect(() => {
    if (seconds <= 1) {
      updateQrCodeHandler();
    }
  });

  // ---------------------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen, ...styles.container }}>
      <View style={styles.square}>
        <SvgQRCode size={250} value={qrCode.toString()} />
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
