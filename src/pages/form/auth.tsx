// import React, { ChangeEvent, useState, useRef } from 'react';
// import './form.css';

// interface FormData {
//   name: string;
//   zipCode: string;
//   birthday: string;
//   country: string;
//   gender: string;
//   notifications: boolean;
//   profilePicture: File | null;
//   profilePictureUrl: string | null;
// }

// interface FormError {
//   field: keyof FormData;
//   message: string;
// }

// const Auth: React.FC = () => {
//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     zipCode: '',
//     birthday: '',
//     country: '',
//     gender: '',
//     notifications: false,
//     profilePicture: null,
//     profilePictureUrl: '',
//   });

//   const [formErrors, setFormErrors] = useState<FormError[]>([]);

//   const [submittedData, setSubmittedData] = useState<FormData[]>([]);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value, type } = event.target;
//     if (type === 'checkbox') {
//       const { checked } = event.target as HTMLInputElement;
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         profilePicture: file,
//         profilePictureUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
//     event.preventDefault();

//     const errors: FormError[] = [];

//     if (!formData.name) {
//       errors.push({ field: 'name', message: 'Name is required' });
//     }
//     if (formData.zipCode.trim() === '') {
//       errors.push({ field: 'zipCode', message: 'ZipCode is required' });
//     }
//     if (!formData.birthday) {
//       errors.push({ field: 'birthday', message: 'Birthday is required' });
//     }
//     if (!formData.country) {
//       errors.push({ field: 'country', message: 'Country is required' });
//     }
//     if (!formData.gender) {
//       errors.push({ field: 'gender', message: 'Gender is required' });
//     }
//     if (!formData.notifications) {
//       errors.push({ field: 'notifications', message: 'Notifications is required' });
//     }
//     if (!formData.profilePicture) {
//       errors.push({ field: 'profilePicture', message: 'Foto is required' });
//     }

//     const nameRegex = /^[A-Z].*/;
//     if (formData.name && !nameRegex.test(formData.name)) {
//       errors.push({ field: 'name', message: 'Name should start with an uppercased letter' });
//     }

//     if (errors.length === 0) {
//       const profilePictureUrl =
//         formData.profilePicture && URL.createObjectURL(formData.profilePicture);
//       setSubmittedData((prevSubmittedData) => [
//         ...prevSubmittedData,
//         { ...formData, profilePictureUrl },
//       ]);
//       setFormErrors([]);
//       setFormData({
//         name: '',
//         zipCode: '',
//         birthday: '',
//         country: '',
//         gender: '',
//         notifications: false,
//         profilePicture: null,
//         profilePictureUrl: '',
//       });
//     } else {
//       setFormErrors(errors);
//     }
//     const formElement = event.currentTarget;
//     formElement.reset();
//   };
//   return (
//     <div>
//       <form
//         data-testid="auth-component"
//         className="form_auth"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <div className="wrapper_form">
//           <div className="wrapper_input">
//             <label htmlFor="name-input">Name:</label>
//             <input
//               id="name-input"
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="error">{formErrors.find((error) => error.field === 'name')?.message}</div>
//           <div className="wrapper_input">
//             <label htmlFor="zip-code-input">Zip Code:</label>
//             <input
//               id="zip-code-input"
//               type="text"
//               name="zipCode"
//               value={formData.zipCode}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'zipCode')?.message}
//           </div>
//           <div className="wrapper_input">
//             <label htmlFor="birthday-input">Birthday:</label>
//             <input
//               id="birthday-input"
//               type="date"
//               name="birthday"
//               value={formData.birthday}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'birthday')?.message}
//           </div>
//           <div className="wrapper_input">
//             <label htmlFor="country-select">Country:</label>
//             <select
//               id="country-select"
//               name="country"
//               value={formData.country}
//               onChange={handleInputChange}
//             >
//               <option value="">Select a country</option>
//               <option value="USA">USA</option>
//               <option value="Canada">Canada</option>
//               <option value="Mexico">Mexico</option>
//             </select>
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'country')?.message}
//           </div>
//           <div className="wrapper_input">
//             <label>Gender:</label>
//             <div>
//               <input
//                 id="gender1"
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 checked={formData.gender === 'male'}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="gender1">Male</label>
//             </div>
//             <div>
//               <input
//                 id="gender2"
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 checked={formData.gender === 'female'}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="gender2">Female</label>
//             </div>
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'gender')?.message}
//           </div>
//           <div className="wrapper_input">
//             <label htmlFor="notifications-switch">Notifications</label>
//             <input
//               id="notifications-switch"
//               type="checkbox"
//               name="notifications"
//               checked={formData.notifications}
//               onChange={handleInputChange}
//               ref={checkboxRef}
//             />
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'notifications')?.message}
//           </div>
//           <div className="wrapper_input">
//             <label htmlFor="profile-picture-input">Profile picture</label>
//             <input
//               id="profile-picture-input"
//               type="file"
//               name="profilePicture"
//               accept="image/*"
//               onChange={handleProfilePictureChange}
//             />
//           </div>
//           <div className="error">
//             {formErrors.find((error) => error.field === 'profilePicture')?.message}
//           </div>
//           <button className="button_submit_form" type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//       {submittedData.length > 0 && (
//         <div data-testid="submitted_data">
//           <div className="card-list">
//             {submittedData.map((data, index) => (
//               <div className="card_submited" key={index}>
//                 {submittedData.length > 0 &&
//                   submittedData[submittedData.length - 1].profilePictureUrl && (
//                     <img
//                       src={submittedData[submittedData.length - 1].profilePictureUrl?.toString()}
//                       alt="Profile"
//                       className="profile-picture"
//                     />
//                   )}
//                 <div className="card_added">
//                   <span>Name: {data.name}</span>
//                 </div>
//                 <div className="card_added">
//                   <span>Zip Code: {data.zipCode}</span>
//                 </div>
//                 <div className="card_added">
//                   <span>Birthday: {data.birthday}</span>
//                 </div>
//                 <div className="card_added">
//                   <span>Country: {data.country}</span>
//                 </div>
//                 <div className="card_added">
//                   <span>Gender: {data.gender}</span>
//                 </div>
//                 <div className="card_added">
//                   <span>Notifications: {data.notifications ? 'Yes' : 'No'}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;

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
