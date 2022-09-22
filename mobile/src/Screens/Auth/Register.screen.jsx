import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Logo from "../../Components/Logo";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import SelectDropdown from "react-native-select-dropdown";
import { userTypes, levels } from "../../Config/constants";
import {
  useGetListQuery,
  useRegisterMutation,
  useGetCompoundsQuery,
} from "../../API/api";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import i18n from "i18n-js";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

// =================================================================

export default function RegisterScreen() {
  // ------------------------------

  const { navigate } = useNavigation();
  const [register] = useRegisterMutation();

  const { data: compounds, isLoading } = useGetCompoundsQuery();
  // console.log({ data });

  // ------------------------------

  const defaultValues = {
    name: "mario",
    email: "mario@mario.com",
    password: "mario",
    confirmPassword: "mario",
    type: "Resident",
    phone: "01201200777",
    streetName: "mario",
    blockNumber: "12",
    unitNumber: "23",
    compoundId: 0,
    active: false,
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
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating={true} size={50} />
        </View>
      ) : (
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
          <Controller
            name={"compoundId"}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <SelectDropdown
                  data={compounds}
                  onSelect={(c) => {
                    onChange(c.id);
                  }}
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
              );
            }}
          />
          <Input name="streetName" label="streetName" icon="home-group" />
          <Input name="blockNumber" label="blockNumber" icon="home" />
          <Input name="unitNumber" label="unitNumber" icon="key" />
          {/* <Select name="level" placeholder="level" choices={levels} /> */}
          {/* <Depend /> */}
        </Form>
      )}
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
});
