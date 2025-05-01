import React, { useState, useContext } from 'react';
import Card from '../shared/components/UIElements/Card';
import Input from '../shared/FormElement/Input';
import Button from '../shared/FormElement/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../Details/components/util/validator'; 
import { useForm } from '../Details/components/formhooks/form-hook';
import { AuthContext } from '../context/auth-context';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false);

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    } else {
      const { name, ...restInputs } = formState.inputs;
      setFormData(
        restInputs,
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const handler = event => {
    event.preventDefault();
    console.log('Submitted data:', formState.inputs);
    auth.login(); // Log the user in
  };

  return (
    <Card>
      <h2>{isLoginMode ? 'Login Required' : 'Signup Now'}</h2>
      <hr />
      <form onSubmit={handler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (min. 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
