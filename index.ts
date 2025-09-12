// index.ts
import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import App from "./App";
LogBox.ignoreAllLogs();

registerRootComponent(App);
