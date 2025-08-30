import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCreateProduct } from '../../../hooks/useProducts';
import { useThemeStore } from '../../../stores/themeStore';
import { useUserStore } from '../../../stores/userStore';
import { CreateProductRequest } from '../../../types/product';
import { createStyles } from './styles';
import { useCreateProductForm, useImagePicker } from './hooks';
import { ProductForm, ImagePickerSection, SubmitButton } from './components';

type CreateProductNavigationProp = StackNavigationProp<any, 'CreateProduct'>;

interface CreateProductScreenProps {
  navigation: CreateProductNavigationProp;
}

export const CreateProductScreen: React.FC<CreateProductScreenProps> = ({
  navigation,
}) => {
  const { theme } = useThemeStore();
  const { userProfile } = useUserStore();
  const createProductMutation = useCreateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useCreateProductForm();

  const { selectedImages, removeImage, clearImages, showImagePickerOptions } =
    useImagePicker();

  const styles = createStyles(theme);
  const { logout } = useUserStore();

  const onSubmit = async (data: CreateProductRequest) => {
    try {
      if (selectedImages.length === 0) {
        Alert.alert('Error', 'Please add at least one product image');
        return;
      }

      if (!userProfile?.email) {
        Alert.alert('Error', 'User email not found. Please login again.');
        await logout();
        return;
      }

      const imageUris = selectedImages.map((img: { uri: string }) => img.uri);
      const productData = {
        ...data,
        images: imageUris,
      };

      await createProductMutation.mutateAsync({
        data: productData,
        userEmail: userProfile.email,
      });

      Alert.alert('Success', 'Product created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      reset();
      clearImages();
    } catch (error) {
      Alert.alert('Error', 'Failed to create product. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <ProductForm control={control} errors={errors} />

          <ImagePickerSection
            selectedImages={selectedImages}
            onAddImage={showImagePickerOptions}
            onRemoveImage={removeImage}
          />

          <SubmitButton
            isValid={isValid}
            isPending={createProductMutation.isPending}
            onSubmit={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
