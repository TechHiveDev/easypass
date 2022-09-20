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

// =================================================================

export default function QrCodeScreen() {
    // ---------------------------------------------------

    const [qrCode, setQrCode] = useState(new Date());
    const { seconds, restart, pause, isRunning } = useTimer({
        expiryTimestamp: futureDate({ oldDate: new Date() }),
    });
    const {
        currentCompoundId: compoundId,
        user: { id: userId },
    } = useAppSelector((s) => s?.auth);

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

        if (seconds === 10 && !isFocused) return;

        if (seconds <= 10 && isFocused && !isRunning) {
            return restart(futureDate({ oldDate: new Date() }));
        }

        if (seconds === 0 && isFocused && isRunning) {
            return restart(futureDate({ oldDate: new Date() }));
        }

        if (seconds === 10 && isFocused) {
            restart(futureDate({ oldDate: new Date(), seconds: 9 }));
            return await fetchQrCode();
        }

        return true;
    };

    // ---------------------------------------------------

    useEffect(() => updateQrCodeHandler());

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
