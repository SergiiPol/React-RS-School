import React from 'react';
import './form.css';
import { FormProps, FormState } from '../../interface';

class Auth extends React.Component<FormProps, FormState> {
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

  state: FormState = {
    submissions: [],
    name: '',
    zipCode: '',
    birthday: '',
    country: '',
    gender: '',
    notifications: false,
    profilePicture: null,
    profilePictureUrl: '',
    errors: {},
  };
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
      profilePictureUrl: '',
    };
    const errors: Record<string, string> = {};
    if (formData.name.trim() === '') {
      errors.name = 'Name is required';
    } else if (!/^[A-Z]/.test(formData.name)) {
      errors.name = 'Name must start with an uppercase letter';
    }

    if (formData.zipCode.trim() === '') {
      errors.zipCode = 'Zip code is required';
    }

    if (formData.birthday.trim() === '') {
      errors.birthday = 'Birthday is required';
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }

    if (formData.country.trim() === '') {
      errors.country = 'Country is required';
    }

    if (!formData.notifications) {
      errors.notifications = 'Notifications is required';
    }

    if (!formData.profilePicture) {
      errors.profilePicture = 'Profile picture is required';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });

    this.setState({ ...formData });

    if (formData.profilePicture) {
      const profilePictureUrl = URL.createObjectURL(formData.profilePicture);
      this.setState({ profilePictureUrl });
    }

    this.setState((prevState) => ({
      submissions: [...prevState.submissions, formData],
      name: '',
      zipCode: '',
      birthday: '',
      country: '',
      gender: '',
      notifications: false,
      profilePicture: null,
      profilePictureUrl: '',
    }));
    const formElement = event.currentTarget;
    formElement.reset();
  };
  renderError = (fieldName: string) => {
    const { errors } = this.state;
    if (errors[fieldName]) {
      return <div className="error">{errors[fieldName]}</div>;
    }
  };
  renderCards = () => {
    const { submissions } = this.state;

    return (
      <div className="card-list">
        {submissions.map((submission, index) => (
          <div className="wrapper_one_subbmissionCard" key={index}>
            <div className="confirmation">Form data saved for {submission.name}</div>

            <div className="card_added">
              <span>Name:</span> {submission.name}
            </div>
            <div className="card_added">
              <span>Zip code:</span> {submission.zipCode}
            </div>
            <div className="card_added">
              <span>Birthday:</span> {submission.birthday}
            </div>
            <div className="card_added">
              <span>Country:</span> {submission.country}
            </div>
            <div className="card_added">
              <span>Gender:</span> {submission.gender}
            </div>
          </div>
        ))}
      </div>
    );
  };
  render() {
    return (
      <form data-testid="auth-component" className="form_auth" onSubmit={this.handleSubmit}>
        <div className="wrapper_form">
          <div className="wrapper_input">
            <label htmlFor="name-input">Name:</label>
            <input id="name-input" type="text" ref={this.nameInputRef} />
          </div>
          {this.renderError('name')}
          <div className="wrapper_input">
            <label htmlFor="zip-code-input">Zip Code:</label>
            <input id="zip-code-input" type="text" ref={this.zipCodeInputRef} />
          </div>
          {this.renderError('zipCode')}
          <div className="wrapper_input">
            <label htmlFor="birthday-input">Birthday:</label>
            <input id="birthday-input" type="date" ref={this.birthdayInputRef} />
          </div>
          {this.renderError('birthday')}
          <div className="wrapper_input">
            <label htmlFor="country-select">Country:</label>
            <select id="country-select" ref={this.countrySelectRef}>
              <option value="">--Please choose a country--</option>
              <option value="spain">SPAIN</option>
              <option value="germany">GERMANY</option>
              <option value="ucraine">UCRAINE</option>
            </select>
          </div>
          {this.renderError('country')}
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
          {this.renderError('gender')}
          <div className="wrapper_input">
            <label htmlFor="notifications-switch">Notifications:</label>
            <input
              id="notifications-switch"
              className="notifications-switch"
              type="checkbox"
              ref={this.notificationsSwitchRef}
            />
          </div>
          {this.renderError('notifications')}
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
          {this.renderError('profilePicture')}
          <button className="button_submit_form" type="submit">
            Submit
          </button>
        </div>
        {this.renderCards()}
      </form>
    );
  }
}
export default Auth;
