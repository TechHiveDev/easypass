import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../Theme/global.styles";
import MyButton from "../../Components/MyButton";
import MyText from "../../Components/MyText";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const entities = [
    "Compound",
    "User",
    "UserCompound",
    "Invitation",
    "Scan",
    "Device",
  ];

  return (
    <SafeAreaView style={globalStyles.screen}>
      {entities?.map((entity, idx) => (
        <MyButton
          key={idx}
          onPress={() => navigate("List" + entity + "Screen")}
        >
          <MyText text={entity} />
        </MyButton>
      ))}
    </SafeAreaView>
  );
}
