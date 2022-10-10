import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Announcement from "./Announcement";
import MyText from "../../../../Components/MyText";
import i18n from "i18n-js";
import { useGetCompoundAnnouncementsQuery } from "../../../../API/api";
import { useAppSelector } from "../../../../Store/redux.hooks";

export default function Announcements() {
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const {
    data: announcements,
    error,
    isLoading,
  } = useGetCompoundAnnouncementsQuery(currentCompoundId);
  if (isLoading || error || !announcements?.length) return null;

  const renderItem = (props) => <Announcement {...props} />;

  return (
    <View style={styles.slider}>
      <MyText text={i18n.t("announcements")} style={styles.title} />
      <SafeAreaView>
        <FlatList
          horizontal={true}
          data={announcements}
          keyExtractor={(a) => a.id}
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
  title: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    fontWeight: "bold",
  },
});
