export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
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
  data?: IData | readonly IProduct[];
}

export interface IItemsProps {
  items: IProduct[];
}

export interface IItemProps {
  items: IProduct;
}
