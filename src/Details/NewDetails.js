import React from 'react';
import Input from '../shared/FormElement/Input';
import { VALIDATOR_REQUIRE } from './components/util/validator';
import './NewDetails.css';
import Button from '../shared/FormElement/Button';

import { useForm } from './components/formhooks/form-hook';

const NewDetails = () => {

const [formState,inputHandler] = useForm({
  place: { value: "", isValid: false },
        address: { value: "", isValid: false },
        contact: { value: "", isValid: false },
        message:{value:"",isValid:false}
})
  
 
 


  const detailsSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);  // ✅ now you will get place, address, contact values properly
  };

  return (
    <form className="place-form" onSubmit={detailsSubmitHandler}>
      <Input
        id="place"
        element="input"
        type="text"
        label="Place"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid place"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
      />
      <Input
        id="contact"
        element="input"
        type="text"
        label="Contact"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid contact"
        onInput={inputHandler}
      />
      <Input
      id="message"
      element="input"
      type="text"
      label="Message"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid contact"
      onInput={inputHandler}
    />
      <Button type="submit" disabled={!formState.isValid}>
        ADD DETAILS
      </Button>
    </form>
  );
}

export default NewDetails;
