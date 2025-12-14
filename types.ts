export enum UserRole {
  CONSUMER = 'CONSUMER',
  FARMER = 'FARMER',
  ADMIN = 'ADMIN',
  NONE = 'NONE'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  farmerId: string;
  farmerName: string;
  state: string;
  verified: boolean;
  imageUrl: string;
  description?: string;
}

export interface Order {
  id: string;
  products: { productId: string; quantity: number; name: string; price: number }[];
  total: number;
  status: 'PENDING_ESCROW' | 'PAID_ESCROW' | 'SHIPPED' | 'DELIVERED' | 'RELEASED';
  date: string;
  farmerId: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  rating: number;
  joinedDate: string;
  trustScore: number;
  // Enhanced fields
  phone?: string;
  stateOfOrigin?: string;
  stateOfResidence?: string;
  farmName?: string;
  farmSize?: string;
  farmingMethod?: string;
  mainCrops?: string[];
  nin?: string;
  // Verification Documents (URLs)
  passportPhotoUrl?: string;
  ninImageUrl?: string;
  idImageUrl?: string;
}