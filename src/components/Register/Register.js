import React, { Component, Fragment } from 'react';
import { FormValidation } from 'calidation';

const config = {
  name: {
    isRequired: 'Your name is required',
    isMinLength: {
      message: 'Your name must at least be 2 characters long',
      length: 2
    },
    isMaxLength: {
      message: 'Your name can at most have 50 characters',
      length: 50,
    }
  },
  email: {
    isRequired: 'Email address is required',
    isEmail: 'Please enter a valid email'
  },
  password: {
    isRequired: 'Password is also required',
    isMinLength: {
      message: 'Password must at least be 8 characters long',
      length: 8
    }
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = ({ errors, fields, isValid }) => {
    if (isValid) {
      fetch(`${process.env.REACT_APP_DOMAIN}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      }).then(res => {
        if (res.status === 200) {
          this.props.onRouteChange('signin');
        }
      });
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <FormValidation
            config={config}
            onSubmit={this.onSubmitRegister}
            className="measure"
          >
            {({ errors, submitted }) => (
              <Fragment>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f2 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.onNameChange}
                    />
                    {submitted && errors.name && (
                      <span className="dark-red fw6">{errors.name}</span>
                    )}
                  </div>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="email"
                      name="email"
                      id="email"
                      onChange={this.onEmailChange}
                    />
                    {submitted && errors.email && (
                      <span className="dark-red fw6">{errors.email}</span>
                    )}
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.onPasswordChange}
                    />
                    {submitted && errors.password && (
                      <span className="dark-red fw6">{errors.password}</span>
                    )}
                  </div>
                </fieldset>
                <div>
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Register"
                  />
                </div>
              </Fragment>
            )}
          </FormValidation>
        </main>
      </article>
    );
  }
}

export default Register;
