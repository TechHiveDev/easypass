import React from "react";
import { SafeAreaView, StyleSheet, Share } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Radios from "../../Components/Form/Radios";

// =================================================================

export default function ProfileScreen({
  name = "user name",
  phone = "01201200774",
  type = "delivery",
}) {
  // ---------------------------------------------------

  const defaultValues = { name, phone, type };

  // ---------------------------------------------------

  const onSubmit = async (values) => {
    const message = "hello world mario is pretty";
    try {
      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (e) {
      console.error(error.message);
    }
  };

  // ---------------------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        {...{
          //   isLoading,
          //   error,
          onCancel: () => navigate("register"),
          defaultValues,
          onSubmit,
          cancelButton: false,
          btnsColumn: false,
          title: "",
          submitText: "invite",
          submitIcon: "qrcode",
        }}
      >
        <Input name="name" label="name" icon="account" />
        <Input name="phone" label="phone" icon="cellphone" />
        <Radios
          name="type"
          placeholder="invitationType"
          icon="cellphone"
          radios={[
            {
              label: "guest",
              value: "guest",
            },
            {
              label: "delivery",
              value: "delivery",
            },
          ]}
        />
      </Form>
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: hp(80),
  },
  image: {
    marginBottom: hp(1),
  },
  icon: {
    marginTop: -hp(5),
    marginLeft: wp(23),
    // top: hp(1),
  },
  name: {
    fontSize: wp(6),
    fontWeight: "bold",
  },
  type: {
    fontSize: wp(4.5),
    marginVertical: hp(1),
    color: "grey",
    fontWeight: "bold",
  },
  address: {
    color: "grey",
    fontSize: wp(4),
    marginBottom: hp(2),
  },
});
