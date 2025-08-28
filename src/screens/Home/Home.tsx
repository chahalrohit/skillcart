import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { productData } from '../../assets/data/ProductData';

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const { width } = Dimensions.get('screen');

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<Item[]>(productData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    return (
      <View style={styles.renderItem}>
        <FastImage
          source={{ uri: item?.image }}
          style={{ height: scale(250), width: width }}
          resizeMode="contain"
        />
        <Text>{item?.name}</Text>
        <Text>{item?.price}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(15),
  },
  renderItem: {
    flex: 1,
    borderWidth: 1,
    marginVertical: scale(8),
    borderRadius: scale(5),
  },
});
