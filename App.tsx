import BottomTabs from "@navigation/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import LoginScreen from "./src/screens/Auth/LoginScreen/LoginScreen";
import { NetworkProvider } from "provider/NetworkProvider";

type RootStackParamList = {
  BottomTabs: undefined;
  LoginScreen: undefined;
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

  const ErrorFallback = ({
    error,
    resetError,
  }: {
    error: any;
    resetError: any;
  }) => {
    return (
      <View style={styles.boundaryContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
        <Button onPress={resetError} title="Try Again" />
      </View>
    );
  };

  const errorHandler = (error: Error, stackTrace: string) => {
    console.error("Error: " + error.message + "\n" + stackTrace);
  };

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <NetworkProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NetworkProvider>
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  boundaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: scale(10),
  },
});
