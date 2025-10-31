// src/components/driver/StudentCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../config/theme';
import { Student, StudentStatus } from '../../types/student.types';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
  onMarkPickup?: () => void;
  distance?: number;
  showActions?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onPress,
  onMarkPickup,
  distance,
  showActions = true,
}) => {
  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case StudentStatus.PICKED_UP:
        return colors.success;
      case StudentStatus.DROPPED_OFF:
        return colors.accent;
      case StudentStatus.ABSENT:
        return colors.textTertiary;
      default:
        return colors.warning;
    }
  };

  const getStatusText = (status: StudentStatus) => {
    switch (status) {
      case StudentStatus.PICKED_UP:
        return 'Picked Up';
      case StudentStatus.DROPPED_OFF:
        return 'Dropped Off';
      case StudentStatus.ABSENT:
        return 'Absent';
      default:
        return 'Pending';
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Avatar
          name={`${student.firstName} ${student.lastName}`}
          uri={student.photoUrl}
          size={48}
        />

        <View style={styles.info}>
          <Text style={styles.name}>
            {student.firstName} {student.lastName}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {distance ? `${distance}m away • ` : ''}
            {student.homeAddress.street}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(student.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(student.status)}
            </Text>
          </View>
          
          {showActions && student.status === StudentStatus.PENDING && onMarkPickup && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onMarkPickup}
            >
              <Text style={styles.actionText}>✓</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  address: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  actionButton: {
    marginTop: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: colors.textLight,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
});

export default StudentCard;