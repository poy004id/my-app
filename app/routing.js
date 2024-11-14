import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import { Slot, Stack } from "expo-router";


function RootLayout() {
    const router = useRouter(); // Import useRouter from expo-router
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;

    console.log("auth", auth);
    // login -> false
    //do login -> isAuthenticated -> true

    useEffect(() => {
        // Prevent splash screen from auto-hiding
        SplashScreen.preventAutoHideAsync();

        if (!isAuthenticated) {
            router.replace("/auth-nav")
        } else {
            router.replace("/app-nav");
        }

        // Hide splash screen after authentication and routing check
        SplashScreen.hideAsync();
    }, [isAuthenticated]);

    return (
        <Slot />
    );
    
}

export default RootLayout;