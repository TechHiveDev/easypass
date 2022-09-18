import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import MyText from "../../../Components/MyText";
import i18n from "i18n-js";

// ====================================================================

// Dummy Data
const announcements = [
  {
    title: "Announcement 1",
    description: "Feature announcements is Comming soon",
  },
  {
    title: "The Marios",
    description: "mario announcements for announcements and any shit",
  },
  {
    title: "mario announcements",
    description: "mario announcements for announcements and any shit",
  },
];

// ====================================================================

function Announcement({
  item: { title = "", description = "", image = "https://picsum.photos/700" },
}) {
  return (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Card.Cover style={{ height: hp(15) }} source={{ uri: image }} />
        <Card.Title
          // title={i18n.t(title)}
          title={title}
          //   subtitle={i18n.t(description)}
          subtitle={description}
        />
      </Card>
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
