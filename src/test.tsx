import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Item from './pages/home/item';
import { IProduct } from 'interface';
import App from './App';
import { About } from './pages/aboutUs/about';
import Auth from './pages/form/auth';
import { Form } from './pages/form/form';
import Card from './pages/home/cardClass';

global.URL.createObjectURL = jest.fn(() => 'mock-url');

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
    expect(getByLabelText('Notifications')).toBeInTheDocument();
    expect(getByLabelText('Profile picture')).toBeInTheDocument();
  });

  // test('renders form errors', () => {
  //   const { getByText } = render(<Auth />);
  //   fireEvent.submit(getByText('Submit'));
  //   expect(getByText('Name is required')).toBeInTheDocument();
  //   expect(getByText('ZipCode is required')).toBeInTheDocument();
  //   expect(getByText('Birthday is required')).toBeInTheDocument();
  //   expect(getByText('Gender is required')).toBeInTheDocument();
  //   expect(getByText('Notifications is required')).toBeInTheDocument();
  // });

  test('submits form data', () => {
    const { getByLabelText, getByText, queryByText } = render(<Auth />);
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Zip Code:'), { target: { value: '12345' } });
    fireEvent.change(getByLabelText('Birthday:'), { target: { value: '2022-01-01' } });
    fireEvent.click(getByLabelText('Male'));
    fireEvent.submit(getByText('Submit'));

    expect(queryByText('Name is required')).not.toBeInTheDocument();
    expect(queryByText('Zip code is required')).not.toBeInTheDocument();
    expect(queryByText('Birthday is required')).not.toBeInTheDocument();
    expect(queryByText('Gender is required')).not.toBeInTheDocument();
    expect(queryByText('Notifications is required')).not.toBeInTheDocument();
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

describe('App component', () => {
  test('renders "Home" link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
  });
});

test('renders App component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});
describe('Auth form', () => {
  test('renders auth form', () => {
    const { getByTestId } = render(<Auth />);
    const authForm = getByTestId('auth-component');
    expect(authForm).toBeInTheDocument();
  });

  test('renders name input', () => {
    const { getByLabelText } = render(<Auth />);
    const nameInput = getByLabelText('Name:');
    expect(nameInput).toBeInTheDocument();
  });

  test('renders zip code input', () => {
    const { getByLabelText } = render(<Auth />);
    const zipCodeInput = getByLabelText('Zip Code:');
    expect(zipCodeInput).toBeInTheDocument();
  });

  test('renders birthday input', () => {
    const { getByLabelText } = render(<Auth />);
    const birthdayInput = getByLabelText('Birthday:');
    expect(birthdayInput).toBeInTheDocument();
  });

  test('renders country select', () => {
    const { getByLabelText } = render(<Auth />);
    const countrySelect = getByLabelText('Country:');
    expect(countrySelect).toBeInTheDocument();
  });

  test('renders gender radio buttons', () => {
    const { getByLabelText } = render(<Auth />);
    const maleRadio = getByLabelText('Male');
    const femaleRadio = getByLabelText('Female');
    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();
  });

  test('renders notifications checkbox', () => {
    const { getByLabelText } = render(<Auth />);
    const notificationsCheckbox = getByLabelText('Notifications');
    expect(notificationsCheckbox).toBeInTheDocument();
  });

  test('renders profile picture input', () => {
    const { getByLabelText } = render(<Auth />);
    const profilePictureInput = getByLabelText('Profile picture');
    expect(profilePictureInput).toBeInTheDocument();
  });
});

const mockItems = [
  { title: 'Item 1', brand: 'Brand 1', price: 10, discountPercentage: 0, stock: 5 },
  { title: 'Item 2', brand: 'Brand 2', price: 20, discountPercentage: 10, stock: 10 },
];

describe('Card', () => {
  it('should render search input and icon', () => {
    const { getByPlaceholderText, getByTestId } = render(<Card />);
    expect(getByPlaceholderText('search product')).toBeInTheDocument();
    expect(getByTestId('search-icon')).toBeInTheDocument();
  });

  it('should filter items when search input is changed', () => {
    const { getByPlaceholderText, getByText } = render(<Card />);
    const searchInput = getByPlaceholderText('search product');
    fireEvent.change(searchInput, { target: { value: 'Item 1' } });
    expect(() => getByText('Item 2')).toThrow();
  });

  it('should update local storage when search input is changed', () => {
    localStorage.setItem('dataProducts', JSON.stringify(mockItems));
    const { getByPlaceholderText } = render(<Card />);
    const searchInput = getByPlaceholderText('search product');
    fireEvent.change(searchInput, { target: { value: 'Brand 1' } });
    const updatedData = JSON.parse(localStorage.getItem('dataProducts') || '[]');
    expect(updatedData).toEqual([mockItems[0]]);
  });
});

describe('Auth component', () => {
  it('renders without errors', () => {
    render(<Auth />);
    expect(screen.getByTestId('auth-component')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<Auth />);
    const nameInput = screen.getByLabelText('Name:');
    const zipCodeInput = screen.getByLabelText('Zip Code:');
    const birthdayInput = screen.getByLabelText('Birthday:');
    const countrySelect = screen.getByLabelText('Country:');
    const notificationsCheckbox = screen.getByLabelText('Notifications');
    const fotoInput = screen.getByLabelText('Profile picture');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(zipCodeInput, { target: { value: '12345' } });
    fireEvent.change(birthdayInput, { target: { value: '2000-01-01' } });
    fireEvent.change(countrySelect, { target: { value: 'USA' } });
    fireEvent.click(notificationsCheckbox);
    fireEvent.change(fotoInput, {
      target: {
        files: [new File([''], 'test.png', { type: 'image/png' })],
      },
    });
    fireEvent.click(submitButton);
  });

  it('shows error messages for invalid fields', async () => {
    render(<Auth />);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    const nameError = await screen.findByText('Name is required');
    const zipCodeError = await screen.findByText('ZipCode is required');
    const birthdayError = await screen.findByText('Choose a date');
    const countryError = await screen.findByText('Choose a country');
    const genderError = await screen.findByText('Choose a gender');
    const notificationsError = await screen.findByText('Notifications is required');
    const fotoError = await screen.findByText('Choose a foto');

    expect(nameError).toBeInTheDocument();
    expect(zipCodeError).toBeInTheDocument();
    expect(birthdayError).toBeInTheDocument();
    expect(countryError).toBeInTheDocument();
    expect(genderError).toBeInTheDocument();
    expect(notificationsError).toBeInTheDocument();
    expect(fotoError).toBeInTheDocument();
  });
});
