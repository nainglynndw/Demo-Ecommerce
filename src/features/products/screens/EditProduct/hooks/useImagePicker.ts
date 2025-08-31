import { useState } from 'react';
import { Alert } from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

export interface SelectedImage {
  uri: string;
  fileName?: string;
  type?: string;
  fileSize?: number;
}

export const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const addImage = (image: SelectedImage) => {
    setSelectedImages(prev => [...prev, image]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setSelectedImages([]);
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
        addImage(newImage);
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
        addImage(newImage);
      }
    } catch (_error) {
      // Camera launch failed - fail silently
    }
  };

  return {
    selectedImages,
    setSelectedImages,
    addImage,
    removeImage,
    clearImages,
    showImagePickerOptions,
  };
};