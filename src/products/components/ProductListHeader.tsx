import React, { memo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Theme } from '../../types/theme';
import { PRODUCT_CATEGORIES } from '../../types/product';

interface ProductListHeaderProps {
  styles: any;
  theme: Theme;
  onSearch: (searchText: string) => void;
  onCategoryFilter: (category: string) => void;
  onCreateProduct: () => void;
}

export const ProductListHeader = memo<ProductListHeaderProps>(
  ({
    styles,
    theme,
    onSearch,
    onCategoryFilter,
    onCreateProduct,
  }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleSearch = useCallback(() => {
      onSearch(searchText.trim());
    }, [searchText, onSearch]);

    const handleClearSearch = useCallback(() => {
      setSearchText('');
      onSearch('');
    }, [onSearch]);

    const handleCategoryFilter = useCallback((category: string) => {
      const newCategory = selectedCategory === category ? '' : category;
      setSelectedCategory(newCategory);
      onCategoryFilter(newCategory);
    }, [selectedCategory, onCategoryFilter]);

    return (
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Products</Text>
          <TouchableOpacity style={styles.createButton} onPress={onCreateProduct}>
            <Text style={styles.createButtonText}>+ Create</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearSearch}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Categories:</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PRODUCT_CATEGORIES}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.categoryChipSelected,
                ]}
                onPress={() => handleCategoryFilter(item)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === item && styles.categoryChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  },
);
