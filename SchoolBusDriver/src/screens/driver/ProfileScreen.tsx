// src/screens/driver/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../config/theme';
import { Driver, DriverStats } from '../../types/driver.types';
import { clearAllStorage } from '../../services/storageService';
import { APP_CONFIG } from '../../config/constants';

const ProfileScreen: React.FC = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [stats, setStats] = useState<DriverStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // TODO: Fetch driver profile and stats from API
      // const driverData = await getDriverProfile(driverId);
      // const statsData = await getDriverStats(driverId);
      // setDriver(driverData);
      // setStats(statsData);
      
      // Mock data
      setDriver(createMockDriver());
      setStats(createMockStats());
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearAllStorage();
            // Navigation will be handled by auth state change
            Alert.alert('Success', 'Logged out successfully');
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading profile..." />;
  }

  if (!driver || !stats) {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <ScrollView style={styles.content}>
        {/* Driver Info Card */}
        <Card style={styles.card}>
          <View style={styles.profileHeader}>
            <Avatar
              name={`${driver.firstName} ${driver.lastName}`}
              uri={driver.photoUrl}
              size={100}
            />
            <Text style={styles.driverName}>
              {driver.firstName} {driver.lastName}
            </Text>
            <Text style={styles.employeeId}>ID: {driver.employeeId}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{driver.status}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <InfoRow label="Email" value={driver.email} />
            <InfoRow label="Phone" value={driver.phoneNumber} />
            <InfoRow label="Bus Number" value={driver.busNumber} />
            <InfoRow label="License" value={driver.licenseNumber} />
            <InfoRow 
              label="License Expiry" 
              value={new Date(driver.licenseExpiry).toLocaleDateString()} 
            />
          </View>
        </Card>

        {/* Statistics Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalTrips}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalDistance.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Km Traveled</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalHours}</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.monthlyTrips}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>

          <View style={styles.performanceSection}>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>On-Time Performance</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${stats.onTimePercentage}%`,
                      backgroundColor: getPerformanceColor(stats.onTimePercentage)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.performanceValue}>{stats.onTimePercentage}%</Text>
            </View>

            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Average Rating</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingValue}>⭐ {stats.averageRating.toFixed(1)}</Text>
              </View>
            </View>

            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Incidents</Text>
              <Text style={[
                styles.incidentValue,
                { color: stats.incidentCount === 0 ? colors.success : colors.warning }
              ]}>
                {stats.incidentCount}
              </Text>
            </View>
          </View>
        </Card>

        {/* Settings Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Help & Support</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>About</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        {/* App Version */}
        <Text style={styles.versionText}>
          Version {APP_CONFIG.VERSION}
        </Text>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          fullWidth
          style={styles.logoutButton}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const getPerformanceColor = (percentage: number) => {
  if (percentage >= 90) return colors.success;
  if (percentage >= 70) return colors.warning;
  return colors.danger;
};

const createMockDriver = (): Driver => ({
  id: 'd1',
  firstName: 'Mohamed',
  lastName: 'Ahmed',
  email: 'mohamed.ahmed@school.com',
  phoneNumber: '+20 123 456 7890',
  licenseNumber: 'DL-12345678',
  licenseExpiry: new Date(2026, 11, 31),
  busNumber: 'BUS-101',
  employeeId: 'EMP-001',
  status: 'ACTIVE' as any,
  createdAt: new Date(2023, 0, 1),
  updatedAt: new Date(),
});

const createMockStats = (): DriverStats => ({
  totalTrips: 245,
  totalDistance: 3675.5,
  totalHours: 320,
  averageRating: 4.8,
  onTimePercentage: 94,
  incidentCount: 2,
  monthlyTrips: 42,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  card: {
    margin: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  driverName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  employeeId: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.success,
    borderRadius: borderRadius.xl,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
  },
  infoSection: {
    marginTop: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    width: 120,
  },
  infoValue: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  statBox: {
    width: '50%',
    padding: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  performanceSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  performanceRow: {
    marginBottom: spacing.md,
  },
  performanceLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
  },
  performanceValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  ratingContainer: {
    marginTop: spacing.xs,
  },
  ratingValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  incidentValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  settingText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  settingArrow: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  logoutButton: {
    margin: spacing.md,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;