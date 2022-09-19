import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MyText from "./MyText";
import { colors } from "../Theme/colors.theme";
import { useTimer } from "react-timer-hook";

// ====================================================================

export const futureDate = ({
    date = new Date(),
    seconds = 10,
    minutes = 0,
    hours = 0,
}) => {
    date.setSeconds(date.getSeconds() + seconds);
    date.setMinutes(date.getMinutes() + minutes);
    date.setHours(date.getHours() + hours);
    return date;
};

// ====================================================================

export function Timer({
    minutesToAdd = 5,
    startDate = new Date(),
    onExpire = () => {},
    showSeconds = true,
    showMinutes = true,
    showHours = true,
    showDays = true,
}) {
    // ----------------------------------------------------------

    const [expiryTimestamp, setExpiryTimestamp] = useState(
        futureDate({ oldDate: startDate })
    );

    // ----------------------------------------------------------

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {},
    });

    // ----------------------------------------------------------

    useEffect(() => {
        if (seconds === 0) {
            restart(futureDate({ oldDate: new Date() }));
        }
    }, [onExpire]);

    // ----------------------------------------------------------

    return (
        <View style={styles.container}>
            {showDays && <MyText text={days + " : "} />}
            {showHours && <MyText text={hours + " : "} />}
            {showMinutes && <MyText text={minutes + " : "} />}
            {showSeconds && <MyText text={seconds} />}
        </View>
    );
}

// =====================================================

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        marginVertical: hp(2),
        marginHorizontal: wp(1),
    },
    text: {
        color: "red",
        fontWeight: "bold",
        fontSize: 14,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 7,
    },
});
