import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, useWatch } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useProduct } from '../../../hooks/useProducts';
import { useCreateOrder } from '../../../hooks/useOrders';
import { useThemeStore } from '../../../stores/themeStore';
import { useUserStore } from '../../../stores/userStore';
import { OrderFormData, CreateOrderRequest } from '../../../types/order';
import { createStyles } from './styles';
import {
  ProductSummary,
  QuantityInput,
  FormInput,
  PaymentMethodSelector,
  CardInfoForm,
} from './components';

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
  const { userProfile, updateUserProfile } = useUserStore();
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
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardHolderName: '',
    },
  });

  const styles = createStyles(theme);

  // Watch payment method to conditionally show card fields
  const selectedPaymentMethod = useWatch({
    control,
    name: 'paymentMethod',
  });

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
      if (!data.paymentMethod) {
        validationErrors.push('Please select a payment method');
      }

      // Card validation for credit/debit cards
      if (
        data.paymentMethod === 'credit_card' ||
        data.paymentMethod === 'debit_card'
      ) {
        if (
          !data.cardNumber ||
          !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(data.cardNumber)
        ) {
          validationErrors.push('Please enter a valid card number (16 digits)');
        }
        if (
          !data.cardExpiry ||
          !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)
        ) {
          validationErrors.push('Please enter a valid expiry date (MM/YY)');
        }
        if (!data.cardCvv || !/^\d{3,4}$/.test(data.cardCvv)) {
          validationErrors.push('Please enter a valid CVV (3-4 digits)');
        }
        if (!data.cardHolderName || data.cardHolderName.trim().length < 2) {
          validationErrors.push('Please enter the cardholder name');
        }
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
      const paymentMethodLabel = {
        credit_card: 'Credit Card',
        debit_card: 'Debit Card',
      }[data.paymentMethod];

      Alert.alert(
        'Order Confirmation',
        `Order Total: $${totalAmount.toFixed(
          2,
        )}\nPayment Method: ${paymentMethodLabel}\n\nThis is a demo - no payment processed.`,
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

                const shouldUpdateProfile =
                  !userProfile.name ||
                  !userProfile.phone ||
                  !userProfile.address?.street ||
                  !userProfile.address?.city ||
                  !userProfile.address?.state ||
                  !userProfile.address?.zipCode ||
                  !userProfile.address?.country;

                if (shouldUpdateProfile) {
                  try {
                    await updateUserProfile({
                      ...userProfile,
                      name: data.customerName || userProfile.name,
                      phone: data.customerPhone || userProfile.phone,
                      address: {
                        street:
                          data.street || userProfile.address?.street || '',
                        city: data.city || userProfile.address?.city || '',
                        state: data.state || userProfile.address?.state || '',
                        zipCode:
                          data.zipCode || userProfile.address?.zipCode || '',
                        country:
                          data.country || userProfile.address?.country || '',
                      },
                    });
                  } catch (updateError) {
                    console.log(
                      'Failed to update profile from order:',
                      updateError,
                    );
                  }
                }

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
        <ProductSummary product={product} theme={theme} />

        <View style={styles.form}>
          <QuantityInput
            control={control}
            errors={errors}
            product={product}
            theme={theme}
          />

          <Text style={styles.sectionTitle}>Customer Information</Text>
          <FormInput
            name="customerName"
            label="Full Name"
            placeholder="Enter your full name"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            }}
            autoCapitalize="words"
            required
          />

          <FormInput
            name="customerPhone"
            label="Phone Number"
            placeholder="Enter your phone number"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[\d\s\-\(\)]{10,}$/,
                message: 'Please enter a valid phone number',
              },
            }}
            keyboardType="phone-pad"
            required
          />

          {/* Shipping Address */}
          <Text style={styles.sectionTitle}>Shipping Address</Text>

          <FormInput
            name="street"
            label="Street Address"
            placeholder="Enter street address"
            control={control}
            errors={errors}
            theme={theme}
            rules={{ required: 'Street address is required' }}
            required
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <FormInput
                name="city"
                label="City"
                placeholder="City"
                control={control}
                errors={errors}
                theme={theme}
                rules={{ required: 'City is required' }}
                required
              />
            </View>
            <View style={styles.halfInput}>
              <FormInput
                name="state"
                label="State"
                placeholder="State"
                control={control}
                errors={errors}
                theme={theme}
                rules={{ required: 'State is required' }}
                required
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <FormInput
                name="zipCode"
                label="ZIP Code"
                placeholder="12345"
                control={control}
                errors={errors}
                theme={theme}
                rules={{
                  required: 'ZIP code is required',
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: 'Please enter a valid ZIP code',
                  },
                }}
                keyboardType="numeric"
                required
              />
            </View>
            <View style={styles.halfInput}>
              <FormInput
                name="country"
                label="Country"
                placeholder="Myanmar"
                control={control}
                errors={errors}
                theme={theme}
                rules={{ required: 'Country is required' }}
                required
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          <PaymentMethodSelector
            control={control}
            errors={errors}
            theme={theme}
          />

          <CardInfoForm
            control={control}
            errors={errors}
            theme={theme}
            selectedPaymentMethod={selectedPaymentMethod}
          />

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
