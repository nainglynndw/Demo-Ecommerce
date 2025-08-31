import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useProduct, useDeleteProduct } from '@hooks/useProducts';
import { useThemeStore } from '@stores/themeStore';
import { useUserStore } from '@stores/userStore';
import { createStyles } from './styles';
import { formatPrice, formatRating, formatDate } from '@utils/formatting';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  BounceInDown,
  ReduceMotion,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type ProductDetailNavigationProp = StackNavigationProp<any, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<
  { ProductDetail: { productId: string } },
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
  const { productId } = route.params;
  const { theme } = useThemeStore();
  const { userProfile } = useUserStore();
  const { data: product, isLoading, error } = useProduct(productId);
  const deleteProductMutation = useDeleteProduct();

  const styles = createStyles(theme);

  const handleEdit = () => {
    navigation.navigate('EditProduct', { productId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ],
    );
  };

  const confirmDelete = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      Alert.alert('Success', 'Product deleted successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (deleteError) {
      Alert.alert('Error', 'Failed to delete product. Please try again.');
    }
  };

  const handleOrder = () => {
    navigation.navigate('CreateOrder', { productId });
  };

  const isProductOwner = () => {
    return userProfile?.email === product?.createdBy;
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
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={styles.imageContainer}
          entering={FadeInUp.duration(800)
            .delay(200)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({
              opacity: 0,
              transform: [{ translateY: -100 }],
            })}
        >
          <Animated.Image
            source={{ uri: product.images[0] }}
            style={styles.mainImage}
            resizeMode="cover"
            entering={ZoomIn.duration(1000)
              .delay(400)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ scale: 0.8 }] })}
          />
          <AnimatedTouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            entering={SlideInLeft.duration(600)
              .delay(600)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ translateX: -100 }] })}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </AnimatedTouchableOpacity>
          {product.images.length > 1 && (
            <Animated.View
              entering={SlideInRight.duration(700)
                .delay(800)
                .randomDelay()
                .reduceMotion(ReduceMotion.Never)
                .withInitialValues({ transform: [{ translateX: 200 }] })}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailContainer}
                contentContainerStyle={styles.thumbnailContent}
              >
                {product.images.map((image, index) => (
                  <Animated.Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                    entering={FadeInUp.duration(500)
                      .delay(1000 + index * 100)
                      .randomDelay()
                      .reduceMotion(ReduceMotion.Never)}
                  />
                ))}
              </ScrollView>
            </Animated.View>
          )}
        </Animated.View>

        <Animated.View
          style={styles.content}
          entering={FadeInUp.duration(800)
            .delay(1000)
            .randomDelay()
            .reduceMotion(ReduceMotion.Never)
            .withInitialValues({ opacity: 0, transform: [{ translateY: 50 }] })}
        >
          <Animated.View
            style={styles.contentHeader}
            entering={SlideInLeft.duration(700)
              .delay(1200)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ translateX: -150 }] })}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            <Animated.View
              entering={ZoomIn.duration(600)
                .delay(1400)
                .randomDelay()
                .reduceMotion(ReduceMotion.Never)
                .withInitialValues({ transform: [{ scale: 0.5 }] })}
            >
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={styles.ratingContainer}
            entering={SlideInRight.duration(700)
              .delay(1600)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ translateX: 150 }] })}
          >
            <Text style={styles.rating}>
              {formatRating(product.rating, product.reviews)}
            </Text>
            <Text style={styles.stock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </Animated.View>

          <Animated.View
            style={styles.section}
            entering={FadeInDown.duration(700)
              .delay(1800)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({
                opacity: 0,
                transform: [{ translateY: 30 }],
              })}
          >
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </Animated.View>

          <Animated.View
            style={styles.section}
            entering={FadeInDown.duration(700)
              .delay(2000)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({
                opacity: 0,
                transform: [{ translateY: 30 }],
              })}
          >
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Animated.View
              style={styles.detailRow}
              entering={SlideInLeft.duration(500)
                .delay(2200)
                .randomDelay()
                .reduceMotion(ReduceMotion.Never)
                .withInitialValues({ transform: [{ translateX: -80 }] })}
            >
              <Text style={styles.detailLabel}>Created by:</Text>
              <Text style={styles.detailValue}>{product.createdBy}</Text>
            </Animated.View>
            <Animated.View
              style={styles.detailRow}
              entering={SlideInRight.duration(500)
                .delay(2300)
                .randomDelay()
                .reduceMotion(ReduceMotion.Never)
                .withInitialValues({ transform: [{ translateX: 80 }] })}
            >
              <Text style={styles.detailLabel}>Created on:</Text>
              <Text style={styles.detailValue}>
                {formatDate(product.createdAt)}
              </Text>
            </Animated.View>
            <Animated.View
              style={styles.detailRow}
              entering={SlideInLeft.duration(500)
                .delay(2400)
                .randomDelay()
                .reduceMotion(ReduceMotion.Never)
                .withInitialValues({ transform: [{ translateX: -80 }] })}
            >
              <Text style={styles.detailLabel}>Last updated:</Text>
              <Text style={styles.detailValue}>
                {formatDate(product.updatedAt)}
              </Text>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={styles.actionButtons}
            entering={BounceInDown.duration(800)
              .delay(2600)
              .randomDelay()
              .reduceMotion(ReduceMotion.Never)
              .withInitialValues({ transform: [{ translateY: 100 }] })}
          >
            {isProductOwner() ? (
              // Product Owner Actions
              <Animated.View
                style={styles.productActions}
                entering={FadeInUp.duration(600)
                  .delay(2800)
                  .randomDelay()
                  .reduceMotion(ReduceMotion.Never)
                  .withInitialValues({
                    opacity: 0,
                    transform: [{ translateY: 40 }],
                  })}
              >
                <AnimatedTouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}
                  entering={SlideInLeft.duration(500)
                    .delay(3000)
                    .randomDelay()
                    .reduceMotion(ReduceMotion.Never)
                    .withInitialValues({ transform: [{ translateX: -120 }] })}
                >
                  <Text style={styles.editButtonText}>Edit Product</Text>
                </AnimatedTouchableOpacity>
                <AnimatedTouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                  disabled={deleteProductMutation.isPending}
                  entering={SlideInRight.duration(500)
                    .delay(3100)
                    .randomDelay()
                    .reduceMotion(ReduceMotion.Never)
                    .withInitialValues({ transform: [{ translateX: 120 }] })}
                >
                  <Text style={styles.deleteButtonText}>
                    {deleteProductMutation.isPending
                      ? 'Deleting...'
                      : 'Delete Product'}
                  </Text>
                </AnimatedTouchableOpacity>
              </Animated.View>
            ) : (
              // Non-Owner Actions
              <AnimatedTouchableOpacity
                style={[
                  styles.orderButton,
                  product.stock === 0 && styles.orderButtonDisabled,
                ]}
                onPress={handleOrder}
                disabled={product.stock === 0}
                entering={ZoomIn.duration(700)
                  .delay(2800)
                  .randomDelay()
                  .reduceMotion(ReduceMotion.Never)
                  .withInitialValues({ transform: [{ scale: 0.6 }] })}
              >
                <Text style={styles.orderButtonText}>
                  {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
                </Text>
              </AnimatedTouchableOpacity>
            )}
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
