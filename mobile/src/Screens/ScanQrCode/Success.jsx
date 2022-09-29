import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Success = ({
  invitationData,
  invitationUser,
  currentAddresses,
  message,
}) => {
  console.log(invitationData);
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
          }}
        >
          {invitationData?.name ? (
            <Text style={styles.txt}>Name: {invitationData?.name}</Text>
          ) : null}
          <Text style={styles.txt}>Type: {invitationData?.type}</Text>
          {invitationData?.notes ? (
            <Text style={styles.txt}>Notes: {invitationData?.notes}</Text>
          ) : null}
          {invitationData?.createdAt ? (
            <Text style={styles.txt}>
              Time Of Invite :{" "}
              {new Date(invitationData?.createdAt)
                .toLocaleString("en-us", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View
        style={{
          position: "relative",
          marginTop: hp(9),
        }}
      >
        <View
          style={{
            borderColor: "#bebebe",
            borderWidth: 5,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -65,
            right: 90,
            zIndex: 2,
          }}
        >
          <Avatar.Image size={140} source={{ uri: invitationUser.photoUrl }} />
        </View>
        <View
          style={{
            borderColor: "#bebebe",
            borderWidth: 5,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            paddingTop: 80,
            width: wp(85),
            backgroundColor: "rgba(159,159,159,0.1)",
          }}
        >
          <Text
            style={[
              styles.txt,
              {
                fontSize: 30,
                color: "black",
                fontWeight: "bold",
              },
            ]}
          >
            {invitationUser?.name}
          </Text>
          <Text style={styles.txt}>{invitationUser?.phone}</Text>
          <Text style={styles.txt}>{invitationUser?.type}</Text>
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
                      <Text
                        style={[
                          styles.txt,
                          {
                            fontSize: 16,
                          },
                        ]}
                      >
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
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    fontSize: 20,
    textAlign: "left",
    color: "gray",
  },
});
export default Success;
