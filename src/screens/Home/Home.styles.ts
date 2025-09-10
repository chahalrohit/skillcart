import colors from "@constants/colors";
import { Fonts, FontSizes } from "@utils/fonts/fonts";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export default StyleSheet.create({
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
    flexDirection: "row",
    height: "100%",
    minWidth: 0,
    justifyContent: "space-between",
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
