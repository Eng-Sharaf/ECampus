// src/components/driver/NavigationBar.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight, layout } from '../../config/theme';

interface NavigationBarProps {
  activeTab: 'route' | 'students' | 'history' | 'profile';
  onTabPress: (tab: 'route' | 'students' | 'history' | 'profile') => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'route', icon: '🗺️', label: 'Route' },
    { id: 'students', icon: '👥', label: 'Students' },
    { id: 'history', icon: '📋', label: 'History' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabPress(tab.id as any)}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text
            style={[
              styles.label,
              activeTab === tab.id && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: layout.bottomNavHeight,
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: fontSize.xl,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  activeLabel: {
    color: colors.textPrimary,
    fontWeight: fontWeight.semibold,
  },
});

export default NavigationBar;