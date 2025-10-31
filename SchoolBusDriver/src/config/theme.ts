// src/config/theme.ts

export const colors = {
  // Primary Colors (Uber-inspired)
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#05A6F0',
  
  // Status Colors
  success: '#06C167',
  warning: '#FFA500',
  danger: '#CD0000',
  info: '#05A6F0',
  
  // Background Colors
  background: '#F6F6F6',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#E5E5E5',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#FFFFFF',
  
  // Border & Divider
  border: '#E0E0E0',
  divider: '#F0F0F0',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Student Status Colors
  studentPending: '#FFA500',
  studentPickedUp: '#06C167',
  studentDroppedOff: '#05A6F0',
  studentAbsent: '#999999',
  
  // Map Colors
  routeLine: '#05A6F0',
  busMarker: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const layout = {
  screenPadding: spacing.md,
  headerHeight: 60,
  bottomNavHeight: 60,
  cardSpacing: spacing.md,
  buttonHeight: 48,
  inputHeight: 48,
};

export default {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  shadows,
  layout,
};