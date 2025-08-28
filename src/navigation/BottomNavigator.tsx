// BottomTabs.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../types/navigation';
import Home from '@screens/Home';
import Favourite from '@screens/Favourite';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const HomeTabIcon = ({ color, size }: TabBarIconProps): React.ReactNode => (
  <MaterialIcons name="home" color={color} size={size} />
);

const FavouriteTabIcon = ({
  color,
  size,
}: TabBarIconProps): React.ReactNode => (
  <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
);

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
