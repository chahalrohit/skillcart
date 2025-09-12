// HomeScreen.tsx (or LoginScreen.tsx)
import React, { useEffect } from "react";
import { Button, Platform, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

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
  apiKey: "AIzaSyDTkTIj7tKVdCvE4TDMx_DQWB0MXsK4eC4",
  authDomain: "skillcart-1b7f5.firebaseapp.com",
  projectId: "skillcart-1b7f5",
  storageBucket: "skillcart-1b7f5.firebasestorage.app",
  messagingSenderId: "176016073146",
  // ---- Below two values MUST be added from Firebase Console (Web app) ----
  appId: "1:176016073146:web:REPLACE_WITH_WEB_APP_ID",
  measurementId: "G-REPLACE_WITH_MEASUREMENT_ID_OR_REMOVE",
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

// Configure native Google SignIn (Android / iOS)
if (Platform.OS !== "web") {
  GoogleSignin.configure({
    webClientId:
      "176016073146-k6epbj3b4tog87rrl0c89u2drb51pf51.apps.googleusercontent.com",
    offlineAccess: false,
    profileImageSize: 120,
  });
}

const HomeScreen: React.FC = () => {
  // Build a redirect URI. For web we will use the exact firebase auth handler origin if you use Firebase hosting.
  const redirectUri =
    Platform.OS === "web"
      ? "https://skillcart-1b7f5.firebaseapp.com/__/auth/handler"
      : AuthSession.makeRedirectUri({
          preferLocalhost: true,
        });

  console.log("Redirect URI:", redirectUri);

  // Create the Google auth request (expo provider helper)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      Platform.OS === "web"
        ? "176016073146-k6epbj3b4tog87rrl0c89u2drb51pf51.apps.googleusercontent.com"
        : "176016073146-rvnc8vgdl54kiqc6k0aus2g62dvcbms3.apps.googleusercontent.com",
    iosClientId:
      "176016073146-0nmh56j61gojh4a5kivtdeh54ikkvcrl.apps.googleusercontent.com",
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
      console.log("Native signin response:", res);

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
          onPress={() =>
            // useProxy: false for production hosted sites; set true for some Expo dev setups
            promptAsync({ useProxy: false })
          }
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
