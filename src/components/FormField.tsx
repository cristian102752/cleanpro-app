import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

interface FormFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
  hint?: string;
}

export function FormField({ name, control, label, error, hint, ...textInputProps }: FormFieldProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError, textInputProps.multiline && styles.textArea]}
            value={value ? String(value) : ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            {...textInputProps}
          />
        )}
      />
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
      {error && <Text style={styles.errorText}>⚠️ {error.message}</Text>}
    </View>
  );
}

// Variante para selección de categoría (chips)
interface CategoryFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  options: string[];
  error?: FieldError;
}

export function CategoryField({ name, control, label, options, error }: CategoryFieldProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.chipRow}>
            {options.map((opt) => (
              <Text
                key={opt}
                style={[styles.chip, value === opt && styles.chipActive]}
                onPress={() => onChange(opt)}
              >
                <Text style={[styles.chipText, value === opt && styles.chipTextActive]}>{opt}</Text>
              </Text>
            ))}
          </View>
        )}
      />
      {error && <Text style={styles.errorText}>⚠️ {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6, marginBottom: SPACING.sm },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  inputError: { borderColor: COLORS.error, backgroundColor: '#f8514915' },
  textArea: { height: 100, textAlignVertical: 'top' },
  hint: { fontSize: 11, color: COLORS.textMuted },
  errorText: { fontSize: 12, color: COLORS.error, fontWeight: '500' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  chipText: { fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.accent, fontWeight: '700' },
});
