import LottieView from "lottie-react-native";
import { View, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

const Lottie = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: width > 800 ? height / 6.5 : height / 3.4,
      }}
    >
      <View
        style={{
          width: scale(250),
          height: scale(250),
        }}
      >
        <LottieView
          autoPlay
          loop
          style={{ flex: 1, backgroundColor: "transparent" }}
          source={require("../../../assets/lottie/empty-cart.json")}
        />
      </View>
    </View>
  );
};
export default Lottie;
