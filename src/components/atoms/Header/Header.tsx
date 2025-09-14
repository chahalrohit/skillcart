import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "@components/CustomText";
import { scale } from "react-native-size-matters";
import colors from "@theme/colors";
import { FontSizes, Fonts } from "@utils/fonts/fonts";
import * as constants from "@constants/dimensions";
import { Settings, Bell, User, Home } from "lucide-react-native";

interface Props {
  title: string;
  icon?: keyof typeof icons; // restrict icon names
  iconSize?: number;
  containerExt?: StyleProp<ViewStyle>;
}

const icons = {
  settings: Settings,
  bell: Bell,
  user: User,
  home: Home,
};

const CommonHeader = ({ title, icon, iconSize = 20, containerExt }: Props) => {
  const IconComponent = icon ? icons[icon] : null;

  return (
    <View style={[styles.container, containerExt]}>
      <CustomText style={styles.title}>{title}</CustomText>
      {IconComponent && (
        <View style={styles.iconView}>
          <IconComponent
            {...({ size: scale(iconSize), color: colors.white } as any)}
          />
        </View>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: scale(7),
  },
  title: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: FontSizes.heading,
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    padding: scale(7),
    borderRadius: constants.borderRadius2,
  },
});
