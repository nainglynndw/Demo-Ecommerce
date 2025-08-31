export interface Order {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  productId: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface OrderFormData {
  quantity: number;
  customerName: string;
  customerPhone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit_card' | 'debit_card';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardHolderName: string;
}
