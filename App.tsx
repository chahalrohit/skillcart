import BottomTabs from "@navigation/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type RootStackParamList = {
  BottomTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    // Poppins ExtraLight (200)
    Poppins_200ExtraLight: require("./src/assets/fonts/Poppins-ExtraLight.ttf"),

    // Poppins Light (300)
    Poppins_300Light: require("./src/assets/fonts/Poppins-Light.ttf"),

    // Poppins Regular (400)
    Poppins_400Regular: require("./src/assets/fonts/Poppins-Regular.ttf"),

    // Poppins Medium (500)
    Poppins_500Medium: require("./src/assets/fonts/Poppins-Medium.ttf"),

    // Poppins SemiBold (600)
    Poppins_600SemiBold: require("./src/assets/fonts/Poppins-SemiBold.ttf"),

    // Poppins Bold (700)
    Poppins_700Bold: require("./src/assets/fonts/Poppins-Bold.ttf"),

    // Poppins ExtraBold (800)
    Poppins_800ExtraBold: require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // 3) Now you can safely early-return
  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabs">
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
