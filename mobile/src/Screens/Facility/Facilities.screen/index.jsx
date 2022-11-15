import { FlashList } from "@shopify/flash-list";
import { Facility } from "./Facility";
import { useListContext } from "../../../Navigators/FacilityContext";
import globalStyles from "../../../Theme/global.styles";
import theme from "../../../Theme/paper.theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";

export default function FacilityScreen() {
  const { data, error, isLoading } = useListContext();
  if (error || isLoading) return null;
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
          padding: 0,
          paddingLeft: wp(7),
        },
      ]}
    >
      <FlashList
        data={data}
        renderItem={({ item }) => <Facility {...item} />}
        keyExtractor={(item) => item.name}
        estimatedItemSize={50}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
