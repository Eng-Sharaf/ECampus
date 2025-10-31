// src/api/student.api.ts

import apiClient from '../config/apiConfig';
import { Student, StudentStatus, StudentPickupData } from '../types/student.types';

/**
 * Get students for a route
 */
export const getRouteStudents = async (routeId: string): Promise<Student[]> => {
  const response = await apiClient.get(`/routes/${routeId}/students`);
  return response.data;
};

/**
 * Get student by ID
 */
export const getStudentById = async (studentId: string): Promise<Student> => {
  const response = await apiClient.get(`/students/${studentId}`);
  return response.data;
};

/**
 * Update student status
 */
export const updateStudentStatus = async (
  studentId: string,
  status: StudentStatus,
  pickupData?: StudentPickupData
): Promise<Student> => {
  const response = await apiClient.put(`/students/${studentId}/status`, {
    status,
    pickupData,
  });
  return response.data;
};

/**
 * Mark student as picked up
 */
export const markStudentPickedUp = async (
  studentId: string,
  pickupData: StudentPickupData
): Promise<Student> => {
  return updateStudentStatus(studentId, StudentStatus.PICKED_UP, pickupData);
};

/**
 * Mark student as dropped off
 */
export const markStudentDroppedOff = async (
  studentId: string,
  pickupData: StudentPickupData
): Promise<Student> => {
  return updateStudentStatus(studentId, StudentStatus.DROPPED_OFF, pickupData);
};

/**
 * Mark student as absent
 */
export const markStudentAbsent = async (
  studentId: string,
  notes?: string
): Promise<Student> => {
  const response = await apiClient.put(`/students/${studentId}/status`, {
    status: StudentStatus.ABSENT,
    notes,
  });
  return response.data;
};

/**
 * Contact parent
 */
export const contactParent = async (
  studentId: string,
  message: string
): Promise<void> => {
  await apiClient.post(`/students/${studentId}/contact-parent`, { message });
};