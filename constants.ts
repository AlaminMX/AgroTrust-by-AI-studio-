import { Product, FarmerProfile, Order } from './types';

export const STATES = ['Lagos', 'Abuja (FCT)', 'Ogun', 'Oyo', 'Kano', 'Kaduna', 'Rivers', 'Enugu', 'Benue', 'Plateau'];

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", 
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", 
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", 
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export const CATEGORIES = ['Vegetables', 'Fruits', 'Tubers', 'Grains', 'Poultry', 'Livestock'];

export const MOCK_FARMERS: FarmerProfile[] = [
  { 
    id: 'f1', name: 'Musa Ibrahim', farmName: 'Green Valley Organics', location: 'Kaduna', verified: true, rating: 4.8, joinedDate: '2023-01-15', trustScore: 98,
    stateOfOrigin: 'Kano', stateOfResidence: 'Kaduna', farmSize: '5 Hectares', farmingMethod: 'Organic', mainCrops: ['Tomatoes', 'Peppers'] 
  },
  { 
    id: 'f2', name: 'Chioma Okonkwo', farmName: 'Heritage Tubers', location: 'Enugu', verified: true, rating: 4.9, joinedDate: '2022-11-20', trustScore: 95,
    stateOfOrigin: 'Anambra', stateOfResidence: 'Enugu', farmSize: '12 Acres', farmingMethod: 'Conventional', mainCrops: ['Yam', 'Cassava'] 
  },
  { 
    id: 'f3', name: 'Bayo Adebayo', farmName: 'Sunshine Groves', location: 'Ogun', verified: false, rating: 4.2, joinedDate: '2024-02-01', trustScore: 70,
    stateOfOrigin: 'Osun', stateOfResidence: 'Ogun', farmSize: '2 Hectares', farmingMethod: 'Hydroponic', mainCrops: ['Oranges', 'Leafy Greens'] 
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', name: 'Jos Tomatoes', category: 'Vegetables', price: 1500, unit: 'basket', 
    farmerId: 'f1', farmerName: 'Green Valley Organics', state: 'Kaduna', verified: true,
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  { 
    id: 'p2', name: 'Sweet Corn', category: 'Grains', price: 200, unit: 'cob', 
    farmerId: 'f2', farmerName: 'Heritage Tubers', state: 'Enugu', verified: true,
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  { 
    id: 'p3', name: 'Benue Yams', category: 'Tubers', price: 3500, unit: 'tuber', 
    farmerId: 'f3', farmerName: 'Sunshine Groves', state: 'Ogun', verified: false,
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  { 
    id: 'p4', name: 'Ugu Leaves', category: 'Vegetables', price: 500, unit: 'bunch', 
    farmerId: 'f1', farmerName: 'Green Valley Organics', state: 'Kaduna', verified: true,
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-8821',
    farmerId: 'f1',
    products: [{ productId: 'p1', quantity: 5, name: 'Jos Tomatoes', price: 1500 }],
    total: 7500,
    status: 'PAID_ESCROW',
    date: '2023-10-25'
  },
  {
    id: 'ORD-9932',
    farmerId: 'f1',
    products: [{ productId: 'p4', quantity: 10, name: 'Ugu Leaves', price: 500 }],
    total: 5000,
    status: 'DELIVERED',
    date: '2023-10-22'
  }
];