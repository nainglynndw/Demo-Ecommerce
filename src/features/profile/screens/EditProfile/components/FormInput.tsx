import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Theme } from '../../../../../types/theme';
import { EditProfileFormData } from '../types';
import { createFormInputStyles } from './FormInput.styles';

interface FormInputProps {
  name: keyof EditProfileFormData;
  label: string;
  placeholder?: string;
  control: Control<EditProfileFormData>;
  errors: FieldErrors<EditProfileFormData>;
  theme: Theme;
  rules?: any;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  control,
  errors,
  theme,
  rules,
  keyboardType = 'default',
  autoCapitalize = 'none',
  required = false,
}) => {
  const styles = createFormInputStyles(theme);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={value?.toString() || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};
