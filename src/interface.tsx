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
// eslint-disable-next-line @typescript-eslint/ban-types
export type FormProps = {};

export interface Images {
  [key: string]: string;
}
export type FormSubmission = {
  // profilePictureUrl: string | undefined;
  name: string;
  zipCode: string;
  birthday: string;
  country: string;
  gender: string;
  notifications: boolean;
  profilePicture: File | null;
};

export type FormState = {
  submissions: FormSubmission[];
  name: string;
  zipCode: string;
  birthday: string;
  country: string;
  gender: string;
  notifications: boolean;
  profilePicture: File | null;
  profilePictureUrl: string;
  errors: Record<string, string>;
};
