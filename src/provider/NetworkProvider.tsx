// NetworkProvider.tsx
import Lottie from "@components/organisms/Lottie/Lottie";
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import colors from "@theme/colors";
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
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  BackHandler,
} from "react-native";
import { scale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

type NetworkContextType = {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  showModal: boolean;
  retryConnection: () => void;
};

const NetworkContext = createContext<NetworkContextType>({
  isConnected: null,
  isInternetReachable: null,
  showModal: false,
  retryConnection: () => {},
});

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const shouldShowModal =
    !(isConnected ?? true) || isInternetReachable === false;

  // Handle Android back button when modal is open
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (showModal) {
          // Prevent back button when no internet modal is open
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [showModal]);

  useEffect(() => {
    // Subscribe to netinfo
    const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(
      (state) => {
        setIsConnected(state.isConnected ?? null);
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

  // Handle modal visibility and animations
  useEffect(() => {
    if (shouldShowModal && !showModal) {
      setShowModal(true);
      // Start opening animation
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else if (!shouldShowModal && showModal) {
      // Start closing animation
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [shouldShowModal, showModal, scaleAnim, opacityAnim, slideAnim]);

  const retryConnection = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? null);
      setIsInternetReachable(state.isInternetReachable ?? null);
    });
  };

  const getStatusMessage = () => {
    if (isConnected === false) {
      return "No Internet Connection";
    } else if (isInternetReachable === false) {
      return "Try reconnecting or check router.";
    }
    return "Connection Issue";
  };

  const getTitle = () => {
    if (isConnected === false) {
      return "No Internet";
    } else if (isInternetReachable === false) {
      return "Connection Problem";
    }
    return "Network Issue";
  };

  return (
    <NetworkContext.Provider
      value={{
        isConnected,
        isInternetReachable,
        showModal,
        retryConnection,
      }}
    >
      {/* App children */}
      {children}

      {/* No Internet Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={() => {
          // Prevent closing modal on Android back button
          // Modal will only close when connection is restored
        }}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
              },
            ]}
          >
            {/* Lottie Animation */}
            <View style={styles.animationContainer}>
              <Lottie
                source={require("../assets/lottie/no_signal.json")}
                extStyle={styles.lottieAnimation}
              />
            </View>

            {/* Content */}
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>{getTitle()}</Text>
              <Text style={styles.modalSubtitle}>{getStatusMessage()}</Text>
              <Text style={styles.modalDescription}>
                Please check your internet connection and try again.
              </Text>
            </View>

            {/* Retry Button */}
            {/* <Pressable
              onPress={retryConnection}
              style={({ pressed }) => [
                styles.retryButton,
                pressed && styles.retryButtonPressed,
              ]}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable> */}

            {/* Connection Status Indicator */}
            <View style={styles.statusIndicator}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: shouldShowModal
                      ? colors.error
                      : colors.success,
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {shouldShowModal ? "Disconnected" : "Connected"}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </NetworkContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.transparent,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "flex-start", // ← Centers content vertically
    paddingHorizontal: scale(20), // ← Adds horizontal padding
    paddingTop: scale(20), // ← Adds vertical padding
    maxWidth: width * 0.9,
    width: "100%",
    height: "50%", // increase height if want to enable try again button
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  animationContainer: {
    height: scale(135), // Fixed height
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lottieAnimation: {
    height: scale(200),
    width: scale(200),
  },
  textContainer: {
    alignItems: "center",
    marginTop: scale(80),
    marginBottom: scale(15),
  },
  modalTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    color: colors.black,
    textAlign: "center",
    marginVertical: scale(8),
  },
  modalSubtitle: {
    fontSize: scale(16),
    fontWeight: "500",
    color: colors.error,
    textAlign: "center",
    marginBottom: scale(8),
  },
  modalDescription: {
    fontSize: scale(14),
    color: colors.gray,
    textAlign: "center",
    lineHeight: scale(20),
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: colors.primary || colors.focused,
    paddingHorizontal: scale(32),
    paddingVertical: scale(12),
    borderRadius: scale(25),
    marginBottom: scale(16),
    minWidth: scale(120),
  },
  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    color: "white",
    fontSize: scale(16),
    fontWeight: "600",
    textAlign: "center",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginRight: scale(6),
  },
  statusText: {
    fontSize: scale(12),
    color: colors.gray || "#666",
    fontWeight: "500",
  },
});
