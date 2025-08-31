import React from 'react';
import { View, Text } from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';
import { Theme } from '@app-types/theme';
import { OrderFormData } from '@app-types/order';
import { FormInput } from '../FormInput';
import { createStyles } from './styles';
import { formatCardNumber, formatExpiry } from '../../utils/formatting';

interface CardInfoFormProps {
  control: Control<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  theme: Theme;
  selectedPaymentMethod: string;
}

export const CardInfoForm: React.FC<CardInfoFormProps> = ({
  control,
  errors,
  theme,
  selectedPaymentMethod,
}) => {
  const styles = createStyles(theme);

  if (
    selectedPaymentMethod !== 'credit_card' &&
    selectedPaymentMethod !== 'debit_card'
  ) {
    return null;
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Card Information</Text>

      <FormInput
        name="cardNumber"
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        control={control}
        errors={errors}
        theme={theme}
        rules={{
          required: 'Card number is required',
          pattern: {
            value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
            message: 'Please enter a valid card number',
          },
        }}
        keyboardType="numeric"
        maxLength={19}
        required
        onChangeText={(text, onChange) => {
          const formatted = formatCardNumber(text);
          if (formatted.length <= 19) {
            onChange(formatted);
          }
        }}
      />

      <FormInput
        name="cardHolderName"
        label="Cardholder Name"
        placeholder="John Doe"
        control={control}
        errors={errors}
        theme={theme}
        rules={{
          required: 'Cardholder name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        }}
        autoCapitalize="words"
        required
      />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <FormInput
            name="cardExpiry"
            label="Expiry Date"
            placeholder="MM/YY"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Please enter MM/YY format',
              },
            }}
            keyboardType="numeric"
            maxLength={5}
            required
            onChangeText={(text, onChange) => {
              const formatted = formatExpiry(text);
              if (formatted.length <= 5) {
                onChange(formatted);
              }
            }}
          />
        </View>

        <View style={styles.halfInput}>
          <FormInput
            name="cardCvv"
            label="CVV"
            placeholder="123"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              required: 'CVV is required',
              pattern: {
                value: /^\d{3,4}$/,
                message: 'Please enter 3-4 digits',
              },
            }}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            required
            onChangeText={(text, onChange) => {
              const digitsOnly = text.replace(/\D/g, '');
              if (digitsOnly.length <= 4) {
                onChange(digitsOnly);
              }
            }}
          />
        </View>
      </View>
    </>
  );
};
