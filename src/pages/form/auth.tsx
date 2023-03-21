import React from 'react';
import './form.css';

// eslint-disable-next-line @typescript-eslint/ban-types
type FormProps = {};

class Auth extends React.Component<FormProps> {
  private nameInputRef = React.createRef<HTMLInputElement>();
  private zipCodeInputRef = React.createRef<HTMLInputElement>();
  private birthdayInputRef = React.createRef<HTMLInputElement>();
  private countrySelectRef = React.createRef<HTMLSelectElement>();
  private genderRadioRefs = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];
  private notificationsSwitchRef = React.createRef<HTMLInputElement>();
  private profilePictureInputRef = React.createRef<HTMLInputElement>();

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name: this.nameInputRef.current?.value ?? '',
      zipCode: this.zipCodeInputRef.current?.value ?? '',
      birthday: this.birthdayInputRef.current?.value ?? '',
      country: this.countrySelectRef.current?.value ?? '',
      gender: this.genderRadioRefs.find((ref) => ref.current?.checked)?.current?.value ?? '',
      notifications: this.notificationsSwitchRef.current?.checked ?? false,
      profilePicture: this.profilePictureInputRef.current?.files?.[0] ?? null,
    };

    console.log(formData);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="wrapper_form">
          <div className="wrapper_input">
            <label htmlFor="name-input">Name:</label>
            <input id="name-input" type="text" ref={this.nameInputRef} />
          </div>
          <div className="wrapper_input">
            <label htmlFor="zip-code-input">Zip Code:</label>
            <input id="zip-code-input" type="text" ref={this.zipCodeInputRef} />
          </div>
          <div className="wrapper_input">
            <label htmlFor="birthday-input">Birthday:</label>
            <input id="birthday-input" type="date" ref={this.birthdayInputRef} />
          </div>
          <div className="wrapper_input">
            <label htmlFor="country-select">Country:</label>
            <select id="country-select" ref={this.countrySelectRef}>
              <option value="spain">SPAIN</option>
              <option value="germany">GERMANY</option>
              <option value="ucraine">UCRAINE</option>
            </select>
          </div>
          <div className="wrapper_input">
            <label>Gender:</label>
            <div>
              <input
                id="gender1"
                type="radio"
                name="gender"
                value="male"
                ref={this.genderRadioRefs[0]}
              />
              <label htmlFor="gender1">Male</label>
            </div>
            <div>
              <input
                id="gender2"
                type="radio"
                name="gender"
                value="female"
                ref={this.genderRadioRefs[1]}
              />
              <label htmlFor="gender2">Female</label>
            </div>
          </div>
          <div className="wrapper_input">
            <label htmlFor="notifications-switch">Notifications:</label>
            <input
              id="notifications-switch"
              className="notifications-switch"
              type="checkbox"
              ref={this.notificationsSwitchRef}
            />
          </div>
          <div className="wrapper_input">
            <label htmlFor="profile-picture-input">Profile Picture:</label>
            <input
              id="profile-picture-input"
              className="profile-picture-input"
              type="file"
              accept="image/*"
              ref={this.profilePictureInputRef}
            />
          </div>
          <button className="button_submit_form" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
export default Auth;
