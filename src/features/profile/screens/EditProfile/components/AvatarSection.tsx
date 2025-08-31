import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  launchImageLibrary,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { Theme } from '../../../../../types/theme';
import { createAvatarStyles } from './AvatarSection.styles';

interface AvatarSectionProps {
  avatar: string | null;
  userName?: string;
  onAvatarChange: (uri: string | null) => void;
  theme: Theme;
}

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatar,
  userName,
  onAvatarChange,
  theme,
}) => {
  const styles = createAvatarStyles(theme);

  const handleImagePicker = () => {
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
        onAvatarChange(response.assets[0].uri || null);
      }
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.avatarSection}>
      <Text style={styles.label}>Profile Photo</Text>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleImagePicker}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          </View>
        )}
        <View style={styles.avatarOverlay}>
          <Text style={styles.avatarOverlayText}>Change</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
