import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../Store/redux.hooks";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
// import { useScanQrCodeMutation } from "../../API/api";
import LoadingScreen from "../../Components/GenericScreens/Loading.screen";
import Toast from "react-native-toast-message";
// import theme from "../../Theme/paper.theme";
import Button from "../../Components/Form/Button";
import theme from "../../Theme/paper.theme";

// ======================================================================

export default function ScanQrCode() {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  // -----------------------------------------

  // const [scanQrCode, { isLoading }] = useScanQrCodeMutation();

  // -----------------------------------------

  const user = useAppSelector((state) => state?.auth?.user);

  // -----------------------------------------

  const [hasPermission, setHasPermission] = useState(null);
  const [active, setActive] = useState(false);
  const [scannedData, setScannedData] = useState(false);

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

  const logoutHandler = async () => {
    // await setAsyncStorageUser(null);
    // dispatch(resetUser());
  };

  // -----------------------------------------

  const handleSuccess = async ({ data }) => {
    // const res = await scanQrCode({ ticket_number: data });
    // let scanned;
    // if (res?.data?.status) {
    //   scanned = res?.data?.message;
    //   Toast.show({ type: "success", text1: scanned });
    // }
    // if (res?.error?.data?.error) {
    //   scanned = res?.error?.data?.error?.message;
    //   Toast.show({ type: "info", text1: scanned });
    // }
    // setScannedData(scanned);
    // setActive(!active);
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
    <View style={styles.container}>
      <Text style={styles.title}>Scan Qr Code</Text>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          style={active ? { height: hp(75) } : { height: 0 }}
          onBarCodeScanned={active ? handleSuccess : undefined}
        />

        {!active && scannedData ? (
          <Text style={styles.txt}>{scannedData}</Text>
        ) : null}

        {!active ? <Button onPress={clickToScan} text="scanQrCode" /> : null}
      </View>
    </View>
  );
}

// ==========================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp("5%"),
    backgroundColor: theme.colors.white,
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
    alignSelf: "center",
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
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 2 },
    elevation: 20,
  },
  logout: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.black,
    textAlign: "center",
  },
  txt: {
    fontSize: 20,
    textAlign: "center",
  },
});
