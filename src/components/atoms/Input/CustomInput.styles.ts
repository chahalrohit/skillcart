import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  required: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  focused: {
    borderColor: colors.focused,
    shadowColor: colors.focused,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  error: {
    borderColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.disabled,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    paddingVertical: 12,
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    marginTop: 4,
  },
  characterCount: {
    fontSize: 12,
    color: colors.gray,
    textAlign: "right",
    marginTop: 2,
  },
});
