import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/FormElement/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { useNavigate } from 'react-router-dom';
import './DetailsItem.css';

const DetailsItem = (props) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/details/${id}`);  
  };

  return (
    <React.Fragment>
      <Modal 
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      />
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={props.image} alt={props.place}/>
          </div>
          <div className='place-item__info'>
            <h2>{props.place}</h2>
            <h3>{props.address}</h3>
            <p>{props.contact}</p>
            <p>{props.message}</p>
          </div>
          <div className='place-item__actions'>
            <Button onClick={() => handleEdit(props.id)}>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default DetailsItem;
