export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  paymentMethod: "COD" | "UPI" | "";
  upiId: string;
}

export interface Order {
  orderId: number;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  paymentMethod: "COD" | "UPI" | "";
  orderDate: string;
}
