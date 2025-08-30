import colors from "@constants/colors";
import { borderRadius2, inputBoxLeftPadding } from "@constants/dimensions";
import { Fonts, FontSizes } from "@utils/fonts/fonts";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { scale } from "react-native-size-matters";

const SearchInput: React.FC = () => {
  return (
    <View style={{ marginVertical: scale(10) }}>
      <TextInput
        style={{
          fontFamily: Fonts.PoppinsRegular,
          fontSize: FontSizes.caption,
          borderWidth: StyleSheet.hairlineWidth,
          height: scale(40), // fixed height for input
          width: "100%",
          paddingLeft: inputBoxLeftPadding, // only horizontal padding
          borderRadius: borderRadius2,
          borderColor: colors.black,
          textAlignVertical: "center", // <-- important for Android
        }}
        placeholder="Search"
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
};
export default SearchInput;
