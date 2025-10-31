// src/components/driver/RouteStatsCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, fontSize, fontWeight } from '../../config/theme';
import { RouteProgress } from '../../types/route.types';

interface RouteStatsCardProps {
  progress: RouteProgress;
}

const RouteStatsCard: React.FC<RouteStatsCardProps> = ({ progress }) => {
  const stats = [
    {
      label: 'Picked Up',
      value: progress.pickedUpCount,
      color: colors.success,
    },
    {
      label: 'Remaining',
      value: progress.remainingCount,
      color: colors.warning,
    },
    {
      label: 'Distance',
      value: `${progress.distanceTraveled.toFixed(1)}km`,
      color: colors.accent,
    },
  ];

  return (
    <Card style={styles.card}>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={[styles.value, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  value: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
});

export default RouteStatsCard;