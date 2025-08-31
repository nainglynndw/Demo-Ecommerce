import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SelectedImage } from '../../hooks/useImagePicker';
import { createStyles } from '../../styles';
import { useThemeStore } from '@stores/themeStore';

interface ImagePickerSectionProps {
  selectedImages: SelectedImage[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export const ImagePickerSection: React.FC<ImagePickerSectionProps> = ({
  selectedImages,
  onAddImage,
  onRemoveImage,
}) => {
  const formatFileSize = useCallback((bytes?: number) => {
    if (!bytes) {
      return '';
    }
    const KILOBYTE = 1024;
    const BYTES_PER_MEGABYTE = KILOBYTE * KILOBYTE;
    const mb = bytes / BYTES_PER_MEGABYTE;
    return `${mb.toFixed(1)} MB`;
  }, []);

  const { theme } = useThemeStore();
  const styles = createStyles(theme);

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Product Images *</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddImage}>
          <Text style={styles.addButtonText}>+ Add Image</Text>
        </TouchableOpacity>
      </View>

      {selectedImages.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          <FlatList
            contentContainerStyle={styles.imageList}
            horizontal
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
                  onPress={() => onRemoveImage(index)}
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
            Tap &quot;Add Image&quot; to select photos
          </Text>
        </View>
      )}
    </View>
  );
};
