import SearchInput from "@components/atoms/SearchInput/SearchInput";
import CustomText from "@components/CustomText";
import ProductCard from "@components/features/products/components/ProductCard";
import Lottie from "@components/organisms/Lottie/Lottie";
import colors from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { toggleFavourite } from "../../redux/slices/listSlice";
import styles from "./Favourite.styles";

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  favourite: boolean;
};

const Favourite: React.FC = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const favourites = useSelector((state: RootState) =>
    state.list.items.filter((e) => e.favourite)
  );

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

  return (
    <SafeAreaView style={[styles.container, {}]} edges={["top"]}>
      {favourites?.length !== 0 && <SearchInput />}
      <FlatList
        data={favourites}
        extraData={favourites}
        key={favourites.length}
        keyExtractor={(item, index) => item.id + index}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          width > 800 ? { justifyContent: "space-between" } : undefined
        }
        ListEmptyComponent={<Lottie />}
      />
    </SafeAreaView>
  );
};

export default Favourite;
