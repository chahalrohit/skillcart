import LottieView from "lottie-react-native";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  source: string;
  extStyle?: object;
};

const Lottie = ({ source, extStyle }: Props) => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.conatiner,
        { marginTop: width > 800 ? height / 6.5 : height / 3.4 },
      ]}
    >
      <View style={[styles.lottieView, extStyle]}>
        <LottieView
          autoPlay
          loop
          style={{ flex: 1, backgroundColor: "transparent" }}
          source={source}
        />
      </View>
    </View>
  );
};
export default Lottie;

const styles = StyleSheet.create({
  conatiner: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  lottieView: {
    width: scale(250),
    height: scale(250),
  },
});
