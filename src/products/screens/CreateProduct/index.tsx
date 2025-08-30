import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { useCreateProduct } from '../../../hooks/useProducts';
import { useThemeStore } from '../../../stores/themeStore';
import {
  CreateProductRequest,
  PRODUCT_CATEGORIES,
} from '../../../types/product';
import { createStyles } from './styles';

type CreateProductNavigationProp = StackNavigationProp<any, 'CreateProduct'>;

interface CreateProductScreenProps {
  navigation: CreateProductNavigationProp;
}

export const CreateProductScreen: React.FC<CreateProductScreenProps> = ({
  navigation,
}) => {
  const { theme } = useThemeStore();
  const createProductMutation = useCreateProduct();
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateProductRequest>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'Electronics',
      images: [''],
      stock: 0,
    },
  });

  const styles = createStyles(theme);

  const onSubmit = async (data: CreateProductRequest) => {
    try {
      const validImages = imageUrls.filter(url => url.trim() !== '');
      if (validImages.length === 0) {
        Alert.alert('Error', 'Please add at least one product image URL');
        return;
      }

      const productData = {
        ...data,
        images: validImages,
      };

      await createProductMutation.mutateAsync(productData);

      Alert.alert('Success', 'Product created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      reset();
      setImageUrls(['']);
    } catch (error) {
      Alert.alert('Error', 'Failed to create product. Please try again.');
    }
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      const newUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newUrls);
    }
  };

  const updateImageUrl = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Product</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
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
                    {PRODUCT_CATEGORIES.map(category => (
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

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Product Images *</Text>
              <TouchableOpacity style={styles.addButton} onPress={addImageUrl}>
                <Text style={styles.addButtonText}>+ Add Image</Text>
              </TouchableOpacity>
            </View>
            {imageUrls.map((url, index) => (
              <View key={index} style={styles.imageInputContainer}>
                <TextInput
                  style={[styles.input, styles.imageInput]}
                  placeholder="Enter image URL"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={url}
                  onChangeText={text => updateImageUrl(index, text)}
                />
                {imageUrls.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImageUrl(index)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isValid || createProductMutation.isPending) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || createProductMutation.isPending}
          >
            {createProductMutation.isPending ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.submitButtonText}>Creating...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Create Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
