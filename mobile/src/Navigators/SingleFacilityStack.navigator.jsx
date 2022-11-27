import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import FacilitiesScreen from "../Screens/Facility/Facilities.screen";
import FacilityItem from "../Screens/Facility/FacilityItem.screen";
import { useAppSelector } from "../Store/redux.hooks";
import { useGetListQuery } from "../API/api";
import { ListContext } from "./FacilityContext";
import { useIsFocused } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};
export default function ScreensNavigator() {
  const currentCompoundId = useAppSelector(
    (state) => state?.auth?.currentCompound?.compoundId
  );
  const { data, error, isLoading, refetch, isFetching } = useGetListQuery({
    entity: "facility/compound/" + currentCompoundId,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFetching && isFocused) {
      refetch();
    }
  }, [isFocused]);
  return (
    <ListContext.Provider
      value={{
        data,
        error,
        isLoading,
        refetch,
        isFetching,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="AllFacilityCategories"
          component={FacilitiesScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="FacilityItem"
          component={FacilityItem}
          options={screenOptions}
        />
      </Stack.Navigator>
    </ListContext.Provider>
  );
}
