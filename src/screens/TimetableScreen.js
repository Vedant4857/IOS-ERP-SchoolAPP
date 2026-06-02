import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TODAY_IDX = Math.min(new Date().getDay() - 1, 5); // 0=Mon

const TIMETABLE = {
  Mon: [
    { time: '8:00–8:45',  subject: 'Mathematics',    teacher: 'Mr. Sharma',  color: Colors.primary },
    { time: '8:45–9:30',  subject: 'Science',         teacher: 'Ms. Gupta',   color: Colors.success },
    { time: '9:30–9:45',  subject: 'Break',            teacher: '',            color: Colors.border, isBreak: true },
    { time: '9:45–10:30', subject: 'English',          teacher: 'Ms. Khan',    color: Colors.warning },
    { time: '10:30–11:15',subject: 'Social Science',   teacher: 'Mr. Patel',   color: Colors.purple },
    { time: '11:15–12:00',subject: 'Hindi',            teacher: 'Ms. Rao',     color: Colors.accent },
    { time: '12:00–12:45',subject: 'Lunch',            teacher: '',            color: Colors.border, isBreak: true },
    { time: '12:45–1:30', subject: 'Computer Science', teacher: 'Mr. Mehta',   color: Colors.primary },
    { time: '1:30–2:15',  subject: 'Physical Education', teacher: 'Mr. Singh', color: Colors.success },
  ],
  Tue: [
    { time: '8:00–8:45',  subject: 'English',          teacher: 'Ms. Khan',    color: Colors.warning },
    { time: '8:45–9:30',  subject: 'Mathematics',      teacher: 'Mr. Sharma',  color: Colors.primary },
    { time: '9:30–9:45',  subject: 'Break',            teacher: '',            color: Colors.border, isBreak: true },
    { time: '9:45–10:30', subject: 'Hindi',            teacher: 'Ms. Rao',     color: Colors.accent },
    { time: '10:30–11:15',subject: 'Science',          teacher: 'Ms. Gupta',   color: Colors.success },
    { time: '11:15–12:00',subject: 'Art & Craft',      teacher: 'Mr. Joshi',   color: Colors.danger },
    { time: '12:00–12:45',subject: 'Lunch',            teacher: '',            color: Colors.border, isBreak: true },
    { time: '12:45–1:30', subject: 'Social Science',   teacher: 'Mr. Patel',   color: Colors.purple },
    { time: '1:30–2:15',  subject: 'Computer Science', teacher: 'Mr. Mehta',   color: Colors.primary },
  ],
};
// Fallback for other days
const DEFAULT_DAY = TIMETABLE.Mon;

export default function TimetableScreen() {
  const [activeDay, setActiveDay] = useState(Math.max(TODAY_IDX, 0));
  const [selectedClass, setSelectedClass] = useState('Class 10 A');

  const dayName = DAYS[activeDay];
  const periods = TIMETABLE[dayName] || DEFAULT_DAY;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Timetable</Text>
        <View style={styles.classSelector}>
          <Text style={styles.classSelectorText}>{selectedClass}</Text>
          <Text style={{ color: Colors.primary, marginLeft: 4 }}>▼</Text>
        </View>
      </View>

      {/* Day selector */}
      <View style={styles.dayRow}>
        {DAYS.map((d, i) => (
          <TouchableOpacity
            key={d}
            onPress={() => setActiveDay(i)}
            style={[styles.dayBtn, activeDay === i && styles.dayBtnActive]}
          >
            <Text style={[styles.dayText, activeDay === i && styles.dayTextActive]}>{d}</Text>
            {i === TODAY_IDX && <View style={[styles.todayDot, activeDay === i && { backgroundColor: Colors.white }]} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 100 }}
      >
        {periods.map((p, i) => (
          p.isBreak ? (
            <View key={i} style={styles.breakRow}>
              <Text style={styles.breakText}>{p.subject} · {p.time}</Text>
            </View>
          ) : (
            <View key={i} style={styles.periodRow}>
              {/* Time column */}
              <View style={styles.timeCol}>
                <Text style={styles.timeText}>{p.time.split('–')[0]}</Text>
                <View style={[styles.timeLine, { backgroundColor: p.color }]} />
                <Text style={styles.timeText}>{p.time.split('–')[1]}</Text>
              </View>
              {/* Period card */}
              <View style={[styles.periodCard, { borderLeftColor: p.color }]}>
                <View style={[styles.periodDot, { backgroundColor: p.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.periodSubject}>{p.subject}</Text>
                  <Text style={styles.periodTeacher}>{p.teacher}</Text>
                </View>
                <View style={[styles.periodPill, { backgroundColor: p.color + '18' }]}>
                  <Text style={[styles.periodPillText, { color: p.color }]}>45 min</Text>
                </View>
              </View>
            </View>
          )
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography['2xl'], fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },
  classSelector: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.primaryLight, borderRadius: Radius.full,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2,
  },
  classSelectorText: { fontSize: Typography.sm, color: Colors.primary, fontWeight: '600' },

  dayRow: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: Spacing.base, borderRadius: Radius.lg,
    padding: Spacing.xs, marginBottom: Spacing.base, ...Shadow.sm,
  },
  dayBtn: {
    flex: 1, alignItems: 'center', paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  dayBtnActive: { backgroundColor: Colors.primary },
  dayText: { fontSize: Typography.sm, fontWeight: '600', color: Colors.textSecondary },
  dayTextActive: { color: Colors.white },
  todayDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: Colors.primary, marginTop: 2,
  },

  breakRow: {
    backgroundColor: Colors.divider, borderRadius: Radius.sm,
    paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm, alignItems: 'center',
  },
  breakText: { fontSize: Typography.xs, color: Colors.textTertiary, fontWeight: '500' },

  periodRow: {
    flexDirection: 'row', marginBottom: Spacing.md, alignItems: 'stretch',
  },
  timeCol: {
    width: 52, alignItems: 'center', marginRight: Spacing.md, paddingTop: 2,
  },
  timeText: { fontSize: 10, color: Colors.textTertiary, fontWeight: '500', textAlign: 'center' },
  timeLine: { width: 2, flex: 1, marginVertical: 4, borderRadius: 1 },

  periodCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.md, flexDirection: 'row', alignItems: 'center',
    borderLeftWidth: 4, ...Shadow.sm,
  },
  periodDot: { width: 10, height: 10, borderRadius: 5, marginRight: Spacing.md },
  periodSubject: {
    fontSize: Typography.base, fontWeight: '700', color: Colors.textPrimary,
  },
  periodTeacher: {
    fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2,
  },
  periodPill: {
    paddingHorizontal: Spacing.sm, paddingVertical: 3,
    borderRadius: Radius.full,
  },
  periodPillText: { fontSize: Typography.xs, fontWeight: '600' },
});
