import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "../../Components/Form/Button";
import globalStyles from "../../Theme/global.styles";
import i18n from "i18n-js";

// =================================================================

// dummy data
const facilities = [
  {
    title: "Samasemo",
    description: "You are doing so well",
    image: "https://picsum.photos/700",
  },
  {
    title: "Samasemo",
    description: "You are doing so well",
    image: "https://picsum.photos/700",
  },
  {
    title: "Samasemo",
    description: "You are doing so well",
    image: "https://picsum.photos/700",
  },
];

// =================================================================

function Facility({ image, title, description }) {
  // ------------------------------

  const requestFacility = () => {};

  // ------------------------------

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: image }} style={styles.image} />
      <Card.Content>
        <View style={styles.row}>
          <View style={styles.col}>
            {/* <Title>{i18n.t(title)}</Title> */}
            <Title>{title}</Title>
            {/* <Paragraph>{i18n.t(description)}</Paragraph> */}
            <Paragraph>{description}</Paragraph>
          </View>
          <View>
            <Button
              mode="outlined"
              text={"request"}
              icon={false}
              onPress={requestFacility}
              width={wp(20)}
              maxWidth={wp(50)}
              paddingVertical={wp(0)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

// =================================================================

export default function Facilities() {
  return (
    <SafeAreaView style={{ ...globalStyles.screen, ...styles.background }}>
      <ScrollView>
        {facilities?.map((facility, index) => (
          <Facility key={index} {...facility} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  background: {},
  card: {
    marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  image: {
    height: hp(20),
  },
  row: {
    ...globalStyles.rowView,
    marginVertical: hp(1),
  },
  col: {
    width: wp(45),
  },
});
