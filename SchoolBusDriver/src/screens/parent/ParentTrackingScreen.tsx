// src/screens/parent/ParentTrackingScreen.tsx
// PLACEHOLDER FOR FUTURE PARENT APP IMPLEMENTATION

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../../config/theme';

const ParentTrackingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👨‍👩‍👧‍👦</Text>
      <Text style={styles.title}>Parent Tracking</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.description}>
        This feature will allow parents to:
      </Text>
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>• Track bus location in real-time</Text>
        <Text style={styles.featureItem}>• Receive pickup/dropoff notifications</Text>
        <Text style={styles.featureItem}>• View estimated arrival time</Text>
        <Text style={styles.featureItem}>• Contact the driver</Text>
        <Text style={styles.featureItem}>• View route history</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.xl,
    color: colors.accent,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  featureList: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
});

export default ParentTrackingScreen;