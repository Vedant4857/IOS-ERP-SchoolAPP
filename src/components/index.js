import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

// ─── Card ────────────────────────────────────────────────────────────────────
export const Card = ({ children, style, onPress }) => {
  const Comp = onPress ? TouchableOpacity : View;
  return (
    <Comp activeOpacity={0.85} onPress={onPress} style={[styles.card, style]}>
      {children}
    </Comp>
  );
};

// ─── Badge ───────────────────────────────────────────────────────────────────
export const Badge = ({ label, color = Colors.primary, bg }) => (
  <View style={[styles.badge, { backgroundColor: bg || Colors.primaryLight }]}>
    <Text style={[styles.badgeText, { color }]}>{label}</Text>
  </View>
);

// ─── Stat Tile ────────────────────────────────────────────────────────────────
export const StatTile = ({ icon, value, label, color, bg }) => (
  <Card style={[styles.statTile]}>
    <View style={[styles.statIcon, { backgroundColor: bg }]}>
      <Text style={styles.statEmoji}>{icon}</Text>
    </View>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Card>
);

// ─── Section Header ───────────────────────────────────────────────────────────
export const SectionHeader = ({ title, action, onAction }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action && (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.sectionAction}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
export const Avatar = ({ name = '', size = 40, color = Colors.primary }) => {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color + '20' }]}>
      <Text style={[styles.avatarText, { color, fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = ({ icon, title, subtitle }) => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyIcon}>{icon}</Text>
    <Text style={styles.emptyTitle}>{title}</Text>
    {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
  </View>
);

// ─── Chip ─────────────────────────────────────────────────────────────────────
export const Chip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

// ─── List Item ────────────────────────────────────────────────────────────────
export const ListItem = ({ icon, title, subtitle, right, onPress, borderless }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    onPress={onPress}
    style={[styles.listItem, borderless && { borderBottomWidth: 0 }]}
  >
    {icon && (
      <View style={styles.listItemIcon}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
    )}
    <View style={styles.listItemBody}>
      <Text style={styles.listItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.listItemSub}>{subtitle}</Text>}
    </View>
    {right}
    <Text style={styles.listItemChevron}>›</Text>
  </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.base,
    marginHorizontal: Spacing.xs,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statEmoji: { fontSize: 22 },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionAction: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontWeight: '700' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: { fontSize: 48, marginBottom: Spacing.base },
  emptyTitle: {
    fontSize: Typography.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.divider,
    marginRight: Spacing.xs,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.white, fontWeight: '600' },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.surface,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  listItemBody: { flex: 1 },
  listItemTitle: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  listItemSub: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listItemChevron: {
    fontSize: 20,
    color: Colors.textTertiary,
    marginLeft: Spacing.sm,
  },
});
