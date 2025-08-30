import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Theme } from '../../../../../types/theme';
import { OrderFormData } from '../../../../../types/order';
import { createStyles } from './styles';

interface PaymentMethodSelectorProps {
  control: Control<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  theme: Theme;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  control,
  errors,
  theme,
}) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Select Payment Method *</Text>
      <Controller
        control={control}
        name="paymentMethod"
        rules={{ required: 'Payment method is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.paymentMethodContainer}>
            {[
              { key: 'credit_card', label: 'Credit Card', icon: '💳' },
              { key: 'debit_card', label: 'Debit Card', icon: '💳' },
            ].map(method => (
              <TouchableOpacity
                key={method.key}
                style={[
                  styles.paymentMethod,
                  value === method.key && styles.paymentMethodSelected,
                ]}
                onPress={() => onChange(method.key)}
              >
                <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                <Text
                  style={[
                    styles.paymentMethodText,
                    value === method.key && styles.paymentMethodTextSelected,
                  ]}
                >
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {errors.paymentMethod && (
        <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>
      )}
    </View>
  );
};
