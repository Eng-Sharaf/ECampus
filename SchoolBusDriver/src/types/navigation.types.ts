// src/types/navigation.types.ts
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Auth Stack
export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
};

// Driver Stack
export type DriverStackParamList = {
  Route: undefined;
  StudentList: undefined;
  StudentDetail: { studentId: string };
  RouteHistory: undefined;
  Profile: undefined;
};

// Bottom Tab Navigator
export type DriverTabParamList = {
  RouteTab: undefined;
  StudentsTab: undefined;
  HistoryTab: undefined;
  ProfileTab: undefined;
};

// Root Stack
export type RootStackParamList = {
  Auth: undefined;
  Driver: undefined;
  Parent: undefined; // Placeholder for parent app
};

// Screen Props Types
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type DriverScreenProps<T extends keyof DriverStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DriverStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type DriverTabScreenProps<T extends keyof DriverTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DriverTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}