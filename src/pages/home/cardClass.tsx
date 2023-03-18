import React from 'react';
import './data';
import './App.css';
import { Items } from './items';
import { IAppState, IAppProps, IProduct } from '../../interface';

export class Card extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    const dataProductsLocalStorage = JSON.parse(localStorage.getItem('dataProducts') || '[]');
    this.state = {
      items: dataProductsLocalStorage,
      currentItems: dataProductsLocalStorage,
    };
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const valueSearchInput = event.target.value.toLowerCase();
    const { items: originalItems } = this.state;
    const filteredCards = originalItems.filter((card: IProduct) => {
      return (
        card.title.toLowerCase().includes(valueSearchInput) ||
        card.brand.toLowerCase().includes(valueSearchInput) ||
        card.price.toString().includes(valueSearchInput) ||
        card.discountPercentage.toString().includes(valueSearchInput) ||
        card.stock.toString().includes(valueSearchInput)
      );
    });
    this.setState({ currentItems: filteredCards });
    localStorage.setItem('valueSearchInput', valueSearchInput);
    const filteredCardsString = JSON.stringify(filteredCards);
    localStorage.setItem('dataProducts', filteredCardsString);
  };
  render(): JSX.Element {
    const { currentItems } = this.state;
    return (
      <div>
        <form className="search_form">
          <input
            className="input_search"
            type="text"
            placeholder="search product"
            onChange={this.handleSearchInputChange}
          />
        </form>
        <div>
          <Items items={currentItems} />
        </div>
      </div>
    );
  }
}

export default Card;
