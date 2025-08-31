import SearchInput from "@components/atoms/SearchInput/SearchInput";
import CustomText from "@components/CustomText";
import ProductCard from "@components/features/products/components/ProductCard";
import colors from "@constants/colors";
import { Fonts, FontSizes } from "@utils/fonts/fonts";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

SplashScreen.preventAutoHideAsync(); // keep splash until fonts load

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Home: React.FC = () => {
  // const numColumns = Platform.OS === "web" ? 2 : 1;
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.list
  );

  useEffect(() => {
    dispatch({ type: "list/fetchListRequest" });
  }, []);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const renderItem = useCallback(({ item }: { item: Item }) => {
    return (
      <ProductCard>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            contentFit="fill"
            transition={300}
          />
        </View>
        <View style={styles.info}>
          <CustomText style={[styles.name, {}]} numberOfLines={1}>
            {item.name}
          </CustomText>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
      </ProductCard>
    );
  }, []);

  const numColumns = width > 600 ? 2 : 1;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]} // remove bottom extra space
    >
      <SearchInput />
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          Platform.OS === "web"
            ? { justifyContent: "space-between" }
            : undefined
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: scale(16),
  },
  listContent: {},
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
    fontFamily: Fonts.PoppinsMedium,
    fontSize: FontSizes.title,
    fontWeight: "600",
    marginBottom: scale(4),
  },
  price: {
    fontSize: FontSizes.caption,
    color: colors.text,
  },
});
