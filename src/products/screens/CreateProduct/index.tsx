import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { useCreateProduct } from '../../../hooks/useProducts';
import { useThemeStore } from '../../../stores/themeStore';
import { useUserStore } from '../../../stores/userStore';
import {
  CreateProductRequest,
  PRODUCT_CATEGORIES,
} from '../../../types/product';
import { createStyles } from './styles';

type CreateProductNavigationProp = StackNavigationProp<any, 'CreateProduct'>;

interface CreateProductScreenProps {
  navigation: CreateProductNavigationProp;
}

interface SelectedImage {
  uri: string;
  fileName?: string;
  type?: string;
  fileSize?: number;
}

export const CreateProductScreen: React.FC<CreateProductScreenProps> = ({
  navigation,
}) => {
  const { theme } = useThemeStore();
  const { userProfile } = useUserStore();
  const createProductMutation = useCreateProduct();
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

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
      images: [],
      stock: 0,
    },
  });

  const styles = createStyles(theme);

  const onSubmit = async (data: CreateProductRequest) => {
    try {
      if (selectedImages.length === 0) {
        Alert.alert('Error', 'Please add at least one product image');
        return;
      }

      if (!userProfile?.id) {
        Alert.alert('Error', 'User not authenticated');
        navigation.navigate('Login');
        return;
      }

      const imageUris = selectedImages.map(img => img.uri);
      const productData = {
        ...data,
        images: imageUris,
      };

      await createProductMutation.mutateAsync({
        data: productData,
        userId: userProfile.id,
      });

      Alert.alert('Success', 'Product created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      reset();
      setSelectedImages([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create product. Please try again.');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to select an image',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openImageLibrary() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const newImage: SelectedImage = {
          uri: asset.uri!,
          fileName: asset.fileName,
          type: asset.type,
          fileSize: asset.fileSize,
        };
        setSelectedImages(prev => [...prev, newImage]);
      }
    });
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    try {
      const result = await launchCamera(options);
      if (result.didCancel || result.errorMessage) {
        return;
      }
      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const newImage: SelectedImage = {
          uri: asset.uri!,
          fileName: asset.fileName,
          type: asset.type,
          fileSize: asset.fileSize,
        };
        setSelectedImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      console.log('Camera launch error:', error);
      return;
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
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
              <TouchableOpacity
                style={styles.addButton}
                onPress={showImagePickerOptions}
              >
                <Text style={styles.addButtonText}>+ Add Image</Text>
              </TouchableOpacity>
            </View>

            {selectedImages.length > 0 && (
              <View style={styles.imagePreviewContainer}>
                <FlatList
                  contentContainerStyle={{ gap: 12 }}
                  horizontal={true}
                  data={selectedImages}
                  keyExtractor={(item, index) => `image-${index}`}
                  renderItem={({ item, index }) => (
                    <View style={styles.imagePreviewItem}>
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.imagePreview}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Text style={styles.removeButtonText}>×</Text>
                      </TouchableOpacity>
                      <View style={styles.imageInfo}>
                        <Text style={styles.imageFileName} numberOfLines={1}>
                          {item.fileName || `Image ${index + 1}`}
                        </Text>
                        <Text style={styles.imageFileSize}>
                          {formatFileSize(item.fileSize)}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}

            {selectedImages.length === 0 && (
              <View style={styles.emptyImageContainer}>
                <Text style={styles.emptyImageText}>No images selected</Text>
                <Text style={styles.emptyImageSubtext}>
                  Tap "Add Image" to select photos
                </Text>
              </View>
            )}
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
