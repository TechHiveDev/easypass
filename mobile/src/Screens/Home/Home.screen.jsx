import { SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import UserCard from "./Components/UserCard";
import Announcements from "./Components/Annoucements";

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView>
        <UserCard />
        <Announcements />
      </ScrollView>
    </SafeAreaView>
  );
}
