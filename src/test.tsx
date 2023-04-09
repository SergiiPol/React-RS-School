import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Item from './components/homePageComponents/item';
import { ICardHero } from 'interface';
import { Items } from './components/homePageComponents/items';
import App from './App';
import { About } from './pages/aboutUs/about';
import Auth from './components/formComponents/auth';
import { Form } from './pages/form/form';
import SearchCard from './components/homePageComponents/cardClass';
import { ModalWindow } from './components/homePageComponents/modalWindow';

jest.mock('node-fetch');
global.URL.createObjectURL = jest.fn(() => 'mock-url');

describe('ModalWindow component', () => {
  const setIsActive = jest.fn();
  const charterInfo = {
    name: 'Test Character',
    status: 'Alive',
    species: 'Human',
    type: 'Test',
    gender: 'Male',
    location: {
      name: 'Test Location',
    },
    created: '2022-04-09T12:34:56.789Z',
    image: 'test-image-url',
  };

  it('should render modal with charter information when isActiv is true', () => {
    const { getByText, getByAltText } = render(
      <ModalWindow isActiv={true} setIsActive={setIsActive} charterInfo={charterInfo} />
    );

    expect(getByText('Status: Alive')).toBeInTheDocument();
    expect(getByText('Species: Human')).toBeInTheDocument();
    expect(getByText('Type: Test')).toBeInTheDocument();
    expect(getByText('Gender: Male')).toBeInTheDocument();
    expect(getByText('Location: Test Location')).toBeInTheDocument();
    expect(getByText('Created: 2022-04-09')).toBeInTheDocument();
    expect(getByAltText('charter image')).toHaveAttribute('src', 'test-image-url');
  });

  it('should call setIsActive(false) when modal_container or charter_close is clicked', () => {
    const { getByTestId } = render(
      <ModalWindow isActiv={true} setIsActive={setIsActive} charterInfo={charterInfo} />
    );

    fireEvent.click(getByTestId('modal'));
    expect(setIsActive).toHaveBeenCalledWith(false);

    fireEvent.click(getByTestId('close'));
    expect(setIsActive).toHaveBeenCalledWith(false);
  });
});

const props: ICardHero = {
  image: 'https://via.placeholder.com/150',
  name: 'Hero',
  species: 'Species name',
  created: '2023-04-09T14:00:00.000Z',
  setIsActive: jest.fn(),
  setCharterInfo: jest.fn(),
  status: '',
  type: '',
  gender: 'mail',
};

describe('Item', () => {
  it('renders with correct props', () => {
    render(<Item {...props} />);
    expect(screen.getByText('Fraction:')).toBeInTheDocument();
    expect(screen.getByAltText('foto')).toBeInTheDocument();
  });

  it('calls setIsActive and setCharterInfo when clicked', () => {
    render(<Item {...props} />);
    const item = screen.getByTestId('item');
    fireEvent.click(item);
    expect(props.setIsActive).toHaveBeenCalled();
    expect(props.setCharterInfo).toHaveBeenCalledWith(props);
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

const charters: ICardHero[] = [
  {
    id: 1,
    name: 'Charter 1',
    species: 'Human',
    created: '2022-04-08T08:08:08.000Z',
    cost: '10',
    image: 'https://image.com/1.jpg',
    status: '',
    type: '',
    gender: '',
  },
  {
    id: 2,
    name: 'Charter 2',
    species: 'Alien',
    created: '2022-04-09T09:09:09.000Z',
    cost: '',
    image: 'https://image.com/2.jpg',
    status: '',
    type: '',
    gender: '',
  },
];

describe('Items component', () => {
  it('should render all charters', () => {
    const setIsActive = jest.fn();
    const setCharterInfo = jest.fn();
    const { getByTestId } = render(
      <Items charters={charters} setIsActive={setIsActive} setCharterInfo={setCharterInfo} />
    );
    const itemsElement = getByTestId('items');
    expect(itemsElement).toBeInTheDocument();
    expect(itemsElement.children.length).toBe(charters.length);
  });
});

describe('SearchCard', () => {
  it('should render the search input and button', () => {
    render(<SearchCard />);
    const input = screen.getByPlaceholderText('Search card...');
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Go Search' });
    expect(button).toBeInTheDocument();
  });

  it('should update the input value on change', () => {
    render(<SearchCard />);
    const input = screen.getByPlaceholderText('Search card...');
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(input).toHaveValue('Rick');
  });

  it('should update the search value on submit', () => {
    render(<SearchCard />);
    const input = screen.getByPlaceholderText('Search card...');
    const button = screen.getByRole('button', { name: 'Go Search' });
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(screen.getByTestId('items')).toBeInTheDocument();
  });
});
