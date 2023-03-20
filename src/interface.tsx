export interface IProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  discountPercentage: number;
  description?: string;
  rating?: number;
  category: string;
  thumbnail?: string;
  images: string[];
}

export interface IData {
  items: IProduct[];
}

export interface IAppState {
  items: IProduct[];
  currentItems: IProduct[];
}

export interface IAppProps {
  items: {
    id: number;
    title: string;
    brand: string;
    price: number;
    discountPercentage: number;
    stock: number;
  }[];
}

export interface IItemsProps {
  items: IProduct[];
}

export interface IItemProps {
  items: IProduct;
}
