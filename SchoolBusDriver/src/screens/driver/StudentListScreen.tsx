import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';
import StudentCard from '../../components/driver/StudentCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors, spacing, fontSize, fontWeight, borderRadius, layout } from '../../config/theme';
import { Student, StudentStatus } from '../../types/student.types';
import { DriverScreenProps } from '@/types/navigation.types';

type Props = DriverScreenProps<'StudentList'>;

const StudentListScreen: React.FC<Props> = ({ navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | StudentStatus>('all');


  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      // TODO: Fetch students from API
      // const data = await getRouteStudents(routeId);
      // setStudents(data);
      
      // Mock data
      setStudents(createMockStudents());
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = useCallback(() => {
    let filtered = students;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === selectedFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.homeAddress.street.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedFilter, searchQuery]);


  const handleStudentPress = (studentId: string) => {
    navigation.navigate('StudentDetail', { studentId }); // ✅ fully typed now
  };


  const filters = [
    { id: 'all', label: 'All', count: students.length },
    {
      id: StudentStatus.PICKED_UP,
      label: 'Picked Up',
      count: students.filter((s) => s.status === StudentStatus.PICKED_UP).length,
    },
    {
      id: StudentStatus.PENDING,
      label: 'Pending',
      count: students.filter((s) => s.status === StudentStatus.PENDING).length,
    },
    {
      id: StudentStatus.ABSENT,
      label: 'Absent',
      count: students.filter((s) => s.status === StudentStatus.ABSENT).length,
    },
  ];

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading students..." />;
  }

  return (
    <View style={styles.container}>
      <Header title="Students" subtitle={`${students.length} total`} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.id as any)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label} ({filter.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Student List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() => handleStudentPress(item.id)}
            showActions={false}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
      />
    </View>
  );
};

const createMockStudents = (): Student[] => [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Salem',
    grade: '5',
    status: StudentStatus.PICKED_UP,
    homeAddress: {
      street: '123 Nasr City, Cairo',
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
      street: '456 Heliopolis, Cairo',
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
  {
    id: '3',
    firstName: 'Omar',
    lastName: 'Hassan',
    grade: '6',
    status: StudentStatus.PENDING,
    homeAddress: {
      street: '789 Maadi, Cairo',
      city: 'Cairo',
      coordinates: { latitude: 29.9602, longitude: 31.2569 },
    },
    parent: {
      id: 'p3',
      name: 'Mr. Hassan',
      phoneNumber: '+20 123 456 7892',
      relation: 'Father',
    },
    emergencyContacts: [],
  },
  {
    id: '4',
    firstName: 'Fatima',
    lastName: 'Ali',
    grade: '3',
    status: StudentStatus.ABSENT,
    homeAddress: {
      street: '321 Zamalek, Cairo',
      city: 'Cairo',
      coordinates: { latitude: 30.0618, longitude: 31.2194 },
    },
    parent: {
      id: 'p4',
      name: 'Mrs. Ali',
      phoneNumber: '+20 123 456 7893',
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
  searchContainer: {
    padding: spacing.md,
    backgroundColor: colors.backgroundLight,
  },
  searchInput: {
    height: layout.inputHeight,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundLight,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  filterTextActive: {
    color: colors.textLight,
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});

export default StudentListScreen;