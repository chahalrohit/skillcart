import SearchInput from "@components/atoms/SearchInput/SearchInput";
import CustomText from "@components/CustomText";
import { Image } from "expo-image";
import React, { useCallback } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { productData } from "../../assets/data/ProductData";

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Home: React.FC = () => {
  const numColumns = Platform.OS === "web" ? 2 : 1;
  const keyExtractor = useCallback((item: Item) => item.id, []);

  const renderItem = useCallback(({ item }: { item: Item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        </View>
        <View style={styles.info}>
          <CustomText style={styles.name} numberOfLines={1}>
            {item.name}
          </CustomText>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <SearchInput />
      <FlatList
        data={productData}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
  },
  listContent: {
    paddingVertical: scale(12),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e6e6e6",
    padding: scale(10),
    marginBottom: scale(10),
    backgroundColor: "#fff",
  },
  imageWrap: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(6),
    overflow: "hidden",
    marginRight: scale(12),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: scale(14),
    fontWeight: "600",
    marginBottom: scale(4),
  },
  price: {
    fontSize: scale(13),
    color: "#444",
  },
});
