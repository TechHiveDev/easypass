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
import { onlyNumbersCheck } from "../../Utils/string.util";
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
      blockNumber: `${currentCompound?.blockNumber}`,
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
    let tempImage = image;
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
        tempImage = config.API_URL + res.url;
      }
    }
    const res = await updateMyProfile({
      entity: "user",
      id,
      body: { email, name, phone, photoUrl: tempImage },
    });
    const data = res.data;
    if (data?.id) {
      Toast.show({
        type: "success",
        text1: "Profile details are updated successfully",
      });
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
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
        },
      ]}
    >
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
          /* to update the form when the current compound change*/
          key={currentCompound?.id}
          {...{
            defaultValues,
            isLoading: isLoading || uploadingImage,
            error,
            onSubmit,
            cancelButton: true,
            btnsColumn: false,
            title: "",
            submitText: "save",
            submitIcon: "check",
            hideSubmitButton,
            disabled: hideSubmitButton,
            onCancel: () => {
              setImage(photoUrl);
              setHideSubmitButton(!hideSubmitButton);
            },
          }}
        >
          <Input name="name" label="Name" icon="account" />
          <Input name="email" label="Email" icon="email" />
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
          {type === "Resident" ? (
            <Input
              name="compoundName"
              label="Compound"
              icon="office-building"
              disabled
              editable={false}
            />
          ) : null}

          {type === "Resident" ? (
            <Input
              name="streetName"
              label="Street Name"
              icon="home-group"
              disabled
              editable={false}
            />
          ) : null}
          {type === "Resident" ? (
            <Input
              name="blockNumber"
              label="Block number"
              icon="home"
              disabled
              editable={false}
            />
          ) : null}
          {type === "Resident" ? (
            <Input
              name="unitNumber"
              label="Unit Number"
              icon="key"
              disabled
              editable={false}
            />
          ) : null}
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
