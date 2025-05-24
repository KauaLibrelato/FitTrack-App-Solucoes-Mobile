"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import type { IUser } from "../utils/types";

export const useUserData = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userInfos = await AsyncStorage.getItem("user");
      if (userInfos) {
        setUser(JSON.parse(userInfos));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (newUserData: Partial<IUser>) => {
    try {
      const currentUser = await AsyncStorage.getItem("user");
      const updatedUser = {
        ...JSON.parse(currentUser ?? "{}"),
        ...newUserData,
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    user,
    loading,
    updateUserData,
    clearUserData,
    refreshUserData: loadUserData,
  };
};
