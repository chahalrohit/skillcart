// NetworkProvider.tsx
import Lottie from "@components/organisms/Lottie/Lottie";
import colors from "@constants/colors";
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

type NetworkContextType = {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
};

const NetworkContext = createContext<NetworkContextType>({
  isConnected: null,
  isInternetReachable: null,
});

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);

  const slideAnim = useRef(new Animated.Value(-80)).current; // banner off-screen initially
  const visible = !(isConnected ?? true) || isInternetReachable === false;

  useEffect(() => {
    // Subscribe to netinfo
    const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(
      (state) => {
        setIsConnected(state.isConnected ?? null);
        // `isInternetReachable` can be `null` on some platforms - keep it
        setIsInternetReachable(state.isInternetReachable ?? null);
      }
    );

    // fetch initial state
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? null);
      setIsInternetReachable(state.isInternetReachable ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -90,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <NetworkContext.Provider value={{ isConnected, isInternetReachable }}>
      {/* App children */}
      {children}

      {/* Overlay banner */}
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.safe}>
          <View style={styles.textWrap}>
            <Lottie
              source={require("../assets/lottie/no_internet.json")}
              extStyle={{ height: scale(200), width: scale(200) }}
            />
            <Text style={styles.subtitle}>
              {isConnected === false
                ? "No Internet Connection"
                : isInternetReachable === false
                ? "Try reconnecting or check router."
                : ""}
            </Text>
          </View>
          {/* Optional retry button: */}
          {/* <Pressable onPress={()=> NetInfo.fetch().then(...)} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable> */}
        </SafeAreaView>
      </Animated.View>
    </NetworkContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: scale(130),
    zIndex: 9999,
    elevation: 9999,
  },
  safe: {
    // backgroundColor: colors.error,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  subtitle: {
    color: colors.black,
    opacity: 0.95,
    marginTop: 2,
    fontSize: 12,
  },
  retryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  retryText: {
    color: "white",
    fontWeight: "600",
  },
});
