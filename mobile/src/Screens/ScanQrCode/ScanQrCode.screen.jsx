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

// ======================================================================

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
  const currentCompound = useAppSelector(
    (state) => state?.auth?.currentCompound
  );
  const currentAddresses = invitationUser?.userCompound?.filter(
    (c) => currentCompound?.compoundId === c?.compoundId
  );
  console.log({ cid: currentCompound.compoundId, invitationUser, data });
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
    console.log(res);
    if (res?.data?.scan?.success) {
      Toast.show({ type: "success", text1: "accepted invitation" });
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
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          style={active ? { height: hp(75) } : { height: 0 }}
          onBarCodeScanned={active ? handleSuccess : undefined}
        />
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
              <>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: "green",
                      fontSize: 24,
                    },
                  ]}
                >
                  {message?.replace("QrCode", "QR Code")}
                </Text>
                {invitationData ? (
                  <>
                    <Text style={styles.txt}>
                      Visitor name: {invitationData?.name}
                    </Text>
                    <Text style={styles.txt}>
                      Notes: {invitationData?.notes}
                    </Text>
                  </>
                ) : null}

                <Text style={styles.txt}>
                  Resident name: {invitationUser?.name}
                </Text>
                <Text style={styles.txt}>
                  Resident phone: {invitationUser?.phone}
                </Text>
                <Text style={styles.txt}>
                  Resident ِAddress{currentAddresses?.length === 1 ? "" : "es"}:{" "}
                </Text>
                <Text style={styles.txt}>
                  {currentAddresses?.length === 1 ? (
                    currentAddresses[0].streetName +
                    " street - block " +
                    currentAddresses[0].blockNumber +
                    " - unit " +
                    currentAddresses[0].unitNumber
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      {currentAddresses?.map((a) => {
                        return (
                          <View key={a.id}>
                            <Text style={styles.txt}>
                              {a.streetName +
                                " street - block " +
                                a.blockNumber +
                                " - unit " +
                                a.unitNumber}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </Text>
                {invitationData ? (
                  <Text style={styles.txt}>
                    invite creation time :{" "}
                    {new Date(invitationData?.createdAt)
                      .toLocaleString("en-us", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")}
                  </Text>
                ) : null}
              </>
            )}
          </>
        ) : null}
        {!active ? (
          <Button onPress={clickToScan} text="scanQrCode" loading={isLoading} />
        ) : null}
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
    textAlign: "left",
  },
});
