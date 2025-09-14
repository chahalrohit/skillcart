import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";
import React, { useEffect } from "react";
import { Button, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { saveAccessToken } from "../../../services/storage/tokenService";
import Constants from "expo-constants";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { saveUserInfo } from "redux/slices/authSlice/authSlice";

// Complete OAuth sessions in web browsers (Expo requirement)
WebBrowser.maybeCompleteAuthSession();

/**
 * Firebase config populated from your google-services.json.
 * Replace the placeholders below with the Web app values from Firebase Console:
 *  - appId: "1:176016073146:web:XXXXXXXXXXXX"
 *  - measurementId: "G-XXXXXXXX"
 *
 * If you haven't added a Web app in Firebase, open Firebase Console -> Project Settings -> "Your apps" -> Add web app.
 */
const firebaseConfig = {
  apiKey:
    Constants.expoConfig?.extra?.firebaseApiKey ||
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    Constants.expoConfig?.extra?.firebaseAuthDomain ||
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    Constants.expoConfig?.extra?.firebaseProjectId ||
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    Constants.expoConfig?.extra?.firebaseStorageBucket ||
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId ||
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Constants.expoConfig?.extra?.firebaseAppId ||
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId:
    Constants.expoConfig?.extra?.firebaseMeasurementId ||
    process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  // ---------------------------------------------------------------------
};

// Initialize Firebase app safely (only once)
let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase initialized");
} else {
  firebaseApp = getApp();
  console.log("Firebase app already initialized");
}

// Initialize auth with the firebase app
const auth = getAuth(firebaseApp);

const getGoogleClientIds = () => {
  return {
    webClientId:
      Constants.expoConfig?.extra?.googleWebClientId ||
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId:
      Constants.expoConfig?.extra?.googleAndroidClientId ||
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId:
      Constants.expoConfig?.extra?.googleIosClientId ||
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  };
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { webClientId, androidClientId, iosClientId } = getGoogleClientIds();

  // Configure native Google SignIn (Android / iOS)
  if (Platform.OS !== "web") {
    GoogleSignin.configure({
      webClientId: webClientId,
      offlineAccess: false,
      profileImageSize: 120,
    });
  }
  // Build a redirect URI. For web we will use the exact firebase auth handler origin if you use Firebase hosting.
  const redirectUri =
    Platform.OS === "web"
      ? "https://skillcart-1b7f5.firebaseapp.com/__/auth/handler"
      : AuthSession.makeRedirectUri({
          preferLocalhost: true,
        });

  const user = useSelector((state: RootState) => state.auth);

  // console.log("user : ", JSON.stringify(user, null, 2));

  // Create the Google auth request (expo provider helper)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.OS === "web" ? webClientId : androidClientId,
    iosClientId: iosClientId,
    redirectUri,
    scopes: ["profile", "email"],
    responseType: "id_token",
  });

  // Handle the response from Google (web)
  useEffect(() => {
    (async () => {
      try {
        if (response?.type === "success") {
          const authentication = response.authentication;
          const idToken =
            // defensive: idToken or id_token depending on runtime
            // @ts-ignore
            authentication?.idToken || authentication?.id_token;

          if (!idToken) {
            console.warn(
              "No idToken returned from Google Auth response:",
              authentication
            );
            return;
          }

          // For web, persist auth state to localStorage (avoids sessionStorage missing-initial-state errors)
          if (Platform.OS === "web") {
            try {
              await setPersistence(auth, browserLocalPersistence);
            } catch (pErr) {
              console.warn("Failed to set persistence:", pErr);
            }
          }

          // Create Firebase credential with the Google idToken
          const credential = GoogleAuthProvider.credential(idToken);

          // Sign in to Firebase
          const firebaseUser = await signInWithCredential(auth, credential);
          console.log("Firebase sign-in success:", firebaseUser.user.uid);
        }
      } catch (err) {
        console.error("Error handling Google response:", err);
      }
    })();
  }, [response]);

  // Native (Android / iOS) sign in using react-native-google-signin
  const signInNative = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const res = await GoogleSignin.signIn();
      console.log(
        "\n=====================📢 Native signin response 📢=====================\n",
        JSON.stringify(res, null, 2)
      );
      saveAccessToken(res?.data?.idToken);
      dispatch(saveUserInfo(res?.data?.user));
      console.log(
        "\n=====================📢 Google SignIn Token 📢=====================\n",
        res?.data?.idToken
      );

      // If you want to sign in to Firebase with the native token:
      // const { idToken } = res;
      // const credential = GoogleAuthProvider.credential(idToken);
      // await signInWithCredential(auth, credential);
    } catch (error: any) {
      console.error("Native GoogleSignin error:", error);
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        default:
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {Platform.OS === "web" ? (
        <Button
          title="Sign in with Google (web)"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      ) : (
        <GoogleSigninButton
          style={{ width: 212, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInNative}
        />
      )}
    </View>
  );
};

export default HomeScreen;
