import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import FacilityScreen from "../Screens/Facility/Facility.screen";
import FacilityItem from "../Screens/Facility/FacilityItem.screen";
import FacilityNotifications from "../Screens/Facility/FacilityNotifications";
import { useAppSelector } from "../Store/redux.hooks";
import { useGetListQuery } from "../API/api";
import { ListContext } from "./FacilityContext";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};
export default function ScreensNavigator() {
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const { data, error, isLoading, refetch } = useGetListQuery({
    entity: "facility/compound/" + currentCompoundId,
  });
  return (
    <ListContext.Provider
      value={{
        data,
        error,
        isLoading,
        refetch,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="AllFacilityCategories"
          component={FacilityScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="FacilityItem"
          component={FacilityItem}
          options={screenOptions}
        />
        <Stack.Screen
          name="FacilityNotifications"
          component={FacilityNotifications}
          options={screenOptions}
        />
      </Stack.Navigator>
    </ListContext.Provider>
  );
}
