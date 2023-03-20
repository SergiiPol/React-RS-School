import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Item from './pages/home/item';
import { IProduct } from 'interface';
import Items from './pages/home/items';
import Card from './pages/home/cardClass';
import App from './App';

const item: IProduct = {
  id: 1,
  title: 'Test Item',
  price: 9.99,
  category: 'Test Category',
  brand: 'Test Brand',
  rating: 4.5,
  thumbnail: 'https://test.com/item.jpg',
  stock: 0,
  discountPercentage: 0,
  images: [],
};

describe('Item component', () => {
  it('should render item details', () => {
    const { getByText } = render(<Item items={item} />);
    expect(getByText(item.title.toUpperCase())).toBeInTheDocument();
    expect(getByText(`${item.price} €`)).toBeInTheDocument();
    expect(getByText(`category: ${item.category}`)).toBeInTheDocument();
    expect(getByText(`brand: ${item.brand}`)).toBeInTheDocument();
    expect(getByText(`rating: ${item.rating}`)).toBeInTheDocument();
  });
});

// describe('Items', () => {
//   it('renders a list of items', () => {
//     const items = [
//       { id: 1, name: 'Item 1' },
//       { id: 2, name: 'Item 2' },
//       { id: 3, name: 'Item 3' },
//     ];
//     const { getAllByTestId } = render(<Items items={items} />);
//     const itemList = getAllByTestId('item');
//     expect(itemList).toHaveLength(3);
//   });
// });

// test('search input changes items displayed', () => {
//   const { getByPlaceholderText, getByText } = render(<App />);
//   const searchInput = getByPlaceholderText('search product');

//   fireEvent.change(searchInput, { target: { value: 'Brand 1' } });

//   expect(getByText(/Product 1/)).not.toBeInTheDocument();
//   expect(getByText(/Product 2/)).not.toBeInTheDocument();
//   expect(getByText(/Product 3/)).toBeInTheDocument();
// });
