import React from 'react';
import styles from './modalWindow.module.css';
import { IModalWindowVelue } from '../../interface';

export const ModalWindow = ({ isActiv, setIsActive, charterInfo }: IModalWindowVelue) => {
  const active = isActiv ? styles.active : '';
  const { name, status, species, type, gender, location, created, image } = charterInfo;
  return (
    <>
      <div
        className={styles.modal_container + ' ' + active}
        onClick={() => setIsActive(false)}
        data-testid="modal"
      >
        <div className={styles.charter_card} onClick={(e) => e.stopPropagation()}>
          <div className={styles.charter_img}>
            <img src={image} alt="charter image" />
          </div>
          <div className={styles.charter_info}>
            <p>Name: {name || 'unknow'}</p>
            <p>Status: {status || 'unknow'}</p>
            <p>Species: {species || 'unknow'}</p>
            <p>Type: {type || 'No data'}</p>
            <p>Gender: {gender || 'unknow'}</p>
            <p>Location: {location && location.name}</p>
            <p>Card cost: {created && created.slice(21, 23)}€</p>
            <p>Created: {created && created.slice(0, 10)}</p>
          </div>
          <button
            type="button"
            className={styles.charter_close}
            onClick={() => setIsActive(false)}
            data-testid="close"
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};
