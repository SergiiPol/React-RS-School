import React, { Component } from 'react';
import { IItemProps } from '../../interface';

export class Item extends Component<IItemProps> {
  render(): JSX.Element {
    return (
      <div className="wrapperItem">
        <h2 className="titleItem">{this.props.items.title.toUpperCase()}</h2>
        <figure className="wrapperImgItem">
          <img className="imgItem" src={this.props.items.thumbnail}></img>
        </figure>
        <h2 className="priceItem">{this.props.items.price} €</h2>
        <h4 className="categoryItem">category: {this.props.items.category}</h4>
        <h4 className="brandItem">brand: {this.props.items.brand}</h4>
        <div className="ratingItem">rating: {this.props.items.rating}</div>
      </div>
    );
  }
}

export default Item;
