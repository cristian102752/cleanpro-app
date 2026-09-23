import { useMemo } from 'react';
import { usePreferences } from './usePreferences';
import { getColors, ThemeColors } from '../theme';

// FIX Semana 07 - Hook que devuelve la paleta según preferencia de tema persistida
export function useThemeColors(): ThemeColors {
  const { preferences } = usePreferences();
  return useMemo(() => getColors(preferences.theme), [preferences.theme]);
}
