import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Share } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Radios from "../../Components/Form/Radios";
import { useCreateMutation } from "../../API/api";
import { useAppSelector } from "../../Store/redux.hooks";
import { useFocusEffect } from "@react-navigation/native";

// =================================================================

export default function InviteGuest({}) {
  // ---------------------------------------------------

  const [sharing, setSharing] = useState(false);
  useFocusEffect(() => {
    setTimeout(() => {
      setSharing(false);
    }, 1000);
  });
  const [generateInviteLink, { isLoading, error }] = useCreateMutation();
  const defaultValues = { name: "", phone: "", type: "Delivery", notes: "" };

  // ---------------------------------------------------
  const { compoundId, userId } = useAppSelector(
    (s) => s?.auth?.currentCompound
  );

  // ---------------------------------------------------

  const onSubmit = async ({
    name,
    // phone,
    type,
    notes,
  }) => {
    setSharing(true);
    try {
      // const { data } = await generateInviteLink({
      //   entity: "generate-guest-link",
      //   body: {
      //     userId,
      //     compoundId,
      //     name,
      //     //   phone,
      //     type,
      //   },
      // });

      if (true) {
        // let message = data?.link;
        const result = await Share.share({ message: "mario" });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      }
    } catch (e) {
      console.error(error.message);
    } finally {
      // setSharing(false);
    }
  };

  // ---------------------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        {...{
          isLoading,
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
        <Input
          name="name"
          label="name"
          icon="account"
          required={false}
          noLabel={sharing}
        />
        {/* <Input name="phone" label="phone" icon="cellphone" required={false} /> */}
        <Input
          name="notes"
          label="notes"
          icon="pen"
          required={false}
          noLabel={sharing}
        />
        <Radios
          name="type"
          placeholder="invitationType"
          icon="cellphone"
          radios={[
            {
              label: "visitor",
              value: "Visitor",
            },
            {
              label: "delivery",
              value: "Delivery",
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
