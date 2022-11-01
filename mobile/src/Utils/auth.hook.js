import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../Store/redux.hooks";
import {
  setAuthUser,
  resetAuthUser,
  setAccesToken,
  setCurrentCompound,
} from "../Store/Slices/auth.slice";
import { useLazyMeQuery } from "../API/api";

// ----------------------------------------------------------------

export const useAuthMe = () => {
  const isAuthenticated = useAppSelector((state) => !!state?.auth?.user?.id);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const [getMe] = useLazyMeQuery();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const authMe = async () => {
    if (isAuthenticated) return true;

    setLoading(true);
    const savedAccessToken = await AsyncStorage?.getItem("accessToken");
    dispatch(setAccesToken(savedAccessToken));

    // if my access token is not saved then go to login page
    if (!savedAccessToken) {
      setLoading(false);
      return false;
    }

    // Get Me and put my new access token in async storage
    if (savedAccessToken) {
      getMe()
        .unwrap()
        .then(async (data) => {
          if (data?.id) {
            // await AsyncStorage.setItem("accessToken", accessToken);
            dispatch(setCurrentCompound(data?.userCompound?.[0]));
            dispatch(setAuthUser({ user: data }));
          }
        })
        .finally(() => setLoading(false));
      return true;
    }
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    dispatch(resetAuthUser());
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return { isAuthenticated, authMe, loading, logout };
};
