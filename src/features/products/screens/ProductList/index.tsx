import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProducts } from '@hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { ProductListHeader } from '../../components/ProductListHeader';
import { useThemeStore } from '@stores/themeStore';
import { ProductListParams } from '@app-types/product';
import { createStyles } from './styles';

type ProductListNavigationProp = StackNavigationProp<any, 'ProductList'>;

interface ProductListScreenProps {
  navigation: ProductListNavigationProp;
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
}) => {
  const { theme } = useThemeStore();
  const [params, setParams] = useState<Omit<ProductListParams, 'page'>>({
    limit: 10,
    search: '',
    category: undefined,
  });

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(params);

  const styles = createStyles(theme);

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  const handleSearch = useCallback((searchText: string) => {
    setParams(prev => ({
      ...prev,
      search: searchText,
    }));
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    setParams(prev => ({
      ...prev,
      category: category || undefined,
    }));
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation],
  );

  const handleCreateProduct = useCallback(() => {
    navigation.navigate('CreateProduct');
  }, [navigation]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found</Text>
      <Text style={styles.emptySubtext}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Failed to load products</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return (
      <SafeAreaView style={styles.errorHandlerContainer}>
        <ProductListHeader
          styles={styles}
          theme={theme}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onCreateProduct={handleCreateProduct}
        />
        {renderError()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item.id)}
          />
        )}
        ListHeaderComponent={
          <ProductListHeader
            styles={styles}
            theme={theme}
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            onCreateProduct={handleCreateProduct}
          />
        }
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : isFetchingNextPage ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={styles.loadingMoreText}>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};
