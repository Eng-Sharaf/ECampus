// src/components/common/Button.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, layout } from '../../config/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    return {
      ...baseStyle,
      ...styles[`${variant}Button`],
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    return {
      ...styles.buttonText,
      ...styles[`${size}ButtonText`],
      ...styles[`${variant}ButtonText`],
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.textLight}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Variants
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundDark,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  successButton: {
    backgroundColor: colors.success,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  // Sizes
  smallButton: {
    height: 36,
    paddingHorizontal: spacing.md,
  },
  mediumButton: {
    height: layout.buttonHeight,
    paddingHorizontal: spacing.lg,
  },
  largeButton: {
    height: 56,
    paddingHorizontal: spacing.xl,
  },
  // Text Styles
  buttonText: {
    fontWeight: fontWeight.semibold,
  },
  primaryButtonText: {
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  dangerButtonText: {
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  successButtonText: {
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
  },
  // Text Sizes
  smallButtonText: {
    fontSize: fontSize.sm,
  },
  mediumButtonText: {
    fontSize: fontSize.md,
  },
  largeButtonText: {
    fontSize: fontSize.lg,
  },
});

export default Button;