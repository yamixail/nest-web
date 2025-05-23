export interface Catalog {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  catalogId: number;
}

export const catalogs: Catalog[] = [
  { id: 1, name: "Keyboards" },
  { id: 2, name: "Mice" },
  { id: 3, name: "Cables" },
  { id: 4, name: "Monitors" },
  { id: 5, name: "Headphones" },
];

export const products: Product[] = [
  // Keyboards
  {
    id: 1,
    name: "Mechanical Keyboard",
    description: "RGB, Blue Switches",
    price: 99.99,
    catalogId: 1,
  },
  {
    id: 2,
    name: "Wireless Keyboard",
    description: "Bluetooth, Slim",
    price: 49.99,
    catalogId: 1,
  },

  // Mice
  {
    id: 3,
    name: "Gaming Mouse",
    description: "16000 DPI, RGB",
    price: 59.99,
    catalogId: 2,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description: "Ergonomic, 2.4GHz",
    price: 29.99,
    catalogId: 2,
  },

  // Cables
  {
    id: 5,
    name: "USB-C Cable",
    description: "1m, Fast Charging",
    price: 9.99,
    catalogId: 3,
  },
  {
    id: 6,
    name: "HDMI Cable",
    description: "2m, 4K Support",
    price: 14.99,
    catalogId: 3,
  },

  // Monitors
  {
    id: 7,
    name: '24" Monitor',
    description: "1080p, 75Hz",
    price: 129.99,
    catalogId: 4,
  },
  {
    id: 8,
    name: '27" Monitor',
    description: "1440p, 144Hz",
    price: 299.99,
    catalogId: 4,
  },

  // Headphones
  {
    id: 9,
    name: "Wireless Headphones",
    description: "Noise Cancelling",
    price: 199.99,
    catalogId: 5,
  },
  {
    id: 10,
    name: "Wired Headphones",
    description: "Over-Ear, Hi-Fi",
    price: 79.99,
    catalogId: 5,
  },
];

// Mock function to simulate getting a next ID
// In a real application, this would be handled by a database
let lastCatalogId = 5;
let lastProductId = 10;

export function getNextCatalogId() {
  lastCatalogId += 1;
  return lastCatalogId;
}

export function getNextProductId() {
  lastProductId += 1;
  return lastProductId;
}
