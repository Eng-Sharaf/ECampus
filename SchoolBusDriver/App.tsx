// App.tsx

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/auth/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RouteScreen from './src/screens/driver/RouteScreen';
import StudentListScreen from './src/screens/driver/StudentListScreen';
import StudentDetailScreen from './src/screens/driver/StudentDetailScreen';
import RouteHistoryScreen from './src/screens/driver/RouteHistoryScreen';
import ProfileScreen from './src/screens/driver/ProfileScreen';
import { getAuthToken } from './src/services/storageService';
import { requestLocationPermission } from './src/services/locationService';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Request location permission
      await requestLocationPermission();
      
      // Check if user is authenticated
      const token = await getAuthToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Show splash for at least 1.5s
    }
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            // Auth Stack
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            // Driver Stack
            <>
              <Stack.Screen name="Route" component={RouteScreen} />
              <Stack.Screen name="StudentList" component={StudentListScreen} />
              <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
              <Stack.Screen name="RouteHistory" component={RouteHistoryScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;