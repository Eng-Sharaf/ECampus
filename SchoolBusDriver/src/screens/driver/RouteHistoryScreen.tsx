// src/screens/driver/RouteHistoryScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../config/theme';
import { TripHistory } from '../../types/route.types';
import { formatDate, formatTime, getDayOfWeek } from '../../utils/dateUtils';

const RouteHistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<TripHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      // TODO: Fetch history from API
      // const data = await getRouteHistory(driverId);
      // setHistory(data);
      
      // Mock data
      setHistory(createMockHistory());
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHistoryItem = ({ item }: { item: TripHistory }) => {
    const completionRate = Math.round(
      ((item.pickedUpCount + item.droppedOffCount) / item.totalStudents) * 100
    );

    return (
      <Card style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <View>
            <Text style={styles.routeName}>{item.routeName}</Text>
            <Text style={styles.dateText}>
              {getDayOfWeek(item.date)}, {formatDate(item.date)}
            </Text>
          </View>
          <View style={[styles.completionBadge, { backgroundColor: getCompletionColor(completionRate) }]}>
            <Text style={styles.completionText}>{completionRate}%</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.totalStudents}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {item.pickedUpCount}
            </Text>
            <Text style={styles.statLabel}>Picked Up</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {item.droppedOffCount}
            </Text>
            <Text style={styles.statLabel}>Dropped Off</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.textTertiary }]}>
              {item.absentCount}
            </Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{item.duration} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Distance:</Text>
            <Text style={styles.detailValue}>{item.totalDistance.toFixed(1)} km</Text>
          </View>
        </View>

        {item.incidents && item.incidents.length > 0 && (
          <View style={styles.incidentsContainer}>
            <Text style={styles.incidentsText}>
              ⚠️ {item.incidents.length} incident{item.incidents.length > 1 ? 's' : ''} reported
            </Text>
          </View>
        )}

        {item.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        )}
      </Card>
    );
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return colors.success;
    if (percentage >= 70) return colors.warning;
    return colors.danger;
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading history..." />;
  }

  return (
    <View style={styles.container}>
      <Header title="Route History" subtitle={`${history.length} trips`} />

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No route history yet</Text>
          </View>
        }
      />
    </View>
  );
};

const createMockHistory = (): TripHistory[] => [
  {
    id: '1',
    routeId: 'r1',
    routeName: 'Morning Route A',
    date: new Date(2025, 9, 30),
    startTime: new Date(2025, 9, 30, 7, 0),
    endTime: new Date(2025, 9, 30, 8, 15),
    totalStudents: 12,
    pickedUpCount: 11,
    droppedOffCount: 11,
    absentCount: 1,
    totalDistance: 15.3,
    duration: 75,
    incidents: [],
  },
  {
    id: '2',
    routeId: 'r1',
    routeName: 'Afternoon Route A',
    date: new Date(2025, 9, 30),
    startTime: new Date(2025, 9, 30, 14, 0),
    endTime: new Date(2025, 9, 30, 15, 20),
    totalStudents: 12,
    pickedUpCount: 12,
    droppedOffCount: 12,
    absentCount: 0,
    totalDistance: 14.8,
    duration: 80,
    incidents: [],
    notes: 'Traffic on Ring Road caused slight delay',
  },
  {
    id: '3',
    routeId: 'r1',
    routeName: 'Morning Route A',
    date: new Date(2025, 9, 29),
    startTime: new Date(2025, 9, 29, 7, 0),
    endTime: new Date(2025, 9, 29, 8, 25),
    totalStudents: 12,
    pickedUpCount: 10,
    droppedOffCount: 10,
    absentCount: 2,
    totalDistance: 14.1,
    duration: 85,
    incidents: [
      {
        id: 'i1',
        type: 'DELAY',
        description: 'Traffic accident on main road',
        timestamp: new Date(2025, 9, 29, 7, 30),
        location: { latitude: 30.0444, longitude: 31.2357 },
        resolved: true,
      },
    ],
  },
  {
    id: '4',
    routeId: 'r1',
    routeName: 'Afternoon Route A',
    date: new Date(2025, 9, 29),
    startTime: new Date(2025, 9, 29, 14, 0),
    endTime: new Date(2025, 9, 29, 15, 10),
    totalStudents: 12,
    pickedUpCount: 12,
    droppedOffCount: 12,
    absentCount: 0,
    totalDistance: 15.5,
    duration: 70,
    incidents: [],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  historyCard: {
    marginBottom: spacing.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  routeName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  completionBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xl,
  },
  completionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  incidentsContainer: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.warning,
    borderRadius: borderRadius.md,
  },
  incidentsText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontWeight: fontWeight.medium,
  },
  notesContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
  notesLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notesText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});

export default RouteHistoryScreen;