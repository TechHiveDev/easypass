import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import { useAppSelector } from "../../Store/redux.hooks";
import { useGetListQuery } from "../../API/api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function Discover({ photoUrl: image, title, description }) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("Single", {
      image,
      title,
      description,
    });
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: image }} style={styles.image} />
        <Card.Title title={title} subtitle={description} />
      </Card>
    </TouchableOpacity>
  );
}

// =================================================================

export default function DiscoverScreen() {
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const { data, isFetching, refetch, error, isLoading } = useGetListQuery({
    entity: `discover/compound/${currentCompoundId}`,
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && !isFetching) refetch();
  }, [isFocused]);
  if (isLoading || error || !data?.length) return null;
  return (
    <SafeAreaView style={{ ...globalStyles.screen, ...styles.background }}>
      <ScrollView>
        {data?.map((facility, index) => (
          <Discover key={index} {...facility} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
