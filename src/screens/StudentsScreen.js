import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TextInput, TouchableOpacity, StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Avatar, Badge, Chip } from '../components';

const CLASSES = ['All', 'Class 1', 'Class 5', 'Class 8', 'Class 10', 'Class 12'];

const STUDENTS = [
  { id: '1', name: 'Aarav Sharma',   class: 'Class 10 A', roll: '01', status: 'Present', fee: 'Paid' },
  { id: '2', name: 'Priya Patel',    class: 'Class 8 B',  roll: '12', status: 'Absent',  fee: 'Due' },
  { id: '3', name: 'Rohan Gupta',    class: 'Class 12 C', roll: '05', status: 'Present', fee: 'Paid' },
  { id: '4', name: 'Sneha Verma',    class: 'Class 5 A',  roll: '23', status: 'Leave',   fee: 'Paid' },
  { id: '5', name: 'Arjun Singh',    class: 'Class 1 B',  roll: '08', status: 'Present', fee: 'Due' },
  { id: '6', name: 'Kavya Nair',     class: 'Class 10 A', roll: '17', status: 'Present', fee: 'Paid' },
  { id: '7', name: 'Devraj Mehta',   class: 'Class 8 B',  roll: '31', status: 'Absent',  fee: 'Paid' },
  { id: '8', name: 'Tanvi Joshi',    class: 'Class 12 C', roll: '19', status: 'Present', fee: 'Due' },
  { id: '9', name: 'Rahul Reddy',    class: 'Class 5 A',  roll: '04', status: 'Present', fee: 'Paid' },
  { id: '10', name: 'Isha Kapoor',   class: 'Class 1 B',  roll: '29', status: 'Leave',   fee: 'Due' },
];

const AVATAR_COLORS = [
  Colors.primary, Colors.success, Colors.purple, Colors.warning, Colors.accent,
];

const statusColor = { Present: Colors.success, Absent: Colors.danger, Leave: Colors.warning };
const feeColor    = { Paid: Colors.success, Due: Colors.danger };

export default function StudentsScreen({ navigation }) {
  const [search, setSearch]     = useState('');
  const [activeClass, setActive] = useState('All');

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.roll.includes(search);
    const matchClass  = activeClass === 'All' || s.class.startsWith(activeClass);
    return matchSearch && matchClass;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddStudent')}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or roll no…"
          placeholderTextColor={Colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ color: Colors.textTertiary, fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Class Filter */}
      <FlatList
        data={CLASSES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <Chip
            label={item}
            active={activeClass === item}
            onPress={() => setActive(item)}
          />
        )}
        style={{ flexGrow: 0, marginBottom: Spacing.base }}
      />

      {/* Summary bar */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>
          {filtered.length} student{filtered.length !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.summaryText}>
          {filtered.filter(s => s.status === 'Present').length} present today
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: Spacing.base }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.studentCard}
            onPress={() => navigation.navigate('StudentDetail', { student: item })}
            activeOpacity={0.82}
          >
            <Avatar
              name={item.name}
              size={48}
              color={AVATAR_COLORS[index % AVATAR_COLORS.length]}
            />
            <View style={styles.studentBody}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentMeta}>{item.class} · Roll {item.roll}</Text>
            </View>
            <View style={styles.studentRight}>
              <Badge
                label={item.status}
                color={statusColor[item.status]}
                bg={statusColor[item.status] + '18'}
              />
              <Badge
                label={item.fee}
                color={feeColor[item.fee]}
                bg={feeColor[item.fee] + '18'}
                style={{ marginTop: 4 }}
              />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text style={styles.emptyText}>No students found</Text>
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography['2xl'], fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
  },
  addBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.sm },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    ...Shadow.sm,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchInput: {
    flex: 1, fontSize: Typography.base,
    color: Colors.textPrimary,
  },

  filterRow: { paddingHorizontal: Spacing.base, paddingBottom: 4 },

  summaryBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  summaryText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },

  studentCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  studentBody: { flex: 1, marginLeft: Spacing.md },
  studentName: {
    fontSize: Typography.base, fontWeight: '700',
    color: Colors.textPrimary,
  },
  studentMeta: {
    fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2,
  },
  studentRight: { alignItems: 'flex-end', gap: 4 },

  empty: { alignItems: 'center', paddingTop: Spacing['3xl'] },
  emptyText: {
    fontSize: Typography.base, color: Colors.textSecondary,
    marginTop: Spacing.sm, fontWeight: '500',
  },
});
