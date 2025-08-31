import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { UpdateProductRequest, PRODUCT_CATEGORIES } from '@app-types/product';
import { useThemeStore } from '@stores/themeStore';
import { createStyles } from '../../styles';

interface EditProductFormProps {
  control: Control<UpdateProductRequest>;
  errors: FieldErrors<UpdateProductRequest>;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  control,
  errors,
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Product Name *</Text>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Product name is required',
            minLength: {
              value: 3,
              message: 'Product name must be at least 3 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter product name"
              placeholderTextColor={theme.colors.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <Controller
          control={control}
          name="description"
          rules={{
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                errors.description && styles.inputError,
              ]}
              placeholder="Enter product description"
              placeholderTextColor={theme.colors.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.input, styles.pickerContainer]}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                {PRODUCT_CATEGORIES.map((category: string) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </View>
          )}
        />
        {errors.category && (
          <Text style={styles.errorText}>{errors.category.message}</Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Price ($) *</Text>
          <Controller
            control={control}
            name="price"
            rules={{
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="0.00"
                placeholderTextColor={theme.colors.textSecondary}
                value={value?.toString()}
                onChangeText={text => onChange(parseFloat(text) || 0)}
                onBlur={onBlur}
                keyboardType="decimal-pad"
              />
            )}
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price.message}</Text>
          )}
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>Stock *</Text>
          <Controller
            control={control}
            name="stock"
            rules={{
              required: 'Stock is required',
              min: { value: 0, message: 'Stock cannot be negative' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.stock && styles.inputError]}
                placeholder="0"
                placeholderTextColor={theme.colors.textSecondary}
                value={value?.toString()}
                onChangeText={text => onChange(parseInt(text, 10) || 0)}
                onBlur={onBlur}
                keyboardType="numeric"
              />
            )}
          />
          {errors.stock && (
            <Text style={styles.errorText}>{errors.stock.message}</Text>
          )}
        </View>
      </View>
    </>
  );
};
