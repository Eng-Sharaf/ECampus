// src/config/constants.ts

export const APP_CONFIG = {
  APP_NAME: 'School Bus Tracker',
  VERSION: '1.0.0',
  BUNDLE_ID: 'com.schoolbus.driver',
};

export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api' 
    : 'https://api.schoolbus.com',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

export const MAP_CONFIG = {
  DEFAULT_LATITUDE: 30.0444, // Cairo coordinates
  DEFAULT_LONGITUDE: 31.2357,
  DEFAULT_ZOOM: 15,
  LOCATION_UPDATE_INTERVAL: 5000, // 5 seconds
  MIN_DISPLACEMENT: 10, // meters
  ROUTE_LINE_WIDTH: 4,
  MARKER_SIZE: 40,
};

export const ROUTE_CONFIG = {
  MAX_STUDENTS_PER_ROUTE: 50,
  PICKUP_RADIUS: 100, // meters - radius to mark student as picked up
  MAX_ROUTE_DURATION: 120, // minutes
  WARNING_TIME_THRESHOLD: 15, // minutes before expected time to show warning
};

export const NOTIFICATION_CONFIG = {
  PICKUP_REMINDER: 5, // minutes before pickup
  ARRIVAL_NOTIFICATION: 2, // minutes before arrival
  DELAY_THRESHOLD: 10, // minutes to trigger delay notification
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  DRIVER_ID: '@driver_id',
  CURRENT_ROUTE: '@current_route',
  ROUTE_HISTORY: '@route_history',
  APP_SETTINGS: '@app_settings',
};

export const PERMISSION_MESSAGES = {
  LOCATION_TITLE: 'Location Permission Required',
  LOCATION_MESSAGE: 'This app needs access to your location to track the bus route and provide real-time updates to parents.',
  NOTIFICATION_TITLE: 'Notification Permission Required',
  NOTIFICATION_MESSAGE: 'Enable notifications to receive important updates about route changes and student pickups.',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  LOCATION_ERROR: 'Unable to get your current location. Please check location permissions.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

export const SUCCESS_MESSAGES = {
  STUDENT_PICKED_UP: 'Student marked as picked up',
  STUDENT_DROPPED_OFF: 'Student marked as dropped off',
  ROUTE_STARTED: 'Route started successfully',
  ROUTE_COMPLETED: 'Route completed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[\d\s-()]+$/,
  LICENSE_NUMBER: /^[A-Z0-9-]+$/i,
};

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

export const EMERGENCY_CONTACTS = [
  {
    name: 'School Office',
    phoneNumber: '+20 123 456 7890',
    type: 'SCHOOL' as const,
  },
  {
    name: 'Police',
    phoneNumber: '122',
    type: 'POLICE' as const,
  },
  {
    name: 'Maintenance',
    phoneNumber: '+20 123 456 7891',
    type: 'MAINTENANCE' as const,
  },
  {
    name: 'Supervisor',
    phoneNumber: '+20 123 456 7892',
    type: 'SUPERVISOR' as const,
  },
];