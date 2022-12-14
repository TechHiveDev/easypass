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
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

export default function Announcements() {
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const isFocused = useIsFocused();
  const {
    data: announcements,
    error,
    isLoading,
    refetch,
  } = useGetCompoundAnnouncementsQuery(currentCompoundId);
  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);
  const renderItem = (props) => <Announcement {...props} />;

  if (isLoading || error || !announcements?.length) return null;

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
