import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import { Slot, Stack } from "expo-router";


function RootLayout() {
    const router = useRouter(); // Import useRouter from expo-router
    const auth = useSelector((state) => state.auth);
    
    useEffect(() => {
        // Prevent splash screen from auto-hiding
        SplashScreen.preventAutoHideAsync();

        if (!uid) {
            router.replace("/auth-nav");
        } else if (uid && !email_verified) {
            router.replace("/auth-nav/verify-email");
        } else if (!apprenticeship_id) {
            router.replace("/apprentice-nav");
        } else {
            router.replace("/app-nav");
        }

        // Hide splash screen after authentication and routing check
        SplashScreen.hideAsync();
    }, [uid, email_verified, apprenticeship_id, router]);

    return (
        <Slot />
    );
    
}

export default RootLayout;