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

export interface Images {
  [key: string]: string;
}
export type FormSubmission = {
  profilePictureUrl: string | undefined;
  name: string;
  zipCode: string;
  birthday: string;
  country: string;
  gender: string;
  notifications: boolean;
  profilePicture: File | null;
};
export interface ICardHero {
  id?: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location?: {
    name: string;
  };
  image?: string;
  created?: string;
  upload?: Blob | MediaSource | undefined;
  frame?: boolean;
  cost?: string;
  date?: string;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setCharterInfo?: React.Dispatch<React.SetStateAction<ICardHero>>;
}
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
  errors: Record<string, string> | null;
};
export type ISelect = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name: string;
  label: string;
};

export type SubmitedData = {
  answer: Data;
};

export interface ICardHeroList {
  charters: ICardHero[];
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setCharterInfo?: React.Dispatch<React.SetStateAction<ICardHero>>;
}

export type Data = {
  name: string;
  zipCode: string;
  date: string;
  type: string;
  notification: string[];
  message: string;
  gender: string;
  profilePicture: string;
};

export interface IModalWindowVelue {
  isActiv: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  charterInfo: ICardHero;
}
