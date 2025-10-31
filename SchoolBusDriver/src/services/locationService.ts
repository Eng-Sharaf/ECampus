// src/services/locationService.ts

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { Coordinates } from '../types/student.types';
import { MAP_CONFIG } from '../config/constants';

export interface LocationUpdate {
  coordinates: Coordinates;
  speed: number;
  heading: number;
  accuracy: number;
  timestamp: Date;
}

let watchId: number | null = null;

/**
 * Request location permissions
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for route tracking',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  }
  return true; // iOS handles permissions differently
};

/**
 * Get current location once
 */
export const getCurrentLocation = (): Promise<LocationUpdate> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          speed: position.coords.speed || 0,
          heading: position.coords.heading || 0,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp),
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Start watching location updates
 */
export const startLocationTracking = (
  onLocationUpdate: (location: LocationUpdate) => void,
  onError?: (error: any) => void
): void => {
  if (watchId !== null) {
    stopLocationTracking();
  }

  watchId = Geolocation.watchPosition(
    (position) => {
      onLocationUpdate({
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        speed: position.coords.speed || 0,
        heading: position.coords.heading || 0,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp),
      });
    },
    (error) => {
      console.error('Error tracking location:', error);
      if (onError) onError(error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: MAP_CONFIG.MIN_DISPLACEMENT,
      interval: MAP_CONFIG.LOCATION_UPDATE_INTERVAL,
    }
  );
};

/**
 * Stop watching location updates
 */
export const stopLocationTracking = (): void => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
  }
};

/**
 * Get default location (Cairo)
 */
export const getDefaultLocation = (): Coordinates => {
  return {
    latitude: MAP_CONFIG.DEFAULT_LATITUDE,
    longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
  };
};