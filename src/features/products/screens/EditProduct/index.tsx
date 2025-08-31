import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useProduct, useUpdateProduct } from '@hooks/useProducts';
import { useThemeStore } from '@stores/themeStore';
import { useUserStore } from '@stores/userStore';
import { UpdateProductRequest } from '@app-types/product';
import { MainStackParamList } from '@navigation/MainNavigator';
import { createStyles } from './styles';
import { useEditProductForm, useImagePicker } from './hooks';
import {
  EditProductForm,
  ImagePickerSection,
  UpdateButton,
} from './components';

type EditProductNavigationProp = StackNavigationProp<
  MainStackParamList,
  'EditProduct'
>;
type EditProductRouteProp = RouteProp<MainStackParamList, 'EditProduct'>;

interface EditProductScreenProps {
  navigation: EditProductNavigationProp;
  route: EditProductRouteProp;
}

export const EditProductScreen: React.FC<EditProductScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId } = route.params;
  const { theme } = useThemeStore();
  const { userProfile } = useUserStore();
  const { data: product, isLoading, error } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useEditProductForm();

  const {
    selectedImages,
    setSelectedImages,
    removeImage,
    showImagePickerOptions,
  } = useImagePicker();

  const styles = createStyles(theme);

  // Pre-populate form with existing product data
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('category', product.category);
      setValue('stock', product.stock);
      setSelectedImages(product.images.map(uri => ({ uri })));
    }
  }, [product, setValue, setSelectedImages]);

  // Check if user is the owner of the product
  const isProductOwner = useCallback(() => {
    return userProfile?.email === product?.createdBy;
  }, [userProfile?.email, product?.createdBy]);

  // Redirect if not owner
  useEffect(() => {
    if (product && !isProductOwner()) {
      Alert.alert(
        'Access Denied',
        'You can only edit products that you created.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    }
  }, [product, navigation, isProductOwner]);

  const onSubmit = async (data: UpdateProductRequest) => {
    try {
      if (selectedImages.length === 0) {
        Alert.alert('Error', 'Please add at least one product image');
        return;
      }

      if (!isProductOwner()) {
        Alert.alert('Error', 'You can only edit products that you created.');
        return;
      }

      const imageUris = selectedImages.map((img: { uri: string }) => img.uri);
      const productData = {
        ...data,
        id: productId,
        images: imageUris,
      };

      await updateProductMutation.mutateAsync(productData);

      Alert.alert('Success', 'Product updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (updateError) {
      Alert.alert('Error', 'Failed to update product. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screenLoadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load product</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isProductOwner()) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            You can only edit your own products
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <EditProductForm control={control} errors={errors} />

          <ImagePickerSection
            selectedImages={selectedImages}
            onAddImage={showImagePickerOptions}
            onRemoveImage={removeImage}
          />

          <UpdateButton
            isValid={isValid}
            isPending={updateProductMutation.isPending}
            onSubmit={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
