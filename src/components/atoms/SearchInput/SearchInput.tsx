import colors from "@constants/colors";
import { borderRadius2, inputBoxLeftPadding } from "@constants/dimensions";
import { Fonts, FontSizes } from "@utils/fonts/fonts";
import { StyleSheet, TextInput, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  search: string;
  onChangeText: (text: string) => void;
};

const SearchInput = ({ search = "", onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        placeholder="Search"
        placeholderTextColor={colors.placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default SearchInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(10),
  },
  input: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: FontSizes.caption,
    borderWidth: StyleSheet.hairlineWidth,
    height: scale(40), // fixed height for input
    width: "100%",
    paddingLeft: inputBoxLeftPadding,
    borderRadius: borderRadius2,
    borderColor: colors.black,
    textAlignVertical: "center", // <-- important for Android
  },
});
