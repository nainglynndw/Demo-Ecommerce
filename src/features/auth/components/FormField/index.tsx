import React, { memo } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import { useThemeStore } from '@stores/themeStore';
import { styles } from './styles';

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  rules: any;
  error?: FieldError;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const FormField: React.FC<FormFieldProps> = memo(
  ({
    control,
    name,
    label,
    placeholder,
    rules,
    error,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
  }) => {
    const { theme } = useThemeStore();

    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                },
                error && { borderColor: theme.colors.error },
              ]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
            />
          )}
        />
        {error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error.message}
          </Text>
        )}
      </View>
    );
  },
);
