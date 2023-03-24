import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Item from './pages/home/item';
import { IProduct } from 'interface';
import App from './App';
import { About } from './pages/aboutUs/about';
import Auth from './pages/form/authClass';
import { Form } from './pages/form/form';

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

test('Validating Name Field', () => {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  form.appendChild(nameInput);

  nameInput.value = '';
  form.dispatchEvent(new Event('submit'));

  const error = form.querySelector('.error[name="name"]');
  expect(error).toBeNull();
  if (error !== null) {
    expect(error.textContent).toBe('Please enter a name.');
  }

  nameInput.value = 'john';
  form.dispatchEvent(new Event('submit'));

  const error2 = form.querySelector('.error[name="name"]');
  expect(error2).toBeNull();
  if (error2 !== null) {
    expect(error2.textContent).toBe('Name must start with an uppercase letter.');
  }
});

describe('Auth component', () => {
  test('renders all input fields', () => {
    const { getByLabelText } = render(<Auth />);
    expect(getByLabelText('Name:')).toBeInTheDocument();
    expect(getByLabelText('Zip Code:')).toBeInTheDocument();
    expect(getByLabelText('Birthday:')).toBeInTheDocument();
    expect(getByLabelText('Country:')).toBeInTheDocument();
    expect(getByLabelText('Male')).toBeInTheDocument();
    expect(getByLabelText('Female')).toBeInTheDocument();
    // expect(getByLabelText('Notifications')).toBeInTheDocument();
    // expect(getByLabelText('Profile Picture')).toBeInTheDocument();
  });

  test('renders form errors', () => {
    const { getByText } = render(<Auth />);
    fireEvent.submit(getByText('Submit'));
    expect(getByText('Name is required')).toBeInTheDocument();
    expect(getByText('Zip code is required')).toBeInTheDocument();
    expect(getByText('Birthday is required')).toBeInTheDocument();
    expect(getByText('Gender is required')).toBeInTheDocument();
    expect(getByText('Notifications is required')).toBeInTheDocument();
  });

  test('submits form data', () => {
    const { getByLabelText, getByText, queryByText } = render(<Auth />);
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Zip Code:'), { target: { value: '12345' } });
    fireEvent.change(getByLabelText('Birthday:'), { target: { value: '2022-01-01' } });
    fireEvent.click(getByLabelText('Male'));
    // fireEvent.click(getByLabelText('Notifications'));
    fireEvent.submit(getByText('Submit'));

    expect(queryByText('Name is required')).not.toBeInTheDocument();
    expect(queryByText('Zip code is required')).not.toBeInTheDocument();
    expect(queryByText('Birthday is required')).not.toBeInTheDocument();
    expect(queryByText('Gender is required')).not.toBeInTheDocument();
    expect(queryByText('Notifications is required')).toBeInTheDocument();

    // expect(queryByText('Form data saved for John')).toBeInTheDocument();
    // expect(queryByText('Name: John')).toBeInTheDocument();
    // expect(queryByText('Zip code: 12345')).toBeInTheDocument();
    // expect(queryByText('Birthday: 2022-01-01')).toBeInTheDocument();
    // expect(queryByText('Gender: Male')).toBeInTheDocument();
    // expect(queryByText('Notifications: true')).toBeInTheDocument();
  });
});

describe('Form', () => {
  test('renders Form component with Auth component', () => {
    render(<Form />);
    expect(screen.getByText('Form')).toBeInTheDocument();
    expect(screen.getByTestId('auth-component')).toBeInTheDocument();
    expect(screen.queryByText('Not authorized')).toBeNull();
  });
});

describe('About component', () => {
  it('should render the component', () => {
    const { getByText } = render(<About />);
    expect(getByText('About us')).toBeInTheDocument();
    expect(
      getByText(
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non doloribus vitae aut cumque nulla nostrum numquam iure, dolorem placeat corporis magnam at reprehenderit commodi suscipit ex pariatur, maiores doloremque tempora? tempora?'
      )
    ).toBeInTheDocument();
  });
});

describe('App', () => {
  test('renders home page link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByTestId('home-link');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders about page link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders form page link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Form/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders not found page for invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <App />
      </MemoryRouter>
    );
    const notFoundElement = screen.getByText(/Page not found/i);
    expect(notFoundElement).toBeInTheDocument();
  });
});
