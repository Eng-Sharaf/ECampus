// src/types/student.types.ts

export enum StudentStatus {
  PENDING = 'PENDING',
  PICKED_UP = 'PICKED_UP',
  DROPPED_OFF = 'DROPPED_OFF',
  ABSENT = 'ABSENT',
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  photoUrl?: string;
  status: StudentStatus;
  homeAddress: Address;
  pickupTime?: string;
  dropoffTime?: string;
  specialNotes?: string;
  parent: ParentInfo;
  emergencyContacts: EmergencyContact[];
}

export interface Address {
  street: string;
  city: string;
  coordinates: Coordinates;
  landmark?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ParentInfo {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  relation: 'Mother' | 'Father' | 'Guardian';
}

export interface EmergencyContact {
  name: string;
  phoneNumber: string;
  relation: string;
}

export interface StudentPickupData {
  studentId: string;
  timestamp: Date;
  location: Coordinates;
  status: StudentStatus;
  notes?: string;
}