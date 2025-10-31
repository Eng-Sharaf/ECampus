import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {colors, spacing, fontSize, fontWeight} from '../../config/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;        
  onLeftPress?: () => void;          
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  onLeftPress,
  rightElement,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Icon Section */}
      {leftIcon && (
        <TouchableOpacity onPress={onLeftPress} style={styles.leftElement}>
          {leftIcon}
        </TouchableOpacity>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: 48,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftElement: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    opacity: 0.9,
    marginTop: 4,
  },
  rightElement: {
    marginLeft: spacing.md,
  },
});

export default Header;