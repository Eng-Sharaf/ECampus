// src/api/route.api.ts

import apiClient from '../config/apiConfig';
import { Route, RouteStatus, TripHistory } from '../types/route.types';

/**
 * Get active route for driver
 */
export const getActiveRoute = async (driverId: string): Promise<Route | null> => {
  const response = await apiClient.get(`/routes/active/${driverId}`);
  return response.data;
};

/**
 * Get route by ID
 */
export const getRouteById = async (routeId: string): Promise<Route> => {
  const response = await apiClient.get(`/routes/${routeId}`);
  return response.data;
};

/**
 * Start route
 */
export const startRoute = async (routeId: string): Promise<Route> => {
  const response = await apiClient.post(`/routes/${routeId}/start`);
  return response.data;
};

/**
 * Complete route
 */
export const completeRoute = async (routeId: string): Promise<Route> => {
  const response = await apiClient.post(`/routes/${routeId}/complete`);
  return response.data;
};

/**
 * Update route status
 */
export const updateRouteStatus = async (
  routeId: string,
  status: RouteStatus
): Promise<Route> => {
  const response = await apiClient.put(`/routes/${routeId}/status`, { status });
  return response.data;
};

/**
 * Get route history
 */
export const getRouteHistory = async (
  driverId: string,
  limit: number = 20
): Promise<TripHistory[]> => {
  const response = await apiClient.get(`/routes/history/${driverId}`, {
    params: { limit },
  });
  return response.data;
};

/**
 * Report incident
 */
export const reportIncident = async (
  routeId: string,
  incident: any
): Promise<void> => {
  await apiClient.post(`/routes/${routeId}/incidents`, incident);
};