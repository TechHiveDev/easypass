import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Logo from "../../Components/Logo";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import { userTypes, levels } from "../../Config/constants";
import { useGetListQuery } from "../../API/api";
import { useRegisterMutation } from "../../API/api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// =================================================================

export default function RegisterScreen() {
  // ------------------------------

  const { navigate } = useNavigation();
  const [register] = useRegisterMutation();

  // const { data } = useGetListQuery({ entity: "compounds" });
  // console.log({ data });

  // ------------------------------

  const defaultValues = {
    name: "mario",
    email: "mario@mario.com",
    password: "mario",
    confirmPassword: "mario",
    type: "Resident",
    phone: "01201200777",
    compoundName: "Murazik - OConner",
    streetName: "mario",
    blockNumber: "12",
    unitNumber: "23",
  };

  // ------------------------------

  const onSubmit = async (values) => {
    if (values.confirmPassword !== values.password) {
      return Toast.show({ type: "error", text1: "passwords do not match" });
    }

    const { data } = await register(values);
    if (data?.user?.id) {
      Toast.show({ type: "success", text1: "Successfully registered" });
      return navigate("login");
    }
  };

  // ------------------------------

  // Dont Delete Commented Parts
  /*
  const Depend = (props) => {
    const userType = props.getValues()?.userType;
    if (userType !== "Student") return null;
    return <Input name="phone" label="phone" icon="phone" {...props} />;
  };
  */

  // ------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        title=""
        {...{
          defaultValues,
          onSubmit,
          cancelButton: false,
          submitText: "register",
          submitIcon: "account-plus",
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
        <Input name="phone" label="phone" icon="cellphone" />
        <Input name="compoundName" label="compoundName" icon="home" />
        <Input name="streetName" label="streetName" icon="home" />
        <Input name="blockNumber" label="blockNumber" icon="home" />
        <Input name="unitNumber" label="unitNumber" icon="home" />
        {/* <Select name="level" placeholder="level" choices={levels} /> */}
        {/* <Depend /> */}
      </Form>
    </SafeAreaView>
  );
}
