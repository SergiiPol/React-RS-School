import React, { Component } from 'react';
import { IItemsProps } from '../../interface';
import Item from './item';

export class Items extends Component<IItemsProps> {
  render(): JSX.Element {
    return (
      <main>
        {this.props.items.map((el) => (
          <Item key={el.id} items={el} />
        ))}
      </main>
    );
  }
}

export default Items;
