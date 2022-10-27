import { SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import UserCard from "./Components/UserCard";
import Announcements from "./Components/Annoucements";
import theme from "../../Theme/paper.theme";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
        },
      ]}
    >
      <ScrollView>
        <UserCard />
        <Announcements />
      </ScrollView>
    </SafeAreaView>
  );
}
