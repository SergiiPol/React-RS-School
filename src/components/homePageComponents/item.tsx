import React, { Component } from 'react';
import { ICardHero } from '../../interface';
import './home.css';

export class Item extends Component<ICardHero> {
  render() {
    const { image, name, created, upload, setIsActive, setCharterInfo } = this.props;
    const imgSrc = upload ? URL.createObjectURL(upload) : image;

    const openCharterCard = () => {
      setIsActive && setIsActive(true);
      setCharterInfo && setCharterInfo(this.props);
    };
    return (
      <div className="wrapperItem" data-testid="item" onClick={openCharterCard}>
        <div className="imgItem_wrapper">
          <img className="imgItem" src={imgSrc} alt="foto" />
        </div>
        <div className="card__text">
          <div>
            <h3>
              <span>Name: </span>
              {name}
            </h3>
            <p>
              <span>Cost: </span>
              {this.props.cost ? (
                <span>{this.props.cost}$</span>
              ) : (
                <span>{created && created.slice(21, 23)}$</span>
              )}
            </p>
          </div>
          <div>
            {this.props.date ? (
              <div>
                Date of creation: <p>{this.props.date}</p>
              </div>
            ) : (
              <div>
                Date of creation: <p>{created && created.slice(0, 10)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Item;
