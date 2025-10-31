// src/screens/auth/SplashScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../../config/theme';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    // Check auth status and navigate accordingly
    // This will be handled by the navigation logic
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🚌</Text>
      <Text style={styles.title}>School Bus Tracker</Text>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  loader: {
    marginTop: spacing.xl,
  },
});

export default SplashScreen;