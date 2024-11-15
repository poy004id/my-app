import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import { Slot, Stack } from "expo-router";

import apiService from "@/services/apiService";
import { loginSuccess } from "@/redux/slice/auth";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";


 function RootLayout() {
    const router = useRouter(); // Import useRouter from expo-router
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;
    const dispatch = useDispatch();

    const getAccessToken = async () => {
        try {
          const accessToken = await SecureStore.getItemAsync('accessToken');
          return accessToken;
        } catch (error) {
          console.error("error", error);
          return null;
        }
      }

    const checkAuth = async () => {
        try {
          const accessToken = await getAccessToken();
          const response = await apiService.get('/auth/check', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("response", response.data);
          dispatch(loginSuccess({user: response.data.user}));  // Corrected line
          return response.data;
        } catch (error) {
            router.replace("/auth-nav")
        }
      };

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        const accessToken = getAccessToken();
        
        if (!isAuthenticated && !accessToken) {
            router.replace("/auth-nav")
        } 
        else if (!isAuthenticated && accessToken) {
            checkAuth();
        }
        else {
            router.replace("/app-nav");
        }

        SplashScreen.hideAsync();
    }, [isAuthenticated]);

    return (
        <Slot />
    );

}

export default RootLayout;
