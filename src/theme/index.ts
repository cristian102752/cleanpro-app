// THEME - CleanPro Empresa de Limpieza
// Paleta inspirada en limpieza: azul profesional, verde frescura, blanco pureza

export const COLORS = {
  background: '#0d1117',
  surface: '#161b22',
  surfaceAlt: '#1c2128',
  card: '#21262d',
  border: '#30363d',
  borderLight: '#21262d',

  textPrimary: '#e6edf3',
  textSecondary: '#8b949e',
  textMuted: '#6e7681',

  // Acento principal: cyan limpieza + verde
  accent: '#22d3ee', // cyan brillante
  accentDim: '#22d3ee33',
  accent2: '#34d399', // emerald para éxito / limpio
  accent2Dim: '#34d39933',

  success: '#3fb950',
  warning: '#f0883e',
  error: '#f85149',
  info: '#58a6ff',

  // Colores por categoría de servicio
  category: {
    residencial: '#22d3ee',
    oficina: '#a78bfa',
    vidrios: '#60a5fa',
    postObra: '#fbbf24',
    industrial: '#fb7185',
    desinfeccion: '#34d399',
  },
} as const;

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
    color: '#e6edf3',
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#e6edf3',
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#e6edf3',
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: '#e6edf3',
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    color: '#8b949e',
  },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#8b949e',
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
