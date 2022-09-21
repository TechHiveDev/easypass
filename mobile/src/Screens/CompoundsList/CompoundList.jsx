import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { ActivityIndicator, Divider, RadioButton } from "react-native-paper";
import React, { useState } from "react";
import { useGetCompoundsQuery } from "../../API/api";
import globalStyles from "../../Theme/global.styles";
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
import { useAppSelector } from "../../Store/redux.hooks";
export default function CompoundList({ navigation }) {
  const { data, isLoading } = useGetCompoundsQuery();
  //   console.log(data);
  const navigate = navigation;
  const [register, result] = useRegisterCompoundMutation();
  const { id } = useAppSelector((state) => state?.auth?.user);
  const onSubmit = async (values) => {
    try {
      const res = await register({ ...values, userId: id });
      alert(res);
    } catch (e) {
      console.log(e);
    }

    alert(JSON.stringify(values));
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
