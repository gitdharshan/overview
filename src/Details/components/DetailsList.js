import React from 'react';
import DetailsItem from './DetailsItem';
import './DetailsList.css';

const DetailsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No details found.</h2>
      </div>
    );
  }

  return (
    <ul className="details-list">
      {props.items.map(detail => (
        <DetailsItem
          key={detail.id}
          id={detail.id} // ✅ VERY IMPORTANT
          place={detail.place}
          address={detail.address}
          image={detail.image}
          contact={detail.contact}
          message={detail.message}
        />
      ))}
    </ul>
  );
};

export default DetailsList;
