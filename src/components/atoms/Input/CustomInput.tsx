import React, { useState, forwardRef } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import styles from "./CustomInput.styles";

// props interface
interface CustomInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  containerStyle?: ViewStyle;
  showPasswordToggle?: boolean;
  required?: boolean;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      error,
      secureTextEntry = false,
      keyboardType = "default",
      multiline = false,
      numberOfLines = 1,
      editable = true,
      maxLength,
      leftIcon,
      rightIcon,
      onRightIconPress,
      style,
      inputStyle,
      labelStyle,
      errorStyle,
      containerStyle,
      showPasswordToggle = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(
      !secureTextEntry
    );

    const togglePasswordVisibility = (): void => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const handleFocus = (): void => {
      setIsFocused(true);
    };

    const handleBlur = (): void => {
      setIsFocused(false);
    };

    const getInputContainerStyle = (): ViewStyle[] => {
      const baseStyle: ViewStyle[] = [styles.inputContainer];

      if (isFocused) {
        baseStyle.push(styles.focused);
      }

      if (error) {
        baseStyle.push(styles.error);
      }

      if (!editable) {
        baseStyle.push(styles.disabled);
      }

      return baseStyle;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <View style={[getInputContainerStyle(), style]}>
          {leftIcon && (
            <View style={styles.leftIconContainer}>
              <Ionicons
                name={leftIcon}
                size={20}
                color={isFocused ? colors.focused : colors.gray}
              />
            </View>
          )}

          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={editable}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {(rightIcon || (showPasswordToggle && secureTextEntry)) && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={
                showPasswordToggle && secureTextEntry
                  ? togglePasswordVisibility
                  : onRightIconPress
              }
              disabled={
                !onRightIconPress && !(showPasswordToggle && secureTextEntry)
              }
            >
              <Ionicons
                name={
                  showPasswordToggle && secureTextEntry
                    ? isPasswordVisible
                      ? "eye-off"
                      : "eye"
                    : rightIcon!
                }
                size={20}
                color={isFocused ? colors.focused : colors.gray}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}

        {maxLength && value && (
          <Text style={styles.characterCount}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    );
  }
);

// Set display name for debugging
CustomInput.displayName = "CustomInput";

export default CustomInput;

// Export the props interface for external use
export type { CustomInputProps };
