// src/screens/driver/StudentDetailScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../config/theme';
import { Student, StudentStatus } from '../../types/student.types';
import { useNavigation, useRoute } from '@react-navigation/native';

const StudentDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentId } = route.params as { studentId: string };
  
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = useCallback(async () => {
    try {
      // TODO: Fetch student from API
      // const data = await getStudentById(studentId);
      // setStudent(data);
      
      // Mock data
      setStudent(createMockStudent(studentId));
    } catch (error) {
      Alert.alert('Error', 'Failed to load student details');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const handleCallParent = (phoneNumber: string) => {
    Alert.alert(
      'Call Parent',
      `Call ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL(`tel:${phoneNumber}`) },
      ]
    );
  };

  const handleMarkStatus = (status: StudentStatus) => {
    const statusText = status === StudentStatus.PICKED_UP ? 'picked up' : 'dropped off';
    Alert.alert(
      'Update Status',
      `Mark ${student?.firstName} as ${statusText}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            if (student) {
              setStudent({ ...student, status });
              Alert.alert('Success', `Student marked as ${statusText}`);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading student..." />;
  }

  if (!student) {
    return (
      <View style={styles.container}>
        <Header title="Student Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Student not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Student Details"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        {/* Student Info Card */}
        <Card style={styles.card}>
          <View style={styles.studentHeader}>
            <Avatar
              name={`${student.firstName} ${student.lastName}`}
              uri={student.photoUrl}
              size={80}
            />
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>
                {student.firstName} {student.lastName}
              </Text>
              <Text style={styles.studentGrade}>Grade {student.grade}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      student.status === StudentStatus.PICKED_UP
                        ? colors.success
                        : student.status === StudentStatus.PENDING
                        ? colors.warning
                        : colors.textTertiary,
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {student.status.replace('_', ' ')}
                </Text>
              </View>
            </View>
          </View>

          {student.specialNotes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Special Notes:</Text>
              <Text style={styles.notesText}>{student.specialNotes}</Text>
            </View>
          )}
        </Card>

        {/* Parent Info Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Parent Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{student.parent.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Relation:</Text>
            <Text style={styles.infoValue}>{student.parent.relation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <TouchableOpacity
              onPress={() => handleCallParent(student.parent.phoneNumber)}
            >
              <Text style={[styles.infoValue, styles.phoneLink]}>
                {student.parent.phoneNumber}
              </Text>
            </TouchableOpacity>
          </View>
          {student.parent.email && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{student.parent.email}</Text>
            </View>
          )}
        </Card>

        {/* Home Address Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Home Address</Text>
          <Text style={styles.addressText}>{student.homeAddress.street}</Text>
          <Text style={styles.addressText}>{student.homeAddress.city}</Text>
          
          {/* Map */}
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                ...student.homeAddress.coordinates,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
            >
              <Marker coordinate={student.homeAddress.coordinates} />
            </MapView>
          </View>
        </Card>

        {/* Emergency Contacts */}
        {student.emergencyContacts && student.emergencyContacts.length > 0 && (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            {student.emergencyContacts.map((contact, index) => (
              <View key={index} style={styles.emergencyContact}>
                <View>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelation}>{contact.relation}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleCallParent(contact.phoneNumber)}
                >
                  <Text style={styles.phoneLink}>{contact.phoneNumber}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {student.status === StudentStatus.PENDING && (
            <Button
              title="Mark as Picked Up"
              onPress={() => handleMarkStatus(StudentStatus.PICKED_UP)}
              variant="success"
              fullWidth
              style={styles.actionButton}
            />
          )}
          {student.status === StudentStatus.PICKED_UP && (
            <Button
              title="Mark as Dropped Off"
              onPress={() => handleMarkStatus(StudentStatus.DROPPED_OFF)}
              variant="primary"
              fullWidth
              style={styles.actionButton}
            />
          )}
          <Button
            title="Call Parent"
            onPress={() => handleCallParent(student.parent.phoneNumber)}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const createMockStudent = (id: string): Student => ({
  id,
  firstName: 'Ahmed',
  lastName: 'Salem',
  grade: '5',
  status: StudentStatus.PENDING,
  photoUrl: undefined,
  specialNotes: 'Requires booster seat. Pickup at building entrance.',
  homeAddress: {
    street: '123 Nasr City Street',
    city: 'Cairo, Egypt',
    coordinates: { latitude: 30.0626, longitude: 31.3462 },
  },
  parent: {
    id: 'p1',
    name: 'Mr. Mohamed Salem',
    phoneNumber: '+20 123 456 7890',
    email: 'salem@example.com',
    relation: 'Father',
  },
  emergencyContacts: [
    {
      name: 'Mrs. Fatima Salem',
      phoneNumber: '+20 123 456 7891',
      relation: 'Mother',
    },
    {
      name: 'Mr. Ali Salem',
      phoneNumber: '+20 123 456 7892',
      relation: 'Uncle',
    },
  ],
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
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  studentInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  studentName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  studentGrade: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xl,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textLight,
    textTransform: 'capitalize',
  },
  notesContainer: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  notesLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notesText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    width: 100,
  },
  infoValue: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  phoneLink: {
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  addressText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  mapContainer: {
    height: 200,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginTop: spacing.md,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  emergencyContact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  contactName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  contactRelation: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionButtons: {
    padding: spacing.md,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: fontSize.xxl,
    color: colors.textLight,
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

export default StudentDetailScreen;