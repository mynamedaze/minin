import React from 'react';
import './Auth.scss';
import Button from "../../components/UI/Button/Button";

class Auth extends React.Component {

  loginHandler = () => {

  };

  registerHandler = () => {

  };

  submitHandler = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="auth">
        <div>
          <h1>Auth</h1>

          <form className="auth-form"
                onSubmit={this.submitHandler}
          >
            <input type="text"/>
            <input type="text"/>

            <Button
              type={'success'}
              onClick={this.loginHandler}
            >Войти</Button>
            <Button
              type={'primary'}
              onClick={this.registerHandler}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;