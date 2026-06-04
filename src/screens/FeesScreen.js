import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Card, Badge, Avatar, SectionHeader } from '../components';

const FEE_DATA = [
  { id: '1', name: 'Aarav Sharma', class: 'Class 10 A', amount: 12000, paid: 12000, due: 0 },
  { id: '2', name: 'Priya Patel', class: 'Class 8 B', amount: 10000, paid: 0, due: 10000 },
  { id: '3', name: 'Rohan Gupta', class: 'Class 12 C', amount: 14000, paid: 14000, due: 0 },
  { id: '4', name: 'Sneha Verma', class: 'Class 5 A', amount: 9000, paid: 4500, due: 4500 },
  { id: '5', name: 'Arjun Singh', class: 'Class 1 B', amount: 8000, paid: 8000, due: 0 },
  { id: '6', name: 'Kavya Nair', class: 'Class 10 A', amount: 12000, paid: 0, due: 12000 },
  { id: '7', name: 'Devraj Mehta', class: 'Class 8 B', amount: 10000, paid: 10000, due: 0 },
  { id: '8', name: 'Tanvi Joshi', class: 'Class 12 C', amount: 14000, paid: 7000, due: 7000 },
];

const FILTERS = ['All', 'Paid', 'Due', 'Partial'];

const AVATAR_COLORS = [Colors.primary, Colors.success, Colors.purple, Colors.warning, Colors.accent];

export default function FeesScreen() {
  const [filter, setFilter] = useState('All');

  const totalCollected = FEE_DATA.reduce((a, f) => a + f.paid, 0);
  const totalDue = FEE_DATA.reduce((a, f) => a + f.due, 0);
  const total = FEE_DATA.reduce((a, f) => a + f.amount, 0);

  const filtered = FEE_DATA.filter(f => {
    if (filter === 'Paid') return f.due === 0;
    if (filter === 'Due') return f.paid === 0 && f.due > 0;
    if (filter === 'Partial') return f.paid > 0 && f.due > 0;
    return true;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Fee Management</Text>
      </View>

      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryHeading}>Academic Year 2025–26</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryAmt}>₹{(totalCollected / 1000).toFixed(0)}K</Text>
            <Text style={[styles.summaryLbl, { color: Colors.success }]}>Collected</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryCol}>
            <Text style={[styles.summaryAmt, { color: Colors.danger }]}>₹{(totalDue / 1000).toFixed(0)}K</Text>
            <Text style={[styles.summaryLbl, { color: Colors.danger }]}>Outstanding</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryCol}>
            <Text style={styles.summaryAmt}>₹{(total / 1000).toFixed(0)}K</Text>
            <Text style={styles.summaryLbl}>Total</Text>
          </View>
        </View>
        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(totalCollected / total) * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round((totalCollected / total) * 100)}% collected
        </Text>
      </Card>

      {/* Filters */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={{ flexGrow: 0, marginBottom: Spacing.sm }}
      >
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: Spacing.base, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isFullPaid = item.due === 0;
          const isPartial = item.paid > 0 && item.due > 0;
          const noPay = item.paid === 0;
          const status = isFullPaid ? 'Paid' : isPartial ? 'Partial' : 'Due';
          const statusColor = isFullPaid ? Colors.success : isPartial ? Colors.warning : Colors.danger;
          const pct = Math.round((item.paid / item.amount) * 100);

          return (
            <Card style={styles.feeCard}>
              <View style={styles.feeCardTop}>
                <Avatar name={item.name} size={44} color={AVATAR_COLORS[index % AVATAR_COLORS.length]} />
                <View style={styles.feeCardBody}>
                  <Text style={styles.feeName}>{item.name}</Text>
                  <Text style={styles.feeClass}>{item.class}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Badge label={status} color={statusColor} bg={statusColor + '18'} />
                  <Text style={[styles.feeAmt, { color: statusColor }]}>
                    {item.due > 0 ? `₹${item.due.toLocaleString()} due` : '✓ Clear'}
                  </Text>
                </View>
              </View>
              {/* Mini progress */}
              <View style={styles.feeMiniBarBg}>
                <View style={[styles.feeMiniBarFill, {
                  width: `${pct}%`,
                  backgroundColor: statusColor,
                }]} />
              </View>
              <View style={styles.feeMiniRow}>
                <Text style={styles.feeMiniText}>Paid ₹{item.paid.toLocaleString()}</Text>
                <Text style={styles.feeMiniText}>Total ₹{item.amount.toLocaleString()}</Text>
              </View>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography['2xl'], fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },

  summaryCard: {
    marginHorizontal: Spacing.base, marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  summaryHeading: {
    fontSize: Typography.sm, color: Colors.textSecondary,
    fontWeight: '600', marginBottom: Spacing.md,
  },
  summaryRow: { flexDirection: 'row', marginBottom: Spacing.md },
  summaryCol: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, backgroundColor: Colors.divider, marginVertical: 4 },
  summaryAmt: {
    fontSize: Typography.xl, fontWeight: '800',
    color: Colors.textPrimary, letterSpacing: -0.5,
  },
  summaryLbl: {
    fontSize: Typography.xs, color: Colors.textSecondary,
    fontWeight: '500', marginTop: 2,
  },
  progressBg: {
    height: 8, backgroundColor: Colors.background,
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  progressLabel: {
    fontSize: Typography.xs, color: Colors.textSecondary,
    marginTop: Spacing.xs, textAlign: 'right',
  },

  filterRow: { paddingHorizontal: Spacing.base, paddingBottom: 4 },
  filterChip: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs + 5,
    borderRadius: Radius.full, backgroundColor: Colors.surface,
    marginRight: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: Colors.white, fontWeight: '600' },

  feeCard: { marginBottom: 0 },
  feeCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  feeCardBody: { flex: 1, marginLeft: Spacing.md },
  feeName: { fontSize: Typography.base, fontWeight: '700', color: Colors.textPrimary },
  feeClass: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  feeAmt: { fontSize: Typography.xs, fontWeight: '700', marginTop: 4 },
  feeMiniBarBg: {
    height: 6, backgroundColor: Colors.background,
    borderRadius: 3, overflow: 'hidden', marginBottom: Spacing.xs,
  },
  feeMiniBarFill: { height: '100%', borderRadius: 3 },
  feeMiniRow: { flexDirection: 'row', justifyContent: 'space-between' },
  feeMiniText: { fontSize: Typography.xs, color: Colors.textTertiary },
});
