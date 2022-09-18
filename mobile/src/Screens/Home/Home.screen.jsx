import { SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import UserCard from "./Components/UserCard";
import Announcements from "./Components/Announcements";
import Actions from "./Components/Actions";

// =================================================================

export default function HomeScreen({ type = "Just Home" }) {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView>
        <UserCard />
        <Announcements />
        <Actions />
      </ScrollView>
    </SafeAreaView>
  );
}
