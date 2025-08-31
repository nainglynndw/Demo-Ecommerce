import React from 'react';
import { View, Text, Image } from 'react-native';
import { Product } from '../../../../../types/product';
import { Theme } from '../../../../../types/theme';
import { createStyles } from './styles';

interface ProductSummaryProps {
  product: Product;
  theme: Theme;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({
  product,
  theme,
}) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.productSummary}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productStock}>
          {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
        </Text>
      </View>
    </View>
  );
};
