export interface Product {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  price: number;
  rating: number;
}

export interface LoginResponse {
  access_token: string;
}

export interface Profile {
  id: number;
  email: string;
  address: string;
  name: string;
  phone: string;
}
