// THEME - CleanPro Empresa de Limpieza
// FIX Semana 07 - Tema dark/light dinámico según preferencia persistida

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentDim: string;
  accent2: string;
  accent2Dim: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  category: Record<string, string>;
}

export type ThemeName = 'dark' | 'light';

// Tema OSCURO (por defecto)
export const COLORS: ThemeColors = {
  background: '#0d1117',
  surface: '#161b22',
  surfaceAlt: '#1c2128',
  card: '#21262d',
  border: '#30363d',
  borderLight: '#21262d',

  textPrimary: '#e6edf3',
  textSecondary: '#8b949e',
  textMuted: '#6e7681',

  accent: '#22d3ee',
  accentDim: '#22d3ee33',
  accent2: '#34d399',
  accent2Dim: '#34d39933',

  success: '#3fb950',
  warning: '#f0883e',
  error: '#f85149',
  info: '#58a6ff',

  category: {
    residencial: '#22d3ee',
    oficina: '#a78bfa',
    vidrios: '#60a5fa',
    postObra: '#fbbf24',
    industrial: '#fb7185',
    desinfeccion: '#34d399',
  },
};

// Tema CLARO (nuevo - FIX semana 07)
export const LIGHT_COLORS: ThemeColors = {
  background: '#f6f8fa',
  surface: '#ffffff',
  surfaceAlt: '#f0f2f5',
  card: '#eef1f4',
  border: '#d0d7de',
  borderLight: '#e5e8eb',

  textPrimary: '#1f2328',
  textSecondary: '#57606a',
  textMuted: '#6e7781',

  accent: '#0891b2',
  accentDim: '#0891b233',
  accent2: '#059669',
  accent2Dim: '#05966933',

  success: '#1a7f37',
  warning: '#bc4c00',
  error: '#cf222e',
  info: '#0969da',

  category: {
    residencial: '#0891b2',
    oficina: '#7c3aed',
    vidrios: '#2563eb',
    postObra: '#d97706',
    industrial: '#e11d48',
    desinfeccion: '#059669',
  },
};

export function getColors(theme: ThemeName): ThemeColors {
  return theme === 'light' ? LIGHT_COLORS : COLORS;
}

export const TYPOGRAPHY = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  h1: {
    fontSize: 30,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
