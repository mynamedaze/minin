import React from 'react';
import './Auth.scss';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from 'axios';

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Эл. почта',
        id: 'email-field',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        id: 'password-field',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf6NAyEvYn5frWs6TTbLagcttrYQQHJ3s', authData);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf6NAyEvYn5frWs6TTbLagcttrYQQHJ3s', authData);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  submitHandler = event => {
    event.preventDefault();
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = value.match(/.+@.+\..+/i);
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}`, event.target.value);

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid
    });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          id={control.id}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    });
  };

  render() {
    return (
      <div className="auth">
        <div>
          <h1>Auth</h1>

          <form className="auth-form"
                onSubmit={this.submitHandler}
          >
            {this.renderInputs()}

            <Button
              type={'success'}
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти</Button>
            <Button
              type={'primary'}
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;