import { SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import UserCard from "./Components/UserCard";
import Announcements from "./Components/Annoucements";
import Actions from "./Components/Actions";
import { useAppSelector } from "../../Store/redux.hooks";

// =================================================================

export default function HomeScreen() {
  const { type } = useAppSelector((s) => s?.auth?.user);
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView>
        <UserCard />
        {type === "Resident" && (
          <>
            <Announcements />
            <Actions />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
