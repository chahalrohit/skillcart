import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}
    >
      <Text style={{ color: '#000', fontSize: 50 }}>Hello World!</Text>
    </View>
  );
}
