import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './form.css';
import SubData from './submitedForm';
import Select from './Select';
import { Data } from '../../interface';

function Form() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm<Data>();
  const [formData, setAnswers] = useState<Data[]>([]);

  const onSubmit = handleSubmit((data: Data) => {
    const link = URL.createObjectURL(data.profilePicture[0] as unknown as Blob);
    alert('Data has been saved');
    setAnswers([
      ...formData,
      {
        profilePicture: link,
        type: data.type,
        name: data.name,
        zipCode: data.zipCode,
        date: data.date,
        notification: data.notification,
        message: data.message,
        gender: data.gender,
      },
    ]);
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState, reset]);

  return (
    <>
      <form data-testid="auth-component" className="form_auth" onSubmit={onSubmit}>
        <div className="wrapper_form">
          <div className="wrapper_input">
            <label htmlFor="name-input">Name:</label>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Min 2 letters' },
              })}
              id="name-input"
              name="name"
              type="text"
            />
          </div>
          <div className="error">{errors.name?.message}</div>
          <div className="wrapper_input">
            <label htmlFor="zip-code-input">Zip Code:</label>
            <input
              {...register('zipCode', { required: 'ZipCode is required' })}
              id="zip-code-input"
              type="text"
              name="zipCode"
            />
          </div>
          <div className="error">{errors.zipCode?.message}</div>
          <div className="wrapper_input">
            <label htmlFor="birthday-input">Birthday:</label>
            <input
              {...register('date', { required: 'Choose a date' })}
              id="birthday-input"
              name="date"
              type="date"
            />
          </div>
          <div className="error">{errors.date?.message}</div>

          <Select
            label="Country: "
            {...register('type', { required: 'Choose a country' })}
            name="type"
          />
          <div className="error">{errors.type?.message}</div>
          <div className="wrapper_input">
            <label htmlFor="notifications-switch">Notifications</label>
            <input
              {...register('notification', { required: 'Notifications is required' })}
              id="notifications-switch"
              type="checkbox"
              name="notification"
              value="Ok"
            />
          </div>
          <div className="error">{errors.notification?.message}</div>
          <div className="wrapper_input">
            <label>Gender:</label>
            <div>
              <input
                {...register('gender', { required: 'Choose a gender' })}
                id="gender1"
                type="radio"
                name="gender"
                value="male"
              />
              <label htmlFor="gender1">Male</label>
            </div>
            <div>
              <input
                {...register('gender', { required: 'Choose a gender' })}
                id="gender2"
                type="radio"
                name="gender"
                value="female"
              />
              <label htmlFor="gender2">Female</label>
            </div>
          </div>
          <div className="error">{errors.gender?.message}</div>

          <div>
            <div className="wrapper_input">
              <label htmlFor="profile-picture-input">Profile picture</label>
              <input
                {...register('profilePicture', { required: 'Choose a foto' })}
                id="profile-picture-input"
                type="file"
                name="profilePicture"
                accept="image/*"
              />
            </div>
            <div className="error">{errors.profilePicture?.message}</div>
          </div>
          <button className="button_submit_form" type="submit">
            Submit
          </button>
        </div>
      </form>

      {formData.map((el, i) => (
        <SubData key={`${i}`} answer={el} />
      ))}
    </>
  );
}

export default Form;
