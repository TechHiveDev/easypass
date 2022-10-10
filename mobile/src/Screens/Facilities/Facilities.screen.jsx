import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "../../Components/Form/Button";
import globalStyles from "../../Theme/global.styles";
import Toast from "react-native-toast-message";

// =================================================================

// dummy data
const facilities = [
  {
    title: "Electricity",
    description: "50 EG",
    image: require("../../../assets/Electronic.png"),
  },
  {
    title: "Plumber",
    description: "100 EG",
    image: require("../../../assets/Plumbers.png"),
  },
  {
    title: "Car Wash",
    description: "30 EG",
    image: require("../../../assets/Car.png"),
  },
];

// =================================================================

function Facility({ image, title, description }) {
  // ------------------------------

  const requestFacility = () => {
    Toast.show({
      type: "success",
      text1: "Request sent and technician will contact you soon",
    });
  };

  // ------------------------------

  return (
    <Card style={styles.card}>
      <Card.Cover source={image} style={styles.image} />
      <Card.Content>
        <View style={styles.row}>
          <View style={styles.col}>
            {/* <Title>{i18n.t(title)}</Title> */}
            <Title>{title}</Title>
            {/* <Paragraph>{i18n.t(description)}</Paragraph> */}
            <Paragraph
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {description}
            </Paragraph>
          </View>
          <View>
            <Button
              // mode="outlined"
              text={"Send Request"}
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
