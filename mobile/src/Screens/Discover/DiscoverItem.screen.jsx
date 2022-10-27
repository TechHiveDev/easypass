import { Button, Paragraph, Text } from "react-native-paper";
import { Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import globalStyles from "../../Theme/global.styles";
import callPhone from "../../Utils/callPhone";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SingleDiscovery() {
  const route = useRoute();
  const { image, description, phone, from, to, address } = route.params;
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        { paddingHorizontal: 0, backgroundColor: theme.colors.transparentGrey },
      ]}
    >
      <ScrollView>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: image }}
        />
        <Paragraph
          style={[
            styles.text,
            {
              fontWeight: "bold",
            },
          ]}
        >
          Description:
        </Paragraph>
        <Paragraph style={styles.text}>{description}</Paragraph>
        <Paragraph
          style={[
            styles.text,
            {
              fontWeight: "bold",
            },
          ]}
        >
          Address:
        </Paragraph>
        <Paragraph style={styles.text}>{address}</Paragraph>
        <Paragraph
          style={[
            styles.text,
            {
              fontWeight: "bold",
            },
          ]}
        >
          Opening Hours:
        </Paragraph>
        <Paragraph style={styles.text}>
          {from} to {to}
        </Paragraph>
        <Paragraph
          style={[
            styles.text,
            {
              fontWeight: "bold",
            },
          ]}
        >
          Phone Number:
        </Paragraph>
        <Button
          onPress={() => callPhone(phone)}
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: wp(4.5),
            }}
          >
            {phone}
          </Text>
          <MaterialCommunityIcons
            name="phone-outline"
            size={wp(4.5)}
            color={theme.colors.primary}
          />
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    marginHorizontal: wp(3),
    marginTop: hp(1.2),
    fontSize: wp(4.5),
  },
  image: {
    width: wp(98),
    height: hp(35),
  },
});
