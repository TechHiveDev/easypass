import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../Store/redux.hooks";
import {
  setAuthUser,
  resetAuthUser,
  setAccesToken,
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
    getMe()
      .unwrap()
      .then(async (data) => {
        if (data?.user && data?.accessToken) {
          const { user, accessToken } = data;
          await AsyncStorage.setItem("accessToken", accessToken);
          dispatch(setAuthUser({ accessToken, user }));
        }
      })
      .finally(() => setLoading(false));
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    dispatch(resetAuthUser());
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return { isAuthenticated, authMe, loading, logout };
};
