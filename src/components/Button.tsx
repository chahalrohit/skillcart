import colors from "@constants/colors";
import { horizontalSpace } from "@constants/dimensions";
import { Fonts, FontSizes } from "@utils/fonts/fonts";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-size-matters";
import CustomText from "./CustomText";

interface ButtonProps {
  buttonName: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  extTextStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonName,
  style = {},
  extTextStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <CustomText style={[styles.textStyle, extTextStyle]}>
        {buttonName}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: horizontalSpace,
    height: scale(11),
    borderRadius: scale(2),
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: colors.white,
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: FontSizes.button,
  },
});
