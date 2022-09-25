import React, { useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar as PaperAvatar, IconButton } from "react-native-paper";
import MyText from "../../Components/MyText";
import globalStyles from "../../Theme/global.styles";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import theme from "../../Theme/paper.theme";
import { useUpdateMutation } from "../../API/api";
import { useAppSelector, useAppDispatch } from "../../Store/redux.hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setUser } from "../../Store/Slices/auth.slice";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import config from "../../Config/config";
// =================================================================

export default function ProfileScreen() {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [hideSubmitButton, setHideSubmitButton] = useState(true);
  const dispatch = useAppDispatch();
  const { id, name, email, phone, type, photoUrl } = useAppSelector(
    (state) => state?.auth?.user
  );
  const accessToken = useAppSelector((state) => state?.auth?.accessToken);
  const currentCompound = useAppSelector(
    (state) => state?.auth?.currentCompound
  );
  const defaultValues = useMemo(
    () => ({
      email,
      name,
      phone,
      photoUrl,
      compoundName: `${currentCompound?.compoundName}`,
      streetName: `${currentCompound?.streetName}`,
      unitNumber: `${currentCompound?.unitNumber}`,
    }),
    [email, name, phone, photoUrl, currentCompound]
  );
  const [updateMyProfile, { isLoading, error }] = useUpdateMutation();
  // ---------------------------------------------------

  const [image, setImage] = useState(photoUrl);
  const onSubmit = async ({ email, name, phone }) => {
    if (
      defaultValues.email === email &&
      defaultValues.name === name &&
      defaultValues.phone === phone &&
      defaultValues.photoUrl === image
    ) {
      return setHideSubmitButton(true);
    }
    if (defaultValues.photoUrl !== image) {
      setUploadingImage(true);
      const uploadResult = await FileSystem.uploadAsync(
        config.API_URL + "/api/upload?clientId=" + id,
        image,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "demo_image",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const res = JSON.parse(uploadResult.body);
      if (res?.url) {
        setImage(config.API_URL + res.url);
      }
    }
    const { data } = await updateMyProfile({
      entity: "user",
      id,
      body: { email, name, phone, photoUrl: image },
    });

    if (data?.id) {
      Toast.show({ type: "success", text1: "Updated Successfully" });
      dispatch(setUser(data));
    }
    setUploadingImage(false);
    setHideSubmitButton(true);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // ---------------------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={styles.container}>
        <TouchableOpacity disabled={hideSubmitButton} onPress={pickImage}>
          <PaperAvatar.Image
            size={95}
            source={
              image ? { uri: image } : require("../../../assets/profile.png")
            }
            style={styles.image}
          />
        </TouchableOpacity>
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
            isLoading: isLoading || uploadingImage,
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
          <Input
            name="compoundName"
            label="compound"
            icon="home-group"
            disabled
            editable={false}
          />
          <Input
            name="streetName"
            label="street name"
            icon="home"
            disabled
            editable={false}
          />
          <Input
            name="unitNumber"
            label="unit number"
            icon="key"
            disabled
            editable={false}
          />
        </Form>
      </View>
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
