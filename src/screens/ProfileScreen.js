import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, Switch,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Avatar, Card } from '../components';

const MENU_SECTIONS = [
  {
    title: 'School',
    items: [
      { icon: '🏫', label: 'School Profile', sub: 'Sunrise Public School' },
      { icon: '📅', label: 'Academic Year', sub: '2025–26' },
      { icon: '🎓', label: 'Classes & Sections', sub: '42 classes' },
      { icon: '🧑‍🏫', label: 'Staff Directory', sub: '86 members' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { icon: '📊', label: 'Attendance Report' },
      { icon: '💰', label: 'Fee Collection Report' },
      { icon: '📝', label: 'Exam Results' },
      { icon: '🚌', label: 'Transport Log' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: '🔔', label: 'Notifications', toggle: true },
      { icon: '🌙', label: 'Dark Mode', toggle: true },
      { icon: '🔒', label: 'Change Password' },
      { icon: '🌐', label: 'Language', sub: 'English' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help & FAQ' },
      { icon: '📧', label: 'Contact Support' },
      { icon: '⭐', label: 'Rate the App' },
      { icon: '📄', label: 'Privacy Policy' },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <SafeAreaView
      style={[
        styles.safe,
        {
          backgroundColor: darkMode
            ? '#0F172A'
            : Colors.background,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile card */}
        <View style={styles.profileCard}>
          <Avatar name="Admin User" size={72} color={Colors.primary} />
          <Text style={styles.adminName}>Admin User</Text>
          <Text style={styles.adminRole}>School Administrator</Text>
          <Text style={styles.adminSchool}>🏫 Sunrise Public School</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          {[
            { label: 'Students', value: '1,248' },
            { label: 'Teachers', value: '86' },
            { label: 'Classes', value: '42' },
          ].map((s, i) => (
            <View key={i} style={[styles.stripItem, i < 2 && styles.stripBorder]}>
              <Text style={styles.stripValue}>{s.value}</Text>
              <Text style={styles.stripLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.menuItem,
                    i < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  activeOpacity={item.toggle ? 1 : 0.75}
                >
                  <View style={styles.menuIcon}>
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                  </View>
                  <View style={styles.menuBody}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.sub && <Text style={styles.menuSub}>{item.sub}</Text>}
                  </View>
                  {item.toggle
                    ? <Switch
                      value={
                        item.label === 'Dark Mode'
                          ? darkMode
                          : true
                      }
                      onValueChange={() => {
                        if (item.label === 'Dark Mode') {
                          setDarkMode(!darkMode);
                        }
                      }}
                      trackColor={{
                        true: Colors.primary,
                        false: Colors.border,
                      }}
                      ios_backgroundColor={Colors.border}
                    />
                    : <Text style={styles.menuChevron}>›</Text>
                  }
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Log out */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪  Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>School ERP v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  profileCard: {
    backgroundColor: Colors.surface, alignItems: 'center',
    paddingVertical: Spacing.xl, paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  adminName: {
    fontSize: Typography.xl, fontWeight: '800',
    color: Colors.textPrimary, marginTop: Spacing.sm, letterSpacing: -0.5,
  },
  adminRole: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  adminSchool: { fontSize: Typography.sm, color: Colors.primary, marginTop: 4, fontWeight: '600' },
  editBtn: {
    marginTop: Spacing.md, borderWidth: 1.5, borderColor: Colors.primary,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
  },
  editBtnText: { color: Colors.primary, fontWeight: '600', fontSize: Typography.sm },

  statsStrip: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
  },
  stripItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  stripBorder: { borderRightWidth: 1, borderRightColor: Colors.divider },
  stripValue: {
    fontSize: Typography.xl, fontWeight: '800',
    color: Colors.primary, letterSpacing: -0.5,
  },
  stripLabel: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },

  section: { marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs, fontWeight: '700',
    color: Colors.textTertiary, textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm,
  },
  sectionCard: { backgroundColor: Colors.surface },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.base,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  menuIcon: {
    width: 36, height: 36, borderRadius: Radius.md,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuBody: { flex: 1 },
  menuLabel: { fontSize: Typography.base, fontWeight: '600', color: Colors.textPrimary },
  menuSub: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 1 },
  menuChevron: { fontSize: 22, color: Colors.textTertiary },

  logoutBtn: {
    margin: Spacing.base,
    backgroundColor: Colors.dangerLight,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  logoutText: { fontSize: Typography.base, fontWeight: '700', color: Colors.danger },
  version: {
    textAlign: 'center', fontSize: Typography.xs,
    color: Colors.textTertiary, marginBottom: Spacing.md,
  },
});
