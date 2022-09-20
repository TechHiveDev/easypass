import { SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import UserCard from "./Components/UserCard";
import Announcements from "./Components/Announcements";
import Actions from "./Components/Actions";
import { useAppSelector } from "../../Store/redux.hooks";
import { useEffect } from "react";

// =================================================================

export default function HomeScreen({ type = "Just Home" }) {
  const compoundId = useAppSelector((state) => state.auth.currentCompoundId);
  console.log(compoundId);
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
