import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Shadow } from "react-native-shadow-2";

const Success = ({ invitationData, invitationUser, currentAddresses }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
            <Text style={styles.whiteTxt}>Name: {invitationData?.name}</Text>
          ) : null}
          <Text style={styles.whiteTxt}>Type: {invitationData?.type}</Text>
          {invitationData?.notes ? (
            <Text style={styles.whiteTxt}>Notes: {invitationData?.notes}</Text>
          ) : null}
          {invitationData?.createdAt ? (
            <Text style={styles.whiteTxt}>
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
          width: wp(85),
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -65,
            zIndex: 3,
            width: "100%",
            elevation: 1,
          }}
        >
          <Shadow
            style={{
              borderColor: "#ffffff",
              borderWidth: 5,
              borderRadius: 100,
            }}
          >
            <Avatar.Image
              size={wp(35)}
              source={{ uri: invitationUser.photoUrl }}
            />
          </Shadow>
        </View>
        <Shadow
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              // borderColor: "#bebebe",
              // borderWidth: 5,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              paddingTop: 80,
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.8)",
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
        </Shadow>
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
  whiteTxt: {
    fontSize: 20,
    textAlign: "left",
    color: "rgb(238,238,238)",
  },
});
export default Success;
