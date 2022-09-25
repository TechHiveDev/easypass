import React, { useState } from "react";
import { SafeAreaView, Share } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Radios from "../../Components/Form/Radios";
import { useCreateMutation } from "../../API/api";
import { useAppSelector } from "../../Store/redux.hooks";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function InviteGuest({}) {
  const [sharing, setSharing] = useState(false);
  useFocusEffect(() => {
    setTimeout(() => {
      setSharing(false);
    }, 1000);
  });
  const [generateInviteLink, { isLoading, error }] = useCreateMutation();
  const defaultValues = { name: "", phone: "", type: "Delivery", notes: "" };
  const { compoundId, userId } = useAppSelector(
    (s) => s?.auth?.currentCompound
  );

  const onSubmit = async ({ name, type, notes }) => {
    setSharing(true);
    if (type === "Visitor" && name === "") {
      return Toast.show({
        type: "error",
        text1: "name is required for visitors",
      });
    }
    try {
      const { data } = await generateInviteLink({
        entity: "generate-guest-link",
        body: {
          userId,
          compoundId,
          name,
          type,
          notes,
        },
      });
      const url = data?.qrcode?.["link"];
      if (url) {
        await Share.share({ message: url });
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "error while generating invitation",
      });
    }
  };

  // ---------------------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        {...{
          isLoading,
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
