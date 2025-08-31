import colors from "@constants/colors";
import { Button, Text, View } from "react-native";

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white,
      padding: 20,
    }}
  >
    <Text style={{ fontSize: 16, color: "red", marginBottom: 10 }}>
      {message || "Something went wrong"}
    </Text>
    {onRetry && <Button title="Retry" onPress={onRetry} />}
  </View>
);

export default ErrorState;
