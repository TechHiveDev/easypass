import { Paragraph } from "react-native-paper";
import { Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import globalStyles from "../../Theme/global.styles";

export default function SingleDiscovery() {
  const route = useRoute();
  const { image, description } = route.params;
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView style={styles.background}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: image }}
        />
        <Paragraph style={styles.text}>{description}</Paragraph>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    marginTop: hp(4),
    marginHorizontal: wp(3),
    fontSize: wp(5),
  },
  image: { width: wp(100), height: hp(40) },
  background: {
    backgroundColor: theme.colors.white,
  },
});
