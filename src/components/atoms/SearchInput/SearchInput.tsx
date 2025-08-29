import colors from "@constants/colors";
import { borderRadius2, inputBoxLeftPadding } from "@constants/dimensions";
import React from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

const SearchInput: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={{
          borderWidth: 1,
          height: scale(15),
          paddingVertical: scale(15),
          borderRadius: borderRadius2,
          paddingLeft: inputBoxLeftPadding,
        }}
        placeholder="Search"
        placeholderTextColor={colors.placeholder}
      />
    </SafeAreaView>
  );
};
export default SearchInput;
