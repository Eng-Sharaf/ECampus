// src/api/driver.api.ts

import apiClient from '../config/apiConfig';
import { Driver, DriverStats, DriverLocation } from '../types/driver.types';

/**
 * Login driver
 */
export const loginDriver = async (
  email: string,
  password: string
): Promise<{ token: string; driver: Driver }> => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Get driver profile
 */
export const getDriverProfile = async (driverId: string): Promise<Driver> => {
  const response = await apiClient.get(`/drivers/${driverId}`);
  return response.data;
};

/**
 * Update driver profile
 */
export const updateDriverProfile = async (
  driverId: string,
  updates: Partial<Driver>
): Promise<Driver> => {
  const response = await apiClient.put(`/drivers/${driverId}`, updates);
  return response.data;
};

/**
 * Get driver statistics
 */
export const getDriverStats = async (driverId: string): Promise<DriverStats> => {
  const response = await apiClient.get(`/drivers/${driverId}/stats`);
  return response.data;
};

/**
 * Update driver location
 */
export const updateDriverLocation = async (
  location: DriverLocation
): Promise<void> => {
  await apiClient.post('/drivers/location', location);
};

/**
 * Logout driver
 */
export const logoutDriver = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};