import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import { useScanQrCodeMutation } from "../../API/api";
import Toast from "react-native-toast-message";
import Button from "../../Components/Form/Button";
import theme from "../../Theme/paper.theme";
import { useAppSelector } from "../../Store/redux.hooks";
import Success from "./Success";
import { LinearGradient } from "expo-linear-gradient";

// ======================================================================

// dummy data
// const invitationUser = {
//   name: "Jan Karam",
//   phone: "4545454545",
//   photoUrl: "https://picsum.photos/900",
//   type: "Resident",
//   userCompound: [
//     {
//       id: 1,
//       streetName: "haga",
//       blockNumber: 89,
//       unitNumber: 20,
//       compoundId: 1,
//     },
//     {
//       id: 2,
//       streetName: "haga",
//       blockNumber: 89,
//       unitNumber: 250,
//       compoundId: 1,
//     },
//     {
//       id: 3,
//       streetName: "haga",
//       blockNumber: 89,
//       unitNumber: 420,
//       compoundId: 1,
//     },
//   ],
// };
// const currentCompoundId = 1;
// const isLoading = false;
// const data = {
//   scan: {
//     success: true,
//   },
//   message: "yeahhhhhhhhh",
// };
export default function ScanQrCode() {
  const isFocused = useIsFocused();

  // -----------------------------------------

  const [scanQrCode, { data, isLoading }] = useScanQrCodeMutation();
  const success = data?.scan?.success;
  const message = data?.message;
  const invitationData = data?.invitation;
  const invitationUser = invitationData?.user || data?.user;
  const [hasPermission, setHasPermission] = useState(null);
  const [active, setActive] = useState(false);
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const currentAddresses = invitationUser?.userCompound?.filter(
    (c) => currentCompoundId === c?.compoundId
  );
  // -----------------------------------------

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestCameraPermission();
  }, []);

  // -----------------------------------------

  useEffect(() => {
    if (!isFocused) {
      setActive(false);
    }
  });
  // -----------------------------------------

  const handleSuccess = async ({ data }) => {
    setActive(!active);
    const res = await scanQrCode({ encryptedQrcode: data, deviceId: 1 });
    if (res?.data?.scan?.success) {
      Toast.show({
        type: "success",
        text1: invitationData ? "accepted invitation" : "accepted resident",
      });
    } else {
      Toast.show({
        type: "error",
        text1: res?.data?.message?.replace("QrCode", "QR Code"),
      });
    }
    setActive(!active);
  };

  // -----------------------------------------

  const clickToScan = () => setActive(!active);

  // -----------------------------------------

  if (!hasPermission) {
    return (
      <View style={styles.noPermission}>
        <Text style={styles.noPermissionText}>
          Camera permission is not granted
        </Text>
      </View>
    );
  }

  // -----------------------------------------

  if (!isFocused) return <View></View>;

  // if (isLoading) return <LoadingScreen />;

  // -----------------------------------------

  return (
    <LinearGradient
      colors={["#4387D2", "#2F37A3"]}
      style={styles.container}
      // colors={[theme.colors.primary, "transparent"]}
    >
      {active ? (
        <View style={styles.barcodeContainer}>
          <BarCodeScanner
            style={active ? { height: hp(75) } : { height: 0 }}
            onBarCodeScanned={active ? handleSuccess : undefined}
          />
        </View>
      ) : null}
      <View>
        {!active && data ? (
          <>
            {!success ? (
              <Text
                style={{
                  color: "red",
                  fontSize: 24,
                }}
              >
                {message?.replace("QrCode", "QR Code")}
              </Text>
            ) : (
              <Success
                invitationUser={invitationUser}
                currentAddresses={currentAddresses}
                message={message}
                invitationData={invitationData}
              />
            )}
          </>
        ) : null}
        {!active ? (
          <Button
            onPress={clickToScan}
            text="scanQrCode"
            loading={isLoading}
            width={wp(85)}
            customStyle={{
              marginTop: data ? hp(1) : hp(30),
            }}
          />
        ) : null}
      </View>
    </LinearGradient>
  );
}

// ==========================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp("5%"),
    paddingHorizontal: wp("5%"),
    justifyContent: "space-between",
  },
  noPermission: {
    height: hp(120),
    backgroundColor: theme.colors.white,
    paddingVertical: hp(2),
    justifyContent: "center",
  },
  noPermissionText: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 25,
    color: theme.colors.primary,
    paddingVertical: hp(25),
  },
  title: {
    color: theme.colors.primary,
    fontSize: 30,
    textAlign: "center",
  },
  barcodeContainer: {
    height: hp(85),
    justifyContent: "center",
  },
  tools: {
    width: wp(88.5),
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  btnLogout: {
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  scanBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    marginHorizontal: wp(3),
    marginVertical: hp(3),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    textAlign: "center",
    alignItems: "center",
  },
  logout: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.black,
    textAlign: "center",
  },
  txt: {
    fontSize: 20,
    textAlign: "left",
  },
});
