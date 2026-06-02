import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';
import { Avatar, Badge, Card } from '../components';

const TABS = ['Overview', 'Attendance', 'Fees', 'Results'];

export default function StudentDetailScreen({ route, navigation }) {
  const student = route?.params?.student || {
    id: '1', name: 'Aarav Sharma', class: 'Class 10 A', roll: '01',
    status: 'Present', fee: 'Paid',
  };
  const [tab, setTab] = useState('Overview');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Hero header */}
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Avatar name={student.name} size={72} color={Colors.white} />
        <Text style={styles.heroName}>{student.name}</Text>
        <Text style={styles.heroMeta}>{student.class} · Roll No. {student.roll}</Text>
        <View style={styles.heroBadges}>
          <Badge label={student.status} color={Colors.white} bg="rgba(255,255,255,0.2)" />
          <View style={{ width: Spacing.sm }} />
          <Badge label={`Fee: ${student.fee}`} color={Colors.white} bg="rgba(255,255,255,0.2)" />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t} onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'Overview' && <OverviewTab />}
        {tab === 'Attendance' && <AttendanceTab />}
        {tab === 'Fees' && <FeesTab />}
        {tab === 'Results' && <ResultsTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

function OverviewTab() {
  return (
    <>
      <Card style={{ marginBottom: Spacing.md }}>
        <Text style={styles.cardTitle}>Personal Info</Text>
        {[
          ['Date of Birth', '12 March 2009'],
          ['Gender',        'Male'],
          ['Blood Group',   'B+'],
          ['Aadhaar No.',   'XXXX-XXXX-1234'],
        ].map(([k, v]) => (
          <View key={k} style={styles.infoRow}>
            <Text style={styles.infoKey}>{k}</Text>
            <Text style={styles.infoVal}>{v}</Text>
          </View>
        ))}
      </Card>
      <Card style={{ marginBottom: Spacing.md }}>
        <Text style={styles.cardTitle}>Parent / Guardian</Text>
        {[
          ['Father', 'Rajesh Sharma'],
          ['Mother', 'Sunita Sharma'],
          ['Phone',  '+91 98765 43210'],
          ['Email',  'rajesh.sharma@gmail.com'],
        ].map(([k, v]) => (
          <View key={k} style={styles.infoRow}>
            <Text style={styles.infoKey}>{k}</Text>
            <Text style={styles.infoVal}>{v}</Text>
          </View>
        ))}
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Address</Text>
        <Text style={styles.address}>42, Suncity Apartments, Satellite Road, Ahmedabad - 380015</Text>
      </Card>
    </>
  );
}

function AttendanceTab() {
  const data = [
    { month: 'Jan', present: 22, total: 25 },
    { month: 'Feb', present: 20, total: 22 },
    { month: 'Mar', present: 24, total: 26 },
    { month: 'Apr', present: 18, total: 24 },
    { month: 'May', present: 21, total: 23 },
    { month: 'Jun', present: 5,  total: 6 },
  ];
  const totalP = data.reduce((a, d) => a + d.present, 0);
  const totalT = data.reduce((a, d) => a + d.total, 0);
  return (
    <>
      <View style={styles.attSummaryRow}>
        {[
          { label: 'Present', value: totalP, color: Colors.success },
          { label: 'Absent',  value: totalT - totalP, color: Colors.danger },
          { label: 'Overall', value: `${Math.round((totalP/totalT)*100)}%`, color: Colors.primary },
        ].map(s => (
          <Card key={s.label} style={styles.attSummaryCard}>
            <Text style={[styles.attSummaryVal, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.attSummaryLabel}>{s.label}</Text>
          </Card>
        ))}
      </View>
      <Card>
        <Text style={styles.cardTitle}>Monthly Breakdown</Text>
        {data.map(d => (
          <View key={d.month} style={styles.monthRow}>
            <Text style={styles.monthLabel}>{d.month}</Text>
            <View style={styles.monthBarBg}>
              <View style={[styles.monthBarFill, { width: `${(d.present / d.total) * 100}%` }]} />
            </View>
            <Text style={styles.monthVal}>{d.present}/{d.total}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

function FeesTab() {
  const fees = [
    { term: 'Term 1 (Apr)', amount: 12000, paid: true,  date: '5 Apr 2025' },
    { term: 'Term 2 (Aug)', amount: 12000, paid: true,  date: '3 Aug 2025' },
    { term: 'Term 3 (Dec)', amount: 12000, paid: false, date: null },
  ];
  return (
    <>
      <Card style={{ marginBottom: Spacing.md }}>
        <View style={styles.feeTotal}>
          <Text style={styles.feeTotalLabel}>Total Annual Fee</Text>
          <Text style={styles.feeTotalAmt}>₹ 36,000</Text>
        </View>
        <View style={styles.feeProgress}>
          <View style={[styles.feeProgressFill, { width: '66%' }]} />
        </View>
        <View style={styles.feeRow}>
          <Text style={[styles.feeSub, { color: Colors.success }]}>Paid ₹24,000</Text>
          <Text style={[styles.feeSub, { color: Colors.danger }]}>Due ₹12,000</Text>
        </View>
      </Card>
      {fees.map((f, i) => (
        <Card key={i} style={[styles.feeCard, !f.paid && styles.feeCardDue]}>
          <View style={styles.feeCardRow}>
            <View>
              <Text style={styles.feeTerm}>{f.term}</Text>
              {f.date && <Text style={styles.feeDate}>Paid on {f.date}</Text>}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.feeAmt}>₹{f.amount.toLocaleString()}</Text>
              <Badge
                label={f.paid ? 'Paid' : 'Due'}
                color={f.paid ? Colors.success : Colors.danger}
                bg={f.paid ? Colors.successLight : Colors.dangerLight}
              />
            </View>
          </View>
        </Card>
      ))}
    </>
  );
}

function ResultsTab() {
  const subjects = [
    { name: 'Mathematics',   marks: 92, total: 100 },
    { name: 'Science',       marks: 87, total: 100 },
    { name: 'English',       marks: 78, total: 100 },
    { name: 'Social Science',marks: 84, total: 100 },
    { name: 'Hindi',         marks: 90, total: 100 },
    { name: 'Computer',      marks: 95, total: 100 },
  ];
  const total = subjects.reduce((a, s) => a + s.marks, 0);
  const max   = subjects.reduce((a, s) => a + s.total, 0);
  const pct   = Math.round((total / max) * 100);

  return (
    <>
      <Card style={styles.resultSummary}>
        <Text style={styles.resultPct}>{pct}%</Text>
        <Text style={styles.resultGrade}>Grade: A+</Text>
        <Text style={styles.resultTotal}>Total: {total}/{max}</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Subject-wise Marks</Text>
        {subjects.map(s => (
          <View key={s.name} style={styles.subjectRow}>
            <Text style={styles.subjectName}>{s.name}</Text>
            <View style={styles.subjectBarBg}>
              <View style={[styles.subjectBarFill, {
                width: `${(s.marks / s.total) * 100}%`,
                backgroundColor: s.marks >= 90 ? Colors.success : s.marks >= 75 ? Colors.primary : Colors.warning,
              }]} />
            </View>
            <Text style={styles.subjectMarks}>{s.marks}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  hero: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
  back: { alignSelf: 'flex-start', paddingHorizontal: Spacing.base, paddingBottom: Spacing.md },
  backText: { color: Colors.white, fontWeight: '600', fontSize: Typography.base },
  heroName: {
    fontSize: Typography.xl, fontWeight: '800',
    color: Colors.white, marginTop: Spacing.sm, letterSpacing: -0.5,
  },
  heroMeta: { color: 'rgba(255,255,255,0.75)', fontSize: Typography.sm, marginTop: 4 },
  heroBadges: { flexDirection: 'row', marginTop: Spacing.sm },

  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  tab: { flex: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },

  scroll: { flex: 1 },
  cardTitle: {
    fontSize: Typography.base, fontWeight: '700',
    color: Colors.textPrimary, marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  infoKey: { fontSize: Typography.sm, color: Colors.textSecondary },
  infoVal: { fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: '600' },
  address: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },

  attSummaryRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  attSummaryCard: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  attSummaryVal: { fontSize: Typography.xl, fontWeight: '800' },
  attSummaryLabel: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  monthRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  monthLabel: { width: 36, fontSize: Typography.sm, color: Colors.textSecondary },
  monthBarBg: { flex: 1, height: 8, backgroundColor: Colors.background, borderRadius: 4 },
  monthBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  monthVal: { width: 40, fontSize: Typography.xs, color: Colors.textSecondary, textAlign: 'right' },

  feeTotal: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  feeTotalLabel: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '600' },
  feeTotalAmt: { fontSize: Typography.md, fontWeight: '800', color: Colors.textPrimary },
  feeProgress: { height: 8, backgroundColor: Colors.background, borderRadius: 4, overflow: 'hidden', marginBottom: Spacing.sm },
  feeProgressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  feeSub: { fontSize: Typography.sm, fontWeight: '600' },
  feeCard: { marginBottom: Spacing.sm },
  feeCardDue: { borderLeftWidth: 3, borderLeftColor: Colors.danger },
  feeCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  feeTerm: { fontSize: Typography.base, fontWeight: '600', color: Colors.textPrimary },
  feeDate: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  feeAmt: { fontSize: Typography.base, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },

  resultSummary: {
    alignItems: 'center', paddingVertical: Spacing.xl, marginBottom: Spacing.md,
    backgroundColor: Colors.primaryLight,
  },
  resultPct: { fontSize: 48, fontWeight: '900', color: Colors.primary, letterSpacing: -2 },
  resultGrade: { fontSize: Typography.md, fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  resultTotal: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  subjectRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  subjectName: { width: 120, fontSize: Typography.xs, color: Colors.textSecondary },
  subjectBarBg: { flex: 1, height: 8, backgroundColor: Colors.background, borderRadius: 4, overflow: 'hidden' },
  subjectBarFill: { height: '100%', borderRadius: 4 },
  subjectMarks: { width: 32, textAlign: 'right', fontSize: Typography.sm, fontWeight: '700', color: Colors.textPrimary },
});
