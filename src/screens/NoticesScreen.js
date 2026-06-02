import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Badge, Chip } from '../components';

const CATEGORIES = ['All', 'Event', 'Exam', 'Finance', 'Academic', 'Holiday'];

const NOTICES = [
  {
    id: '1', title: 'Annual Sports Day 2025',
    category: 'Event', date: 'Jun 10, 2025',
    priority: 'high',
    body: 'The Annual Sports Day will be held on June 10, 2025 at the school ground. All students must report by 7:30 AM in their house colours. Parents are cordially invited.',
  },
  {
    id: '2', title: 'Term 3 Fee Deadline',
    category: 'Finance', date: 'Jun 5, 2025',
    priority: 'high',
    body: 'Please note that Term 3 fees are due by June 15, 2025. A late fine of ₹200 per week will be charged post the deadline. Contact the accounts office for any queries.',
  },
  {
    id: '3', title: 'Final Exam Schedule Released',
    category: 'Exam', date: 'Jun 3, 2025',
    priority: 'medium',
    body: 'The final examination schedule for classes 9–12 has been released. Exams commence July 1, 2025. Admit cards will be issued from June 25. Students must maintain 75% attendance.',
  },
  {
    id: '4', title: 'Summer Vacation Notice',
    category: 'Holiday', date: 'May 30, 2025',
    priority: 'low',
    body: 'School will remain closed for summer vacation from June 20 to July 15, 2025. School reopens on July 16 for all classes.',
  },
  {
    id: '5', title: 'New Library Books Arrived',
    category: 'Academic', date: 'May 28, 2025',
    priority: 'low',
    body: 'The school library has received 200 new books covering Science, Fiction, and Reference subjects. Students can borrow books from June 1 onwards.',
  },
  {
    id: '6', title: 'Parent-Teacher Meeting',
    category: 'Event', date: 'Jun 8, 2025',
    priority: 'medium',
    body: 'PTM for Classes 6–10 will be held on June 8, 2025 from 9 AM to 1 PM. Parents are requested to carry their ward\'s progress report. Prior appointment is required.',
  },
];

const CATEGORY_COLORS = {
  Event:    Colors.primary,
  Exam:     Colors.danger,
  Finance:  Colors.warning,
  Academic: Colors.success,
  Holiday:  Colors.purple,
};

const PRIORITY_CONFIG = {
  high:   { label: '🔴 High',   color: Colors.danger },
  medium: { label: '🟡 Medium', color: Colors.warning },
  low:    { label: '🟢 Low',    color: Colors.success },
};

export default function NoticesScreen() {
  const [activeCategory, setCategory] = useState('All');
  const [expanded, setExpanded]        = useState(null);

  const filtered = NOTICES.filter(n =>
    activeCategory === 'All' || n.category === activeCategory
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Notices</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Post</Text>
        </TouchableOpacity>
      </View>

      {/* Category filter */}
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={i => i}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <Chip
            label={item}
            active={activeCategory === item}
            onPress={() => setCategory(item)}
          />
        )}
        style={{ flexGrow: 0, marginBottom: Spacing.md }}
      />

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: Spacing.base, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const catColor = CATEGORY_COLORS[item.category] || Colors.primary;
          const isOpen   = expanded === item.id;
          const prio     = PRIORITY_CONFIG[item.priority];
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setExpanded(isOpen ? null : item.id)}
              style={[styles.noticeCard, { borderLeftColor: catColor }]}
            >
              <View style={styles.noticeTop}>
                <View style={{ flex: 1 }}>
                  <View style={styles.noticeMeta}>
                    <Badge label={item.category} color={catColor} bg={catColor + '18'} />
                    <Text style={styles.noticeDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                </View>
                <Text style={styles.noticeChevron}>{isOpen ? '▲' : '▼'}</Text>
              </View>

              {isOpen && (
                <>
                  <View style={styles.noticeDivider} />
                  <Text style={styles.noticeBody}>{item.body}</Text>
                  <View style={styles.noticePrioRow}>
                    <Text style={[styles.noticePrio, { color: prio.color }]}>
                      Priority: {prio.label}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 36 }}>📭</Text>
            <Text style={styles.emptyText}>No notices found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography['2xl'], fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.full,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs + 2,
  },
  addBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.sm },

  filterRow: { paddingHorizontal: Spacing.base, paddingBottom: 4 },

  noticeCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.base, borderLeftWidth: 4, ...Shadow.sm,
  },
  noticeTop: { flexDirection: 'row', alignItems: 'flex-start' },
  noticeMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs, gap: Spacing.sm },
  noticeDate: { fontSize: Typography.xs, color: Colors.textTertiary, fontWeight: '500' },
  noticeTitle: {
    fontSize: Typography.base, fontWeight: '700', color: Colors.textPrimary, lineHeight: 22,
  },
  noticeChevron: { color: Colors.textTertiary, fontSize: 12, marginLeft: Spacing.sm, marginTop: 2 },
  noticeDivider: {
    height: 1, backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  noticeBody: {
    fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 22,
  },
  noticePrioRow: { marginTop: Spacing.md },
  noticePrio: { fontSize: Typography.xs, fontWeight: '600' },

  empty: { alignItems: 'center', paddingTop: Spacing['3xl'] },
  emptyText: {
    fontSize: Typography.base, color: Colors.textSecondary,
    marginTop: Spacing.sm, fontWeight: '500',
  },
});
