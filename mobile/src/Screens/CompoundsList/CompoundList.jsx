import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React from "react";
import { useGetCompoundsQuery } from "../../API/api";
import theme from "../../Theme/paper.theme";
import { useRegisterCompoundMutation } from "../../API/api";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import SelectDropdown from "react-native-select-dropdown";
import { Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../Store/redux.hooks";
import { setCompountId } from "../../Store/Slices/auth.slice";
import Toast from "react-native-toast-message";

export default function CompoundList({ navigation }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCompoundsQuery();
  const [register] = useRegisterCompoundMutation();
  const { id } = useAppSelector((state) => state?.auth?.user);
  const onSubmit = async (values) => {
    const newValues = {
      userId: +id,
      compoundId: +values.compoundId,
      streetName: values.streetName,
      blockNumber: +values.blockNumber,
      unitNumber: +values.unitNumber,
    };
    try {
      const res = await register(newValues);
      if (res?.data?.id) {
        dispatch(setCompountId(id));
        navigation.navigate("HomeStackTabNavigator");
        Toast.show({
          type: "success",
          text1: "Registered in compound successfully ",
        });
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1:
          e.toString() || "error while registering. please try again later",
      });
    }
  };
  return (
    <View style={{ flex: 1, paddingTop: hp(5) }}>
      {isLoading ? (
        <ActivityIndicator animating={true} size={50} />
      ) : (
        <Form
          title=""
          {...{
            onSubmit,
            cancelButton: false,
            submitText: "register",
            submitIcon: "account-plus",
          }}
        >
          <Controller
            name={"compoundId"}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <SelectDropdown
                  data={data}
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
          <Input name="streetName" label="streetName" icon="home" />
          <Input name="blockNumber" label="blockNumber" icon="home" />
          <Input name="unitNumber" label="unitNumber" icon="home" />
          {/* <Select name="level" placeholder="level" choices={levels} /> */}
          {/* <Depend /> */}
        </Form>
      )}
    </View>
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
