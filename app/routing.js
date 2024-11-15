import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import { Slot, Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import apiService from "../services/apiService";

 function RootLayout() {
    const router = useRouter(); // Import useRouter from expo-router
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;
    console.log("auth", auth);
    // const accessToken = await SecureStore.getItemAsync('accessToken');

    const checkAuth = async () => {
        try {
            const response = await apiService.get('/auth/check');
            console.log("response", response);
            return response.data;
        }
        catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        // if (isAuthenticated && accessToken) {
        //     router.replace("/app-nav");
        // }
        // else 
        // if (!isAuthenticated && !accessToken) {
        if (!isAuthenticated) {
            router.replace("/auth-nav")
        } else {
            router.replace("/app-nav");
        }

        SplashScreen.hideAsync();
    }, [isAuthenticated]);

    return (
        <Slot />
    );

}

export default RootLayout;