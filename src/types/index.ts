export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  currency: 'USD' | 'EUR' | 'GBP';
  theme: 'light' | 'dark';
}