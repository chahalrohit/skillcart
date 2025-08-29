// components/AppText.tsx
import Fonts from "@utils/fonts/fonts";
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
        return Fonts.POPPINS_LIGHT;
      case "medium":
        return Fonts.POPPINS_MEDIUM;
      case "semiBold":
        return Fonts.POPPINS_SEMIBOLD;
      case "bold":
        return Fonts.POPPINS_BOLD;
      case "extraBold":
        return Fonts.POPPINS_EXTRABOLD;
      default:
        return Fonts.POPPINS_REGULAR;
    }
  };

  return (
    <Text {...props} style={[{ fontFamily: getFontFamily() }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
