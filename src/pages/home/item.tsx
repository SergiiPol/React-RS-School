import React, { Component } from 'react';
import { IItemProps } from '../../interface';

export class Item extends Component<IItemProps> {
  render(): JSX.Element {
    return (
      <div className="wrapperItem">
        <h2>{this.props.items.title}</h2>
        <img src={this.props.items.thumbnail}></img>
        <h4>category: {this.props.items.category}</h4>
        <h4>brand: {this.props.items.brand}</h4>
        <div>rating: {this.props.items.rating}</div>
      </div>
    );
  }
}

export default Item;
