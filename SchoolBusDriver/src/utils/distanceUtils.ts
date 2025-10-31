// src/utils/distanceUtils.ts

import { Coordinates } from '../types/student.types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in meters
 */
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

/**
 * Format distance for display
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * Check if a location is within a radius
 */
export const isWithinRadius = (
  coord1: Coordinates,
  coord2: Coordinates,
  radiusInMeters: number
): boolean => {
  return calculateDistance(coord1, coord2) <= radiusInMeters;
};

/**
 * Calculate estimated time of arrival based on distance and average speed
 */
export const calculateETA = (
  distanceInMeters: number,
  averageSpeedKmh: number = 30
): number => {
  const distanceInKm = distanceInMeters / 1000;
  const timeInHours = distanceInKm / averageSpeedKmh;
  return Math.round(timeInHours * 60); // Return in minutes
};

/**
 * Get the bearing between two coordinates
 */
export const getBearing = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);

  return ((θ * 180) / Math.PI + 360) % 360; // Return bearing in degrees
};