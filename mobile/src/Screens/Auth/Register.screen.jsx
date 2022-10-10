import React, { useEffect, useState } from "react";

import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import SelectDropdown from "react-native-select-dropdown";
import { useRegisterMutation, useGetCompoundsQuery } from "../../API/api";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import i18n from "i18n-js";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, HelperText, RadioButton } from "react-native-paper";
import { onlyNumbersCheck } from "../../Utils/string.util";

// =================================================================
const randomNumber = Math.round(Math.random() * 100);
const defaultValues = {
  name: "mario",
  email: `mario${randomNumber}@mario.com`,
  password: "mario",
  confirmPassword: "mario",
  phone: `0120120${randomNumber}777`,
  streetName: "mario",
  blockNumber: "12",
  unitNumber: "23",
  compoundId: "",
  active: false,
};
export default function RegisterScreen() {
  // ------------------------------

  const { navigate } = useNavigation();
  const [register, { isLoading: registering }] = useRegisterMutation();
  const { data: compounds } = useGetCompoundsQuery();
  const [userType, setUserType] = useState("Resident");
  const [loading, setLoading] = useState(false);

  // ------------------------------

  const onSubmit = async (values) => {
    if (values.compoundId === "") {
      return Toast.show({ type: "error", text1: "Please select a compound" });
    }
    if (values.confirmPassword !== values.password) {
      return Toast.show({ type: "error", text1: "passwords do not match" });
    }
    const res = await register({ ...values, type: userType });
    if (
      res?.error?.data?.message ===
      " Unique Constraint Violation on : User_email_key"
    ) {
      return Toast.show({
        type: "error",
        text1: "User already exists with this email.",
      });
    }
    if (
      res?.error?.data?.message ===
      " Unique Constraint Violation on : User_phone_key"
    ) {
      return Toast.show({
        type: "error",
        text1: "User already exists with this phone number.",
      });
    }
    if (res?.data?.user?.id) {
      Toast.show({
        type: "success",
        text1:
          "Successfully registered. Waiting for admin activation or approval.",
      });
      return navigate("login");
    } else {
      return Toast.show({
        type: "error",
        text1: res.error.data.message || "error while logging in",
      });
    }
  };

  // ------------------------------
  useEffect(() => {
    if (compounds) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [compounds]);
  // Dont Delete Commented Parts
  /*
  const Depend = (props) => {
    const userType = props.getValues()?.userType;
    if (userType !== "Student") return null;
    return <Input name="phone" label="phone" icon="phone" {...props} />;
  };
  */

  // ------------------------------
  if (loading)
    return (
      <SafeAreaView style={globalStyles.screen}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating={true} size={50} />
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        title=""
        {...{
          defaultValues,
          onSubmit,
          submitText: "register",
          submitIcon: "account-plus",
          isLoading: registering,
          cancelButton: false,
        }}
      >
        <Input name="name" label="name" icon="account" />
        <Input name="email" label="email" icon="email" />
        <Input name="password" label="password" secureTextEntry />
        <Input
          name="confirmPassword"
          label="confirmPassword"
          secureTextEntry
          icon="lock-check"
        />
        <Input
          name="phone"
          label="Phone"
          icon="cellphone"
          rules={{
            validate: {
              phoneMustBeANumberOnly: (v) => onlyNumbersCheck(v),
              positiveNumberIsRequiredForPhone: (v) => parseInt(v) > 0,
            },
          }}
        />
        <Controller
          name={"compoundId"}
          rules={{
            validate: {
              required: (v) => v !== "",
            },
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <SelectDropdown
                  data={compounds}
                  onSelect={(c) => {
                    onChange(c.id);
                  }}
                  defaultButtonText={"Choose a compound"}
                  buttonTextAfterSelection={(c) => c.name}
                  rowTextForSelection={(c) => c.name}
                  buttonStyle={styles.buttonStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <MaterialCommunityIcons
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        size={30}
                      />
                    );
                  }}
                />
                {value === "" ? (
                  <HelperText
                    type="error"
                    visible={true}
                    style={{ textAlign: "right" }}
                  >
                    Compound {i18n.t("required")}
                  </HelperText>
                ) : null}
              </>
            );
          }}
        />
        {userType === "Resident" ? (
          <Input
            animate
            name="streetName"
            label="streetName"
            icon="home-group"
          />
        ) : null}
        {userType === "Resident" ? (
          <Input
            animate
            delay={100}
            name="blockNumber"
            label="blockNumber"
            icon="home"
            rules={{
              validate: {
                blockNumberMustBeANumberOnly: (v) => onlyNumbersCheck(v),
                positiveNumberIsRequiredForBlockNumber: (v) => parseInt(v) > 0,
              },
            }}
          />
        ) : null}
        {userType === "Resident" ? (
          <Input
            animate
            delay={200}
            name="unitNumber"
            label="unitNumber"
            icon="key"
            rules={{
              validate: {
                unitNumberMustBeANumberOnly: (v) => onlyNumbersCheck(v),
                positiveNumberIsRequiredForUnitNumber: (v) => parseInt(v) > 0,
              },
            }}
          />
        ) : null}
        <View style={styles.row}>
          <RadioButton
            color={theme.colors.primary}
            value={"Resident"}
            status={userType === "Resident" ? "checked" : "unchecked"}
            onPress={() => {
              setUserType("Resident");
            }}
          />
          <Text>Resident</Text>
          <RadioButton
            color={theme.colors.primary}
            value={"Security"}
            status={userType === "Security" ? "checked" : "unchecked"}
            onPress={() => {
              setUserType("Security");
            }}
          />
          <Text>Security</Text>
        </View>
        {/* <Select name="level" placeholder="level" choices={levels} /> */}
        {/* <Depend /> */}
      </Form>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    width: wp(90),
    marginHorizontal: wp(1),
    marginVertical: hp(2),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: theme.colors.placeholder,
    backgroundColor: "#f2f2f2",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
