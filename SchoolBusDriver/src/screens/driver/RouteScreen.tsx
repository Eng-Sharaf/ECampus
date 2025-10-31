// src/screens/driver/RouteScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Header from '../../components/common/Header';
import RouteStatsCard from '../../components/driver/RouteStatsCard';
import StudentCard from '../../components/driver/StudentCard';
import EmergencyButton from '../../components/driver/EmergencyButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../config/theme';
import { Route, RouteStatus, RouteProgress } from '../../types/route.types';
import { Student, StudentStatus } from '../../types/student.types';
import { startLocationTracking, stopLocationTracking, getCurrentLocation } from '../../services/locationService';
import { calculateDistance } from '../../utils/distanceUtils';

const RouteScreen: React.FC = () => {
  const [route, setRoute] = useState<Route | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [routeActive, setRouteActive] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    initializeScreen();
    return () => {
      stopLocationTracking();
    };
  }, []);

  const initializeScreen = async () => {
    try {
      // Get current location
      const location = await getCurrentLocation();
      setCurrentLocation({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      });

      // TODO: Fetch active route from API
      // const activeRoute = await getActiveRoute(driverId);
      // setRoute(activeRoute);
      // setStudents(activeRoute.students);

      // Mock data for development
      setRoute(createMockRoute());
      setStudents(createMockStudents());

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to initialize route screen');
    }finally {
      setLoading(false);
    }
  };

  const handleStartRoute = () => {
    Alert.alert(
      'Start Route',
      'Are you sure you want to start this route?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: () => {
            setRouteActive(true);
            startLocationTracking((location) => {
              setCurrentLocation({
                latitude: location.coordinates.latitude,
                longitude: location.coordinates.longitude,
              });
            });
          },
        },
      ]
    );
  };

  const handleStopRoute = () => {
    Alert.alert(
      'Complete Route',
      'Are you sure you want to complete this route?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => {
            setRouteActive(false);
            stopLocationTracking();
            Alert.alert('Success', 'Route completed successfully!');
          },
        },
      ]
    );
  };

  const handleMarkPickup = (student: Student) => {
    Alert.alert(
      'Mark Pickup',
      `Mark ${student.firstName} as picked up?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // Update student status
            const updatedStudents = students.map((s) =>
              s.id === student.id
                ? { ...s, status: StudentStatus.PICKED_UP }
                : s
            );
            setStudents(updatedStudents);
          },
        },
      ]
    );
  };

  const calculateProgress = (): RouteProgress => {
    const pickedUp = students.filter((s) => s.status === StudentStatus.PICKED_UP).length;
    const droppedOff = students.filter((s) => s.status === StudentStatus.DROPPED_OFF).length;
    const absent = students.filter((s) => s.status === StudentStatus.ABSENT).length;
    
    return {
      routeId: route?.id || '',
      totalStudents: students.length,
      pickedUpCount: pickedUp,
      droppedOffCount: droppedOff,
      remainingCount: students.length - pickedUp - droppedOff - absent,
      absentCount: absent,
      distanceTraveled: 5.3, // Mock value
      estimatedTimeRemaining: 25, // Mock value
      currentLocation: currentLocation || { latitude: 0, longitude: 0 },
    };
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading route..." />;
  }

  const pendingStudents = students.filter((s) => s.status === StudentStatus.PENDING);

  return (
    <View style={styles.container}>
      <Header
        title={route?.name || 'Route'}
        subtitle={`${students.length} students`}
        rightElement={<EmergencyButton />}
      />


      {/* Map Section */}
      <View style={styles.mapContainer}>
        {currentLocation && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {/* Bus Marker */}
            {currentLocation && (
              <Marker
                coordinate={currentLocation}
                title="Your Location"
                description="Bus"
              >
                <View style={styles.busMarker}>
                  <Text style={styles.busMarkerText}>🚌</Text>
                </View>
              </Marker>
            )}

            {/* Student Markers */}
            {students.map((student) => (
              <Marker
                key={student.id}
                coordinate={student.homeAddress.coordinates}
                title={`${student.firstName} ${student.lastName}`}
                description={student.homeAddress.street}
              >
                <View
                  style={[
                    styles.studentMarker,
                    {
                      backgroundColor:
                        student.status === StudentStatus.PICKED_UP
                          ? colors.success
                          : colors.warning,
                    },
                  ]}
                />
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <RouteStatsCard progress={calculateProgress()} />

        <View style={styles.actionButtonsContainer}>
          {!routeActive ? (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success }]}
              onPress={handleStartRoute}
            >
              <Text style={styles.actionButtonText}>▶ Start Route</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.danger }]}
              onPress={handleStopRoute}
            >
              <Text style={styles.actionButtonText}>■ Complete Route</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Next Students ({pendingStudents.length})
        </Text>

        <ScrollView
          style={styles.studentList}
          showsVerticalScrollIndicator={false}
        >
          {pendingStudents.slice(0, 3).map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onPress={() => {}}
              onMarkPickup={() => handleMarkPickup(student)}
              distance={
                currentLocation
                  ? Math.round(
                      calculateDistance(
                        currentLocation,
                        student.homeAddress.coordinates
                      )
                    )
                  : undefined
              }
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Mock data functions
const createMockRoute = (): Route => ({
  id: '1',
  name: 'Morning Route A',
  type: 'MORNING' as any,
  status: RouteStatus.IN_PROGRESS,
  driverId: 'driver1',
  busNumber: 'BUS-101',
  students: [],
  waypoints: [],
  estimatedDuration: 60,
  totalDistance: 15,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createMockStudents = (): Student[] => [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Salem',
    grade: '5',
    status: StudentStatus.PENDING,
    homeAddress: {
      street: 'Nasr City, Cairo',
      city: 'Cairo',
      coordinates: { latitude: 30.0626, longitude: 31.3462 },
    },
    parent: {
      id: 'p1',
      name: 'Mr. Salem',
      phoneNumber: '+20 123 456 7890',
      relation: 'Father',
    },
    emergencyContacts: [],
  },
  {
    id: '2',
    firstName: 'Maryam',
    lastName: 'Khaled',
    grade: '4',
    status: StudentStatus.PENDING,
    homeAddress: {
      street: 'Heliopolis, Cairo',
      city: 'Cairo',
      coordinates: { latitude: 30.0875, longitude: 31.3241 },
    },
    parent: {
      id: 'p2',
      name: 'Mrs. Khaled',
      phoneNumber: '+20 123 456 7891',
      relation: 'Mother',
    },
    emergencyContacts: [],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  busMarker: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  busMarkerText: {
    fontSize: 20,
  },
  studentMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.backgroundLight,
  },
  bottomSheet: {
    backgroundColor: colors.backgroundLight,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.lg,
    maxHeight: '50%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  actionButtonsContainer: {
    marginBottom: spacing.md,
  },
  actionButton: {
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.textLight,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  studentList: {
    flex: 1,
  },
});

export default RouteScreen;