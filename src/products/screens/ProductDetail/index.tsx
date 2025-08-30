import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useProduct, useDeleteProduct} from '../../../hooks/useProducts';
import {useThemeStore} from '../../../stores/themeStore';
import {createStyles} from './styles';

type ProductDetailNavigationProp = StackNavigationProp<any, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<
  {ProductDetail: {productId: string}},
  'ProductDetail'
>;

interface ProductDetailScreenProps {
  navigation: ProductDetailNavigationProp;
  route: ProductDetailRouteProp;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {productId} = route.params;
  const {theme} = useThemeStore();
  const {data: product, isLoading, error} = useProduct(productId);
  const deleteProductMutation = useDeleteProduct();

  const styles = createStyles(theme);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatRating = (rating: number, reviews: number) => {
    return `★ ${rating.toFixed(1)} (${reviews} reviews)`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEdit = () => {
    navigation.navigate('EditProduct', {productId});
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      Alert.alert('Success', 'Product deleted successfully', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (deleteError) {
      Alert.alert('Error', 'Failed to delete product. Please try again.');
    }
  };

  const handleOrder = () => {
    navigation.navigate('CreateOrder', {productId});
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
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
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.images[0]}}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          {product.images.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.thumbnailContainer}
              contentContainerStyle={styles.thumbnailContent}>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {formatRating(product.rating, product.reviews)}
            </Text>
            <Text style={styles.stock}>
              {product.stock > 0
                ? `${product.stock} in stock`
                : 'Out of stock'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Created by:</Text>
              <Text style={styles.detailValue}>{product.createdBy}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Created on:</Text>
              <Text style={styles.detailValue}>
                {formatDate(product.createdAt)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last updated:</Text>
              <Text style={styles.detailValue}>
                {formatDate(product.updatedAt)}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.orderButton,
                product.stock === 0 && styles.orderButtonDisabled,
              ]}
              onPress={handleOrder}
              disabled={product.stock === 0}>
              <Text style={styles.orderButtonText}>
                {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
              </Text>
            </TouchableOpacity>

            <View style={styles.productActions}>
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                disabled={deleteProductMutation.isPending}>
                <Text style={styles.deleteButtonText}>
                  {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};