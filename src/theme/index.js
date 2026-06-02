// ─── School ERP Theme ────────────────────────────────────────────────────────
export const Colors = {
  // Primary brand
  primary:       '#1A56DB',
  primaryLight:  '#EBF0FF',
  primaryDark:   '#1039A8',

  // Accent
  accent:        '#0EA5E9',
  accentLight:   '#E0F2FE',

  // Semantic
  success:       '#10B981',
  successLight:  '#D1FAE5',
  warning:       '#F59E0B',
  warningLight:  '#FEF3C7',
  danger:        '#EF4444',
  dangerLight:   '#FEE2E2',
  purple:        '#8B5CF6',
  purpleLight:   '#EDE9FE',

  // Neutrals
  white:         '#FFFFFF',
  background:    '#F4F6FB',
  surface:       '#FFFFFF',
  border:        '#E8ECF4',
  divider:       '#F0F2F8',

  // Text
  textPrimary:   '#0F172A',
  textSecondary: '#64748B',
  textTertiary:  '#94A3B8',
  textInverse:   '#FFFFFF',

  // Status bar / Tab bar
  tabBar:        '#FFFFFF',
  statusBar:     '#1A56DB',
};

export const Typography = {
  // Font families (standard iOS system fonts)
  fontBold:      'System',
  fontSemiBold:  'System',
  fontMedium:    'System',
  fontRegular:   'System',

  // Sizes
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  '2xl': 28,
  '3xl': 34,
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  base: 16,
  lg:  20,
  xl:  24,
  '2xl': 32,
  '3xl': 40,
};

export const Radius = {
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#1A56DB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#1A56DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
};
