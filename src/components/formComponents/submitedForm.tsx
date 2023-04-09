import React from 'react';
import { SubmitedData } from '../../interface';
import './form.css';

function SubData(props: SubmitedData) {
  return (
    <div data-testid="submitted_data">
      <div className="card-list">
        <img src={props.answer.profilePicture} alt="foto" width={150} height={150} />

        <div className="card_added">
          <span>Name: {props.answer.name}</span>
        </div>
        <div className="card_added">
          <span>Birthday: {props.answer.date}</span>
        </div>
        <div className="card_added">
          <span>ZipCode: {props.answer.zipCode} </span>
        </div>
        <div className="card_added">
          <span>Gender: {props.answer.gender === 'Female' ? props.answer.name : 'Male'}</span>
        </div>
        <div className="card_added">
          <span>Country: {props.answer.type}</span>
        </div>
        <div className="card_added">
          <span>Notification: {props.answer.notification}</span>
        </div>

        <p>{props.answer.message}</p>
      </div>
    </div>
  );
}
export default SubData;
