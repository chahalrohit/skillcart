import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Fonts from "./fonts";

const TextStyles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: scale(6),
  },
  subHeading: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: scale(5),
  },
  body: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: scale(4),
  },
  caption: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: scale(3.5),
  },
  tiny: {
    fontFamily: Fonts.POPPINS_LIGHT,
    fontSize: scale(2.5),
  },
  button: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: scale(4),
  },
});
export default TextStyles;
