import colors from "@constants/colors";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";

type ProductCardProps = {
  children: ReactNode; // declare children type
};

const ProductCard = ({ children }: ProductCardProps) => {
  return <View style={styles.card}>{children}</View>;
};
export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexBasis: "49%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    padding: scale(10),
    marginBottom: scale(10),
    backgroundColor: colors.white,
  },
});
