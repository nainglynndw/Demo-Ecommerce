import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Theme } from '../../../../../types/theme';
import { OrderFormData } from '../../../../../types/order';
import { createStyles } from './styles';

interface FormInputProps {
  name: keyof OrderFormData;
  label: string;
  placeholder?: string;
  control: Control<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  theme: Theme;
  rules?: any;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  required?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  onChangeText?: (text: string, onChange: (value: any) => void) => void;
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
  maxLength,
  secureTextEntry = false,
  onChangeText,
}) => {
  const styles = createStyles(theme);

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
            onChangeText={
              onChangeText ? text => onChangeText(text, onChange) : onChange
            }
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};
