export interface Product {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  price: number;
  volume: string;
  alcohol_percentage: number;
  description: string;
  rating: number;
  featured: boolean;
  in_stock: boolean;
  image: string;
  store: {
    name: string;
    location: string;
    contact: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
}
