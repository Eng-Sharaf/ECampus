// src/types/route.types.ts

import { Coordinates, Student } from './student.types';

export enum RouteStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
}

export enum RouteType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
}

export interface Route {
  id: string;
  name: string;
  type: RouteType;
  status: RouteStatus;
  driverId: string;
  busNumber: string;
  students: Student[];
  waypoints: Waypoint[];
  startTime?: Date;
  endTime?: Date;
  estimatedDuration: number; // in minutes
  totalDistance: number; // in kilometers
  createdAt: Date;
  updatedAt: Date;
}

export interface Waypoint {
  id: string;
  studentId: string;
  order: number;
  coordinates: Coordinates;
  address: string;
  estimatedArrival?: Date;
  actualArrival?: Date;
  completed: boolean;
}

export interface RouteProgress {
  routeId: string;
  totalStudents: number;
  pickedUpCount: number;
  droppedOffCount: number;
  remainingCount: number;
  absentCount: number;
  distanceTraveled: number;
  estimatedTimeRemaining: number;
  currentLocation: Coordinates;
}

export interface TripHistory {
  id: string;
  routeId: string;
  routeName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  totalStudents: number;
  pickedUpCount: number;
  droppedOffCount: number;
  absentCount: number;
  totalDistance: number;
  duration: number; // in minutes
  incidents?: Incident[];
  notes?: string;
}

export interface Incident {
  id: string;
  type: 'DELAY' | 'EMERGENCY' | 'MECHANICAL' | 'OTHER';
  description: string;
  timestamp: Date;
  location: Coordinates;
  resolved: boolean;
}

export interface NavigationStep {
  instruction: string;
  distance: number;
  duration: number;
  coordinates: Coordinates;
}