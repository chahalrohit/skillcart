import React, { ReactNode } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import colors from "@theme/colors";

interface Props {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const CustomText = ({ children, style }: Props) => {
  return <Text style={[{ color: colors.textColor }, style]}>{children}</Text>;
};
export default CustomText;
