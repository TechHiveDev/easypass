import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar, IconButton } from "react-native-paper";
import MyText from "../../Components/MyText";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import theme from "../../Theme/paper.theme";
import { useUpdateMutation } from "../../API/api";
import { useAppSelector, useAppDispatch } from "../../Store/redux.hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setUser } from "../../Store/Slices/auth.slice";

// =================================================================

export default function ProfileScreen() {
  // ---------------------------------------------------

  const [hideSubmitButton, setHideSubmitButton] = useState(true);
  const dispatch = useAppDispatch();
  const { id, name, email, phone, type } = useAppSelector(
    (state) => state?.auth?.user
  );
  const defaultValues = { email, name, phone };

  // ---------------------------------------------------

  const [updateMyProfile, { isLoading, error }] = useUpdateMutation();

  // ---------------------------------------------------

  const onSubmit = async ({ email, name, phone }) => {
    const { data } = await updateMyProfile({
      entity: "user",
      id,
      body: { email, name, phone },
    });

    if (data?.id) {
      Toast.show({ type: "success", text1: "Updated Successfully" });
      dispatch(setUser(data));
    }

    setHideSubmitButton(true);
  };

  // ---------------------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <Avatar.Image
            size={95}
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
          <View style={styles.icon}>
            <IconButton
              icon="pencil-box-outline"
              size={20}
              color={theme.colors.primary}
              onPress={() => setHideSubmitButton(!hideSubmitButton)}
            />
          </View>
          <MyText text={name} style={styles.name} />
          <MyText text={type} style={styles.type} />
          {/* <MyText text={address} style={styles.address} /> */}
          <Form
            {...{
              defaultValues,
              isLoading,
              error,
              onSubmit,
              cancelButton: false,
              btnsColumn: false,
              title: "",
              submitText: "save",
              submitIcon: "check",
              hideSubmitButton,
              disabled: hideSubmitButton,
            }}
          >
            <Input name="name" label="name" icon="account" />
            <Input name="email" label="email" icon="email" />
            <Input name="phone" label="phone" icon="cellphone" />
          </Form>
        </View>
      </ScrollView>
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
