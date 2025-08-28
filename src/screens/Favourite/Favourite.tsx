import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Favourite: React.FC = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Text>Favourite</Text>
    </SafeAreaProvider>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
