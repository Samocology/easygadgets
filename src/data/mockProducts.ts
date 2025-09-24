export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 479199.60, // ₦479,199.60
    originalPrice: 519599.60, // ₦519,599.60
    rating: 4.8,
    reviewCount: 1547,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop",
    category: "Smartphones",
    isNew: true,
    description: "The most advanced iPhone ever with titanium design and Action Button.",
    features: ["48MP Main Camera", "A17 Pro Chip", "Titanium Design", "USB-C"],
    inStock: true,
    stockCount: 25
  },
  {
    id: "2", 
    name: "MacBook Air M3",
    brand: "Apple",
    price: 439199.60, // ₦439,199.60
    rating: 4.9,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    category: "Laptops",
    description: "Supercharged by the M3 chip. Up to 18 hours of battery life.",
    features: ["M3 Chip", "18-hour Battery", "Liquid Retina Display", "MagSafe 3"],
    inStock: true,
    stockCount: 12
  },
  {
    id: "3",
    name: "AirPods Pro (3rd Gen)",
    brand: "Apple", 
    price: 99799.75, // ₦99,799.75
    originalPrice: 111799.65, // ₦111,799.65
    rating: 4.7,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop",
    category: "Headphones",
    description: "Active Noise Cancellation and Spatial Audio for an immersive experience.",
    features: ["Active Noise Cancellation", "Spatial Audio", "6-hour Battery", "MagSafe Case"],
    inStock: true,
    stockCount: 48
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 479199.60, // ₦479,199.60
    rating: 4.6,
    reviewCount: 1234,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    category: "Smartphones",
    isNew: true,
    description: "Galaxy AI is here. Now everyone can be a photo editing pro.",
    features: ["200MP Camera", "S Pen", "5000mAh Battery", "Galaxy AI"],
    inStock: true,
    stockCount: 18
  },
  {
    id: "5",
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 399199.60, // ₦399,199.60
    originalPrice: 479599.60, // ₦479,599.60
    rating: 4.4,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    category: "Laptops",
    description: "Premium ultrabook with stunning 13.4-inch OLED display.",
    features: ["Intel Core i7", "OLED Display", "16GB RAM", "512GB SSD"],
    inStock: true,
    stockCount: 8
  },
  {
    id: "6",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 159799.60, // ₦159,799.60
    rating: 4.8,
    reviewCount: 1891,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    category: "Headphones",
    description: "Industry-leading noise cancellation with exceptional sound quality.",
    features: ["30-hour Battery", "Quick Charge", "Multipoint Connection", "Touch Controls"],
    inStock: true,
    stockCount: 32
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    brand: "Apple",
    price: 159799.60, // ₦159,799.60
    rating: 4.7,
    reviewCount: 1456,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
    category: "Smart Watches",
    isNew: true,
    description: "More powerful. More capable. Magical new ways to use your Apple Watch.",
    features: ["S9 Chip", "Double Tap", "18-hour Battery", "Crash Detection"],
    inStock: true,
    stockCount: 22
  },
  {
    id: "8",
    name: "iPad Air M2",
    brand: "Apple",
    price: 239599.60, // ₦239,599.60
    originalPrice: 259599.60, // ₦259,599.60
    rating: 4.6,
    reviewCount: 743,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    category: "Accessories",
    description: "Serious performance in a thin and light design.",
    features: ["M2 Chip", "10.9-inch Display", "All-day Battery", "USB-C"],
    inStock: true,
    stockCount: 15
  }
];