import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Theme } from '@app-types/theme';
import { EditProfileFormData } from '../types';
import { createThemeSelectorStyles } from './ThemeSelector.styles';

interface ThemeSelectorProps {
  control: Control<EditProfileFormData>;
  theme: Theme;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  control,
  theme,
  onThemeChange,
}) => {
  const styles = createThemeSelectorStyles(theme);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Theme</Text>
      <Controller
        control={control}
        name="theme"
        render={({ field: { onChange, value } }) => (
          <View style={styles.themeContainer}>
            {(['light', 'dark', 'system'] as const).map(themeOption => (
              <TouchableOpacity
                key={themeOption}
                style={[
                  styles.themeOption,
                  value === themeOption && styles.themeOptionSelected,
                ]}
                onPress={() => {
                  onChange(themeOption);
                  onThemeChange(themeOption);
                }}
              >
                <Text
                  style={[
                    styles.themeOptionText,
                    value === themeOption && styles.themeOptionTextSelected,
                  ]}
                >
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};
