import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useProduct } from '../../../hooks/useProducts';
import { useCreateOrder } from '../../../hooks/useOrders';
import { useThemeStore } from '../../../stores/themeStore';
import { useUserStore } from '../../../stores/userStore';
import { OrderFormData, CreateOrderRequest } from '../../../types/order';
import { createStyles } from './styles';

type CreateOrderNavigationProp = StackNavigationProp<any, 'CreateOrder'>;
type CreateOrderRouteProp = RouteProp<
  { CreateOrder: { productId: string } },
  'CreateOrder'
>;

interface CreateOrderScreenProps {
  navigation: CreateOrderNavigationProp;
  route: CreateOrderRouteProp;
}

export const CreateOrderScreen: React.FC<CreateOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId } = route.params;
  const { theme } = useThemeStore();
  const { userProfile } = useUserStore();
  const { data: product, isLoading, error } = useProduct(productId);
  const createOrderMutation = useCreateOrder();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      quantity: 1,
      customerName: userProfile?.name || '',
      customerPhone: userProfile?.phone || '',
      street: userProfile?.address?.street || '',
      city: userProfile?.address?.city || '',
      state: userProfile?.address?.state || '',
      zipCode: userProfile?.address?.zipCode || '',
      country: userProfile?.address?.country || 'Myanmar',
    },
  });

  const styles = createStyles(theme);

  const onSubmit = async (data: OrderFormData) => {
    try {
      if (!product) {
        Alert.alert('Error', 'Product not found');
        return;
      }

      // Check for validation errors
      const validationErrors = [];

      if (!data.quantity || data.quantity < 1) {
        validationErrors.push('Please enter a valid quantity');
      }
      if (data.quantity > product.stock) {
        validationErrors.push(`Maximum available quantity is ${product.stock}`);
      }
      if (!data.customerName || data.customerName.trim().length < 2) {
        validationErrors.push(
          'Please enter your full name (minimum 2 characters)',
        );
      }
      if (
        !data.customerPhone ||
        !/^[+]?[\d\s\-\(\)]{10,}$/.test(data.customerPhone)
      ) {
        validationErrors.push('Please enter a valid phone number');
      }
      if (!data.street || data.street.trim().length === 0) {
        validationErrors.push('Please enter your street address');
      }
      if (!data.city || data.city.trim().length === 0) {
        validationErrors.push('Please enter your city');
      }
      if (!data.state || data.state.trim().length === 0) {
        validationErrors.push('Please enter your state');
      }
      if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
        validationErrors.push('Please enter a valid ZIP code');
      }
      if (!data.country || data.country.trim().length === 0) {
        validationErrors.push('Please enter your country');
      }

      if (validationErrors.length > 0) {
        Alert.alert('Please Fix the Following:', validationErrors.join('\n\n'));
        return;
      }

      if (!userProfile?.email) {
        Alert.alert('Error', 'User email not found. Please login again.');
        return;
      }

      const totalAmount = product.price * data.quantity;

      Alert.alert(
        'Order Confirmation',
        `Order Total: $${totalAmount.toFixed(
          2,
        )}\n\nThis is a demo - no payment processed.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm Order',
            onPress: async () => {
              try {
                const orderData: CreateOrderRequest = {
                  productId,
                  quantity: data.quantity,
                  customerName: data.customerName,
                  customerPhone: data.customerPhone,
                  shippingAddress: {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                  },
                };

                await createOrderMutation.mutateAsync({
                  data: orderData,
                  productName: product.name,
                  productPrice: product.price,
                  userEmail: userProfile.email!!,
                });

                Alert.alert('Success', 'Order placed successfully!', [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ]);
              } catch (orderError) {
                Alert.alert(
                  'Error',
                  'Failed to create order. Please try again.',
                );
              }
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Order</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Summary */}
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
              {product.stock > 0
                ? `${product.stock} available`
                : 'Out of stock'}
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity *</Text>
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: 'Quantity is required',
                min: { value: 1, message: 'Minimum quantity is 1' },
                max: {
                  value: product.stock,
                  message: `Maximum available: ${product.stock}`,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.quantity && styles.inputError]}
                  placeholder="1"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value?.toString() || ''}
                  onChangeText={text => {
                    if (text === '') {
                      onChange('');
                      return;
                    }
                    const num = parseInt(text, 10);
                    if (!isNaN(num) && num >= 1 && num <= product.stock) {
                      onChange(num);
                    }
                  }}
                  onBlur={() => {
                    if (value.toString() === '' || value < 1) {
                      onChange(1);
                    }
                    onBlur();
                  }}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.quantity && (
              <Text style={styles.errorText}>{errors.quantity.message}</Text>
            )}
          </View>

          {/* Customer Information */}
          <Text style={styles.sectionTitle}>Customer Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <Controller
              control={control}
              name="customerName"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.customerName && styles.inputError,
                  ]}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.customerName && (
              <Text style={styles.errorText}>
                {errors.customerName.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <Controller
              control={control}
              name="customerPhone"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[\d\s\-\(\)]{10,}$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.customerPhone && styles.inputError,
                  ]}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.customerPhone && (
              <Text style={styles.errorText}>
                {errors.customerPhone.message}
              </Text>
            )}
          </View>

          {/* Shipping Address */}
          <Text style={styles.sectionTitle}>Shipping Address</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Address *</Text>
            <Controller
              control={control}
              name="street"
              rules={{ required: 'Street address is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.street && styles.inputError]}
                  placeholder="Enter street address"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.street && (
              <Text style={styles.errorText}>{errors.street.message}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>City *</Text>
              <Controller
                control={control}
                name="city"
                rules={{ required: 'City is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.city && styles.inputError]}
                    placeholder="City"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.city && (
                <Text style={styles.errorText}>{errors.city.message}</Text>
              )}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>State *</Text>
              <Controller
                control={control}
                name="state"
                rules={{ required: 'State is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.state && styles.inputError]}
                    placeholder="State"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.state && (
                <Text style={styles.errorText}>{errors.state.message}</Text>
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>ZIP Code *</Text>
              <Controller
                control={control}
                name="zipCode"
                rules={{
                  required: 'ZIP code is required',
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: 'Please enter a valid ZIP code',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.zipCode && styles.inputError]}
                    placeholder="12345"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode.message}</Text>
              )}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Country *</Text>
              <Controller
                control={control}
                name="country"
                rules={{ required: 'Country is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.country && styles.inputError]}
                    placeholder="Myanmar"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.country && (
                <Text style={styles.errorText}>{errors.country.message}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
