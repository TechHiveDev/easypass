// =================================================================
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import theme from "../../../Theme/paper.theme";
import { SafeAreaView, StyleSheet } from "react-native";
import globalStyles from "../../../Theme/global.styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const Container = ({ children }) => {
  const navigation = useNavigation();
  return (
    <>
      <Appbar.Header style={styles.header} statusBarHeight={0}>
        <Appbar.BackAction
          color={theme.colors.primary}
          disabled={true}
          style={{
            opacity: 0,
          }}
        />
        <Appbar.Content title={"Facilities"} titleStyle={styles.content} />
        <Appbar.Action
          color={theme.colors.primary}
          icon={"calendar"}
          onPress={() =>
            navigation.navigate("FacilityNotifications", {
              title: "Requests",
              allowBack: true,
            })
          }
        />
      </Appbar.Header>
      <SafeAreaView
        style={[
          globalStyles.screen,
          {
            backgroundColor: theme.colors.transparentGrey,
          },
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.transparentGrey,
    width: wp(94.5),
    marginHorizontal: wp(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.colors.grey,
    borderBottomWidth: hp(0.1),
  },
  content: {
    fontSize: 22,
    fontWeight: "500",
    color: theme.colors.primary,
    textAlign: "center",
  },
});
