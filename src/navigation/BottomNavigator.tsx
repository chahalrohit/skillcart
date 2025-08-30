// BottomTabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourite from "@screens/Favourite";
import Home from "@screens/Home";
import { JSX } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import type { RootTabParamList } from "../types/navigation";

type TabBarIconProps = { focused: boolean; color: string; size: number };

const HomeTabIcon = ({ color, size }: TabBarIconProps): JSX.Element => (
  <MaterialIcons name="home" color={color} size={size} />
);

const FavouriteTabIcon = ({ color, size }: TabBarIconProps): JSX.Element => (
  <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
);

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {},
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{ tabBarIcon: FavouriteTabIcon }}
      />
    </Tab.Navigator>
  );
}
