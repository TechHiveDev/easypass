import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import { SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../../API/api";
import { useAppDispatch } from "../../Store/redux.hooks";
import { setAuthUser } from "../../Store/Slices/auth.slice";
import Logo from "../../Components/Logo";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";

// =================================================================

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // -------------------------------------

  const defaultValues = {
    email: "resident@email.com",
    password: "12345",
  };

  // -------------------------------------

  const onSubmit = async (values) => await login(values);

  // -------------------------------------

  useEffect(() => {
    (async () => {
      if (data && data?.user && data?.accessToken) {
        await AsyncStorage.setItem("accessToken", data?.accessToken);
        dispatch(setAuthUser(data));
      }
    })();
  }, [data]);

  // -------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <Logo
        width={500}
        height={170}
        source={{ uri: "https://picsum.photos/900" }}
      />
      <View style={styles.body}>
        <Form
          {...{
            isLoading,
            error,
            onCancel: () => navigate("register"),
            defaultValues,
            onSubmit,
            cancelButton: true,
            cancelText: "register",
            cancelIcon: "account-plus-outline",
            title: "Easy Pass",
            submitText: "login",
            submitIcon: "login",
          }}
        >
          <Input name="email" label="email" icon="email" />
          <Input name="password" label="password" secureTextEntry />
        </Form>
      </View>
      <StatusBar hidden />
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -hp(4),
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0,
  },
});
