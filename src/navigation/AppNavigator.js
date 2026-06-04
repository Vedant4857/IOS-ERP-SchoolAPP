import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import StudentsScreen from '../screens/StudentsScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import FeesScreen from '../screens/FeesScreen';
import TimetableScreen from '../screens/TimetableScreen';
import NoticesScreen from '../screens/NoticesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ITEMS = [
  { name: 'Dashboard', icon: '🏠', label: 'Home' },
  { name: 'Students', icon: '👥', label: 'Students' },
  { name: 'Attendance', icon: '📋', label: 'Attendance' },
  { name: 'Fees', icon: '💳', label: 'Fees' },
  { name: 'Profile', icon: '⚙️', label: 'More' },
];

// Custom tab bar
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const item = TAB_ITEMS[index];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            }}
            style={styles.tabItem}
            activeOpacity={0.75}
          >
            <View style={[styles.tabIconWrap, isFocused && styles.tabIconActive]}>
              <Text style={[styles.tabIcon, { opacity: isFocused ? 1 : 0.5 }]}>
                {item.icon}
              </Text>
            </View>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {item.label}
            </Text>
            {isFocused && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Main tabs
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Students" component={StudentsScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Fees" component={FeesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root stack (tabs + push screens)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen name="Notices" component={NoticesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 20, // Safe area for iPhone
    paddingTop: Spacing.sm,
    ...Shadow.md,
  },
  tabItem: {
    flex: 1, alignItems: 'center', position: 'relative',
  },
  tabIconWrap: {
    width: 44, height: 36, borderRadius: Radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  tabIconActive: { backgroundColor: Colors.primaryLight },
  tabIcon: { fontSize: 22 },
  tabLabel: {
    fontSize: 10, color: Colors.textTertiary,
    fontWeight: '500', marginTop: 1,
  },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
  tabIndicator: {
    position: 'absolute', top: 0,
    width: 24, height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
