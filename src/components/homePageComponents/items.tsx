import { Item } from './item';
import React, { Component } from 'react';
import { ICardHeroList } from '../../interface';

export class Items extends Component<ICardHeroList> {
  render() {
    const { charters, setIsActive, setCharterInfo } = this.props;
    return (
      <div className="wrapperAllItems" data-testid="items">
        {charters.map((charter) => {
          return (
            <Item
              key={charter.id}
              {...charter}
              setIsActive={setIsActive}
              setCharterInfo={setCharterInfo}
            />
          );
        })}
      </div>
    );
  }
}
