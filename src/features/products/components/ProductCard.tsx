import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '@app-types/product';
import { useThemeStore } from '@stores/themeStore';
import { createStyles } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatRating = (rating: number, reviews: number) => {
    return `★ ${rating.toFixed(1)} (${reviews})`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.stock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>
          <Text style={styles.rating}>
            {formatRating(product.rating, product.reviews)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
