// src/types/driver.types.ts

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  licenseExpiry: Date;
  photoUrl?: string;
  busNumber: string;
  employeeId: string;
  status: DriverStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum DriverStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
}

export interface DriverStats {
  totalTrips: number;
  totalDistance: number;
  totalHours: number;
  averageRating: number;
  onTimePercentage: number;
  incidentCount: number;
  monthlyTrips: number;
}

export interface DriverLocation {
  driverId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  speed: number; // km/h
  heading: number; // degrees
  accuracy: number; // meters
  timestamp: Date;
}

export interface EmergencyContact {
  name: string;
  phoneNumber: string;
  type: 'POLICE' | 'SCHOOL' | 'MAINTENANCE' | 'SUPERVISOR';
}