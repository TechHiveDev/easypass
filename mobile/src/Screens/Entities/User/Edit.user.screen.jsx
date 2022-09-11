import React from "react";
import { SafeAreaView, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Wizard, useWizard } from "react-use-wizard";
import MyText from "../../../Components/MyText";
import MyButton from "../../../Components/MyButton";
import globalStyles from "../../../Theme/global.styles.js";

// ===========================================================

const styles = {
  width: 300,
  height: 300,
  justifyContent: "center",
  alignItems: "center",
};

// ===========================================================

const Step1 = () => {
  return (
    <View style={{ backgroundColor: "lightpink", ...styles }}>
      <MyText text="Step 1" />
    </View>
  );
};

// =======================================================

const Step2 = () => {
  return (
    <View style={{ backgroundColor: "lightgreen", ...styles }}>
      <MyText text="Step 2" />
    </View>
  );
};

// =======================================================

const Step3 = () => {
  return (
    <View style={{ backgroundColor: "lightblue", ...styles }}>
      <MyText text="Step 3" />
    </View>
  );
};

// =======================================================

const Header = () => {
  const { nextStep, previousStep, isFirstStep, isLastStep } = useWizard();
  return (
    <View style={{ flexDirection: "row" }}>
      {!isFirstStep && (
        <MyButton onPress={previousStep}>
          <MyText text="<- Back" />
        </MyButton>
      )}
      {!isLastStep && (
        <MyButton onPress={nextStep}>
          <MyText text="Next ->" />
        </MyButton>
      )}
    </View>
  );
};

// =======================================================

const Footer = () => {
  const { nextStep, previousStep, isFirstStep, isLastStep } = useWizard();
  return (
    <View style={{ flexDirection: "row" }}>
      {!isFirstStep && (
        <MyButton onPress={previousStep}>
          <MyText text="<- Back" />
        </MyButton>
      )}
      {!isLastStep && (
        <MyButton onPress={nextStep}>
          <MyText text="Next ->" />
        </MyButton>
      )}
    </View>
  );
};

// =======================================================

export default function EditUserScreen() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id, entity, data } = params;

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Wizard startIndex={0} header={<Header />} footer={<Footer />}>
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard>
    </SafeAreaView>
  );
}
