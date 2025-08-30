import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Product } from '../../../../../types/product';
import { Theme } from '../../../../../types/theme';
import { OrderFormData } from '../../../../../types/order';
import { createStyles } from './styles';

interface QuantityInputProps {
  control: Control<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  product: Product;
  theme: Theme;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  control,
  errors,
  product,
  theme,
}) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Quantity *</Text>
      <Controller
        control={control}
        name="quantity"
        rules={{
          required: 'Quantity is required',
          min: { value: 1, message: 'Minimum quantity is 1' },
          max: {
            value: product.stock,
            message: `Maximum available: ${product.stock}`,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.quantity && styles.inputError]}
            placeholder="1"
            placeholderTextColor={theme.colors.textSecondary}
            value={value?.toString() || ''}
            onChangeText={text => {
              if (text === '') {
                onChange('');
                return;
              }
              const num = parseInt(text, 10);
              if (!isNaN(num) && num >= 1 && num <= product.stock) {
                onChange(num);
              }
            }}
            onBlur={() => {
              if (value.toString() === '' || value < 1) {
                onChange(1);
              }
              onBlur();
            }}
            keyboardType="numeric"
          />
        )}
      />
      {errors.quantity && (
        <Text style={styles.errorText}>{errors.quantity.message}</Text>
      )}
    </View>
  );
};
