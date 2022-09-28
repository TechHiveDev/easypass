import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, Paragraph, Dialog, Portal, Card } from "react-native-paper";
import { useState } from "react";
import MyText from "../../../Components/MyText";
import i18n from "i18n-js";

// ====================================================================

// Dummy Data
const announcements = [
  {
    title: "30% Sale H&M.",
    description: "30% Summer Sale on H&M.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png",
  },
  {
    title: "Golden Gym Discount",
    description: "10% discount for Golden Gym -Limited Offer",
    image: "https://www.egypttoday.com/siteimages/Larg/202008211123482348.jpg",
  },
  {
    title: "Papa Johns",
    description: "Papa Johns is opening Soon on Pyramids Heights.",
    image:
      "https://images.deliveryhero.io/image/talabat/restaurants/logo_(1)_637038116180008094.jpg",
  },
];

// ====================================================================

function Announcement({
  item: { title = "", description = "", image = "https://picsum.photos/700" },
}) {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true);
        console.log("E");
      }}
    >
      <Card style={styles.card}>
        <Card.Cover style={{ height: hp(15) }} source={{ uri: image }} />
        <Card.Title
          // title={i18n.t(title)}
          title={title}
          //   subtitle={i18n.t(description)}
          subtitle={description}
        />
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{description}</Paragraph>
            <Image
              style={{ height: hp(30) }}
              resizeMode="contain"
              source={{ uri: image }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}

// ====================================================================

export default function Announcements() {
  if (!announcements?.length) return;

  const renderItem = (props) => <Announcement {...props} />;

  return (
    <View style={styles.slider}>
      <MyText text={i18n.t("announcements")} style={styles.title} />
      <SafeAreaView>
        <FlatList
          horizontal={true}
          data={announcements}
          keyExtractor={(_, index) => index}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
}
// ====================================================================

const styles = StyleSheet.create({
  slider: {
    width: wp(92),
    marginVertical: hp(2),
    paddingVertical: hp(0.5),
  },
  card: {
    width: wp(65),
    flexDirection: "row",
    borderWidth: 1,
    marginRight: wp(2),
  },
  title: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    fontWeight: "bold",
  },
});
