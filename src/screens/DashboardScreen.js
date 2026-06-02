import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, Platform,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import {
  Card, Badge, StatTile, SectionHeader, Avatar,
} from '../components';

const STATS = [
  { icon: '👥', value: '124', label: 'Students', color: Colors.primary, bg: Colors.purpleLight },
  { icon: '🎓', value: '86', label: 'Teachers', color: Colors.success, bg: Colors.successLight },
  { icon: '📚', value: '42', label: 'Classes', color: Colors.purple, bg: Colors.purpleLight },
  { icon: '💰', value: '94%', label: 'Fee Paid', color: Colors.warning, bg: Colors.warningLight },
];

const NOTICES = [
  { id: 1, title: 'Annual Sports Day', date: 'Jun 10', tag: 'Event', tagColor: Colors.primary },
  { id: 2, title: 'Fee Due Reminder', date: 'Jun 5', tag: 'Finance', tagColor: Colors.warning },
  { id: 3, title: 'Exam Schedule Out', date: 'Jun 3', tag: 'Exam', tagColor: Colors.danger },
];

const QUICK_LINKS = [
  { icon: '📋', label: 'Attendance', screen: 'Attendance' },
  { icon: '📊', label: 'Results', screen: 'Results' },
  { icon: '💳', label: 'Fees', screen: 'Fees' },
  { icon: '📅', label: 'Timetable', screen: 'Timetable' },
  { icon: '📣', label: 'Notices', screen: 'Notices' },
  { icon: '🚌', label: 'Transport', screen: 'Transport' },
];

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerGlow} />
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good Morning 👋</Text>
              <Text style={styles.schoolName}>Sunrise Public School</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar name="Vedant Shekhar" size={44} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Search pill */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Students')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search students, staff…</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          {STATS.map((s, i) => (
            <StatTile key={i} {...s} />
          ))}
        </View>

        {/* ── Quick Links ── */}
        <SectionHeader title="Quick Access" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickLinks}
        >
          {QUICK_LINKS.map((q, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickLink}
              onPress={() => navigation.navigate(q.screen)}
            >
              <View style={styles.quickLinkIcon}>
                <Text style={{ fontSize: 26 }}>{q.icon}</Text>
              </View>
              <Text style={styles.quickLinkLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Today's Attendance Summary ── */}
        <SectionHeader
          title="Today's Attendance"
          action="View All"
          onAction={() => navigation.navigate('Attendance')}
        />
        <View style={[styles.attendanceCard, Shadow.md]}>
          {/* Bar chart */}
          <View style={styles.attRow}>
            <AttendBar label="Present" percent={78} color={Colors.success} />
            <AttendBar label="Absent" percent={14} color={Colors.danger} />
            <AttendBar label="Leave" percent={8} color={Colors.warning} />
          </View>
          <Text style={styles.attFooter}>
            Last updated today at 9:30 AM
          </Text>
        </View>

        {/* ── Notices ── */}
        <SectionHeader
          title="Latest Notices"
          action="See All"
          onAction={() => navigation.navigate('Notices')}
        />
        <View style={styles.noticesWrap}>
          {NOTICES.map(n => (
            <Card key={n.id} style={styles.noticeCard} onPress={() => { }}>
              <View style={styles.noticeRow}>
                <View style={{ flex: 1 }}>
                  <Badge label={n.tag} color={n.tagColor} bg={n.tagColor + '18'} />
                  <Text style={styles.noticeTitle}>{n.title}</Text>
                </View>
                <Text style={styles.noticeDate}>{n.date}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* ── Upcoming Events ── */}
        <SectionHeader title="Upcoming Events" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Spacing.base, paddingBottom: 4 }}
        >
          {[
            { title: 'PTM Meeting', date: 'Jun 8', color: Colors.primary },
            { title: 'Science Fair', date: 'Jun 15', color: Colors.success },
            { title: 'Summer Holidays', date: 'Jun 20', color: Colors.warning },
          ].map((ev, i) => (
            <View key={i} style={[styles.eventCard, { borderTopColor: ev.color }]}>
              <Text style={[styles.eventDate, { color: ev.color }]}>{ev.date}</Text>
              <Text style={styles.eventTitle}>{ev.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function AttendBar({ label, percent, color }) {
  return (
    <View style={styles.attCol}>
      <Text style={[styles.attPercent, { color }]}>{percent}%</Text>
      <View style={styles.attBarBg}>
        <View style={[styles.attBarFill, { height: `${percent}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.attLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.primary },
  scroll: { flex: 1, backgroundColor: Colors.background },

  header: {
    backgroundColor: Colors.primary,
    paddingTop: Platform.OS === 'android' ? Spacing.base : 0,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.base,
    borderBottomLeftRadius: Radius.xl + 4,
    borderBottomRightRadius: Radius.xl + 4,
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: -60, right: -60,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: Spacing.base,
  },
  greeting: {
    fontSize: Typography.sm, color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
  schoolName: {
    fontSize: Typography.xl, color: Colors.white,
    fontWeight: '800', letterSpacing: -0.5, marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm + 2,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchPlaceholder: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.base, flex: 1,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    marginTop: -Spacing.base,
    marginBottom: Spacing.sm,
  },

  quickLinks: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 4,
  },
  quickLink: { alignItems: 'center', marginRight: Spacing.base + 4 },
  quickLinkIcon: {
    width: 60, height: 60, borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
    marginBottom: Spacing.xs,
  },
  quickLinkLabel: {
    fontSize: Typography.xs, color: Colors.textSecondary,
    fontWeight: '500', textAlign: 'center',
  },

  attendanceCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.base,
    padding: Spacing.base,
  },
  attRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    height: 100, marginBottom: Spacing.sm,
  },
  attCol: { alignItems: 'center', flex: 1 },
  attPercent: { fontSize: Typography.sm, fontWeight: '700', marginBottom: Spacing.xs },
  attBarBg: {
    flex: 1, width: 28, backgroundColor: Colors.background,
    borderRadius: Radius.sm, overflow: 'hidden', justifyContent: 'flex-end',
  },
  attBarFill: { width: '100%', borderRadius: Radius.sm },
  attLabel: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: Spacing.xs },
  attFooter: {
    fontSize: Typography.xs, color: Colors.textTertiary,
    textAlign: 'center', marginTop: Spacing.xs,
  },

  noticesWrap: { paddingHorizontal: Spacing.base },
  noticeCard: { marginBottom: Spacing.sm },
  noticeRow: { flexDirection: 'row', alignItems: 'center' },
  noticeTitle: {
    fontSize: Typography.base, fontWeight: '600',
    color: Colors.textPrimary, marginTop: Spacing.xs,
  },
  noticeDate: {
    fontSize: Typography.xs, color: Colors.textTertiary,
    fontWeight: '500',
  },

  eventCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginRight: Spacing.md,
    minWidth: 140,
    borderTopWidth: 3,
    ...Shadow.sm,
  },
  eventDate: { fontSize: Typography.sm, fontWeight: '700', marginBottom: 4 },
  eventTitle: {
    fontSize: Typography.base, fontWeight: '600',
    color: Colors.textPrimary,
  },
});
