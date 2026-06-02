import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Avatar, Card, Badge } from '../components';

const CLASSES_LIST = ['Class 10 A', 'Class 8 B', 'Class 12 C', 'Class 5 A', 'Class 1 B'];

const STUDENTS = [
  { id: '1', name: 'Vedant Shekhar', roll: '01', status: 'present' },
  { id: '2', name: 'Priya Patel', roll: '02', status: 'absent' },
  { id: '3', name: 'Rohan Gupta', roll: '03', status: 'present' },
  { id: '4', name: 'Sneha Verma', roll: '04', status: 'leave' },
  { id: '5', name: 'Arjun Singh', roll: '05', status: 'present' },
  { id: '6', name: 'Kavya Nair', roll: '06', status: 'present' },
  { id: '7', name: 'Devraj Mehta', roll: '07', status: 'absent' },
  { id: '8', name: 'Tanvi Joshi', roll: '08', status: 'present' },
];

const STATUS_CONFIG = {
  present: { label: 'P', color: Colors.success, bg: Colors.successLight },
  absent: { label: 'A', color: Colors.danger, bg: Colors.dangerLight },
  leave: { label: 'L', color: Colors.warning, bg: Colors.warningLight },
};

export default function AttendanceScreen() {
  const [selectedClass, setSelectedClass] = useState('Class 10 A');
  const [attendance, setAttendance] = useState(
    Object.fromEntries(STUDENTS.map(s => [s.id, s.status]))
  );
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSaved(false);
    setAttendance(prev => {
      const cycle = { present: 'absent', absent: 'leave', leave: 'present' };
      return { ...prev, [id]: cycle[prev[id]] };
    });
  };

  const counts = Object.values(attendance).reduce(
    (acc, v) => ({ ...acc, [v]: (acc[v] || 0) + 1 }), {}
  );

  const handleSave = () => setSaved(true);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>

      {/* Class selector */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.classRow}
        style={{ flexGrow: 0, marginBottom: Spacing.md }}
      >
        {CLASSES_LIST.map(c => (
          <TouchableOpacity
            key={c}
            onPress={() => { setSelectedClass(c); setSaved(false); }}
            style={[styles.classBtn, selectedClass === c && styles.classBtnActive]}
          >
            <Text style={[styles.classBtnText, selectedClass === c && styles.classBtnTextActive]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Summary */}
      <View style={styles.summaryRow}>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <View key={key} style={[styles.summaryItem, { backgroundColor: cfg.bg }]}>
            <Text style={[styles.summaryCount, { color: cfg.color }]}>{counts[key] || 0}</Text>
            <Text style={[styles.summaryLabel, { color: cfg.color }]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </View>
        ))}
        <View style={[styles.summaryItem, { backgroundColor: Colors.primaryLight }]}>
          <Text style={[styles.summaryCount, { color: Colors.primary }]}>{STUDENTS.length}</Text>
          <Text style={[styles.summaryLabel, { color: Colors.primary }]}>Total</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendHint}>Tap a student to cycle: </Text>
        {['present', 'absent', 'leave'].map(s => (
          <View key={s} style={[styles.legendDot, { backgroundColor: STATUS_CONFIG[s].color }]} />
        ))}
        <Text style={styles.legendHint}> P → A → L</Text>
      </View>

      {/* Student list */}
      <FlatList
        data={STUDENTS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: Spacing.base, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item }) => {
          const st = attendance[item.id];
          const cfg = STATUS_CONFIG[st];
          return (
            <TouchableOpacity
              style={styles.studentRow}
              onPress={() => toggle(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.rollBadge}>
                <Text style={styles.rollText}>{item.roll}</Text>
              </View>
              <Avatar name={item.name} size={40} color={cfg.color} />
              <Text style={styles.studentName}>{item.name}</Text>
              <TouchableOpacity
                style={[styles.statusBtn, { backgroundColor: cfg.bg, borderColor: cfg.color }]}
                onPress={() => toggle(item.id)}
              >
                <Text style={[styles.statusBtnText, { color: cfg.color }]}>{cfg.label}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />

      {/* Save Bar */}
      <View style={styles.saveBar}>
        {saved && <Text style={styles.savedText}>✅ Attendance saved!</Text>}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  title: {
    fontSize: Typography['2xl'], fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },
  date: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },

  classRow: { paddingHorizontal: Spacing.base, paddingBottom: 4 },
  classBtn: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs + 6, minHeight: 40,
    borderRadius: Radius.full, backgroundColor: Colors.surface,
    marginRight: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.sm, gap: Spacing.sm,
  },
  classBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  classBtnText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },

  classBtnTextActive: { color: Colors.white, fontWeight: '600' },

  summaryRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm, gap: Spacing.sm,
  },
  summaryItem: {
    flex: 1, borderRadius: Radius.md, alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  summaryCount: { fontSize: Typography.xl, fontWeight: '800' },
  summaryLabel: { fontSize: Typography.xs, fontWeight: '600', marginTop: 1 },

  legend: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, marginBottom: Spacing.sm,
  },
  legendHint: { fontSize: Typography.xs, color: Colors.textTertiary },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 2 },

  studentRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.md, ...Shadow.sm,
  },
  rollBadge: {
    width: 28, height: 28, borderRadius: Radius.sm,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  rollText: { fontSize: Typography.xs, fontWeight: '700', color: Colors.textSecondary },
  studentName: {
    flex: 1, fontSize: Typography.base, fontWeight: '600',
    color: Colors.textPrimary, marginLeft: Spacing.sm,
  },
  statusBtn: {
    width: 30, height: 30, borderRadius: Radius.md,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  statusBtnText: { fontWeight: '800', fontSize: Typography.base },

  saveBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface, padding: Spacing.base,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1, borderTopColor: Colors.border,
    alignItems: 'center', ...Shadow.lg,
  },
  savedText: { fontSize: Typography.sm, color: Colors.success, marginBottom: Spacing.sm, fontWeight: '600' },
  saveBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg,
    paddingVertical: Spacing.md, paddingHorizontal: Spacing['2xl'],
    width: '100%', alignItems: 'center',
  },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.base },
});
