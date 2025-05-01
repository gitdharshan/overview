import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Input from '../shared/FormElement/Input';
import { VALIDATOR_REQUIRE } from './components/util/validator';
import Button from '../shared/FormElement/Button';
import { useForm } from './components/formhooks/form-hook';
import './NewDetails.css';

const USERS = [
  {
    id: 'p1',
    place: "Coimbatore",
    message: "Suddenly get fire accident our area",
    address: "Near By Thondamuthur",
    image: "https://ijournal.iseindia.in/wp-content/uploads/2020/04/Fire-Accident-in-India-846x515.jpg",
    contact: "7603964515",
    creator: "u1"
  },
  {
    id: "p2",
    place: "Chennai",
    message: "Suddenly get fire accident our area",
    image: "https://b3673829.smushcdn.com/3673829/wp-content/uploads/2024/04/causes-of-fire-incidents-0-1024x683-1.webp?lossy=2&strip=1&webp=1",
    address: "Near By vellore",
    contact: "6238612757",
    creator: "u2"
  }
];

const EditDetails = () => {
  const detailsId = useParams().detailsId;
 

  const [formState, inputHandler,setFormData] = useForm({
    place: {
      value: '',
      isValid: true
    },
    address: {
      value: '',
      isValid: true
    }
  }, true);

  const identifiedDetail = USERS.find(p => p.id === detailsId);


  useEffect(() =>{
    setFormData({
      place:{
        value:identifiedDetail.place,
        isValid:true
      },
      address:{
        value:identifiedDetail.address,
        isValid:true
      }
    },true);
  },[setFormData,identifiedDetail])

  if (!identifiedDetail) {
    return (
      <div className='center'>
        <h2>Could not find details</h2>
      </div>
    );
  }

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log("Submitted Data:", formState.inputs);

  };

  if(!formState.inputs.place.value){
    return(
      <div className='center'>
        <h2>Loading....</h2>
      </div>
    )
  }

  return (
   

    <form className='place-form' onSubmit={formSubmitHandler}>
      <Input
        id="place"
        label="Place"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid place"
        onInput={inputHandler}
        initialValue={formState.inputs.place.value}
        initialValid={formState.inputs.place.isValid}
      />
      <Input
        id="address"
        label="Address"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Button type="submit">
        SUBMIT
      </Button>
    </form>
   
  );
};

export default EditDetails;
