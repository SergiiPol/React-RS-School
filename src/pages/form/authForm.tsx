// import Auth from './authClass';
// import { FormState } from 'interface';
// import { Component } from 'react';

// export class AuthForm extends Component<FormState> {
//   render(): JSX.Element {
//     return (
//       <form data-testid="auth-component" className="form_auth" onSubmit={this.andleSubmit}>
//         <div className="wrapper_form">
//           <div className="wrapper_input">
//             <label htmlFor="name-input">Name:</label>
//             <input id="name-input" type="text" ref={this.nameInputRef} />
//           </div>
//           {this.renderError('name')}
//           <div className="wrapper_input">
//             <label htmlFor="zip-code-input">Zip Code:</label>
//             <input id="zip-code-input" type="text" ref={this.zipCodeInputRef} />
//           </div>
//           {this.renderError('zipCode')}
//           <div className="wrapper_input">
//             <label htmlFor="birthday-input">Birthday:</label>
//             <input id="birthday-input" type="date" ref={this.birthdayInputRef} />
//           </div>
//           {this.renderError('birthday')}
//           <div className="wrapper_input">
//             <label htmlFor="country-select">Country:</label>
//             <select id="country-select" ref={this.countrySelectRef}>
//               <option value="spain">SPAIN</option>
//               <option value="germany">GERMANY</option>
//               <option value="ucraine">UCRAINE</option>
//             </select>
//           </div>
//           <div className="wrapper_input">
//             <label>Gender:</label>
//             <div>
//               <input
//                 id="gender1"
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 ref={this.genderRadioRefs[0]}
//               />
//               <label htmlFor="gender1">Male</label>
//             </div>
//             <div>
//               <input
//                 id="gender2"
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 ref={this.genderRadioRefs[1]}
//               />
//               <label htmlFor="gender2">Female</label>
//             </div>
//           </div>
//           {this.renderError('gender')}
//           <div className="wrapper_input">
//             <label htmlFor="notifications-switch">Notifications:</label>
//             <input
//               id="notifications-switch"
//               className="notifications-switch"
//               type="checkbox"
//               ref={this.notificationsSwitchRef}
//             />
//           </div>
//           {this.renderError('notifications')}
//           <div className="wrapper_input">
//             <label htmlFor="profile-picture-input">Profile Picture:</label>
//             <input
//               id="profile-picture-input"
//               className="profile-picture-input"
//               type="file"
//               accept="image/*"
//               ref={this.profilePictureInputRef}
//             />
//           </div>
//           <button className="button_submit_form" type="submit">
//             Submit
//           </button>
//         </div>
//         {this.renderCards()}
//       </form>
//     );
//   }
// }

// export default AuthForm;
