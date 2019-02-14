import React, { Component, Fragment } from 'react';
import { FormValidation } from 'calidation';

const config = {
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

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = ({ errors, fields, isValid }) => {
    if (isValid) {
      fetch(`${process.env.REACT_APP_DOMAIN}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.userData.user_id && data.token) {
            this.props.loadUser(data.userData, data.token);
            this.props.onRouteChange('home');
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <FormValidation
            config={config}
            onSubmit={this.onSubmitSignIn}
            className="measure"
          >
            {({ errors, submitted }) => (
              <Fragment>
                <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                  <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
                    value="Sign in"
                  />
                </div>
                <div className="lh-copy mt3">
                  <p
                    className="f6 link dim black db pointer"
                    onClick={() => onRouteChange('register')}
                  >
                    Register
                  </p>
                </div>
              </Fragment>
            )}
          </FormValidation>
        </main>
      </article>
    );
  }
}

export default Signin;
