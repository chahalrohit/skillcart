import Loader from "@components/atoms/Loader/Loader";
import SearchInput from "@components/atoms/SearchInput/SearchInput";
import CustomText from "@components/CustomText";
import ErrorState from "@components/error/ErrorState";
import ProductCard from "@components/features/products/components/ProductCard";
import colors from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  fetchListRequest,
  searchItem,
  toggleFavourite,
} from "../../redux/slices/listSlice";
import styles from "./Home.styles";

SplashScreen.preventAutoHideAsync(); // keep splash until fonts load

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  favourite: boolean;
};

const Home: React.FC = () => {
  // const numColumns = Platform.OS === "web" ? 2 : 1;
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.list
  );
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
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
          <View style={[styles.info, {}]}>
            <View>
              <CustomText style={[styles.name, {}]} numberOfLines={1}>
                {item.name}
              </CustomText>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(toggleFavourite(item?.id))}
            >
              {item?.favourite ? (
                <FontAwesome
                  name="heart"
                  size={scale(18)}
                  color={colors.heart}
                />
              ) : (
                <FontAwesome name="heart-o" size={scale(18)} />
              )}
            </TouchableOpacity>
          </View>
        </ProductCard>
      );
    },
    [dispatch]
  );

  const numColumns = width > 800 ? 2 : 1;

  if (loading) return <Loader />;

  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchListRequest())}
      />
    );

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]} // remove bottom extra space
    >
      <SearchInput
        search={searchText}
        onChangeText={(value: string) => {
          dispatch(searchItem(value));
          setSearchText(value);
        }}
      />
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          width > 800 ? { justifyContent: "space-between" } : undefined
        }
      />
    </SafeAreaView>
  );
};

export default Home;
