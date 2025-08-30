import { Fonts } from "@utils/fonts/fonts";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  weight?: "regular" | "medium" | "semiBold" | "bold" | "light" | "extraBold";
}

const CustomText: React.FC<AppTextProps> = ({
  children,
  style,
  weight = "regular",
  ...props
}) => {
  const getFontFamily = () => {
    switch (weight) {
      case "light":
        return Fonts.PoppinsLight;
      case "medium":
        return Fonts.PoppinsMedium;
      case "semiBold":
        return Fonts.PoppinsSemiBold;
      case "bold":
        return Fonts.PoppinsBold;
      case "extraBold":
        return Fonts.PoppinsExtraBold;
      default:
        return Fonts.PoppinsRegular;
    }
  };

  return (
    <Text {...props} style={[{ fontFamily: getFontFamily() }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
