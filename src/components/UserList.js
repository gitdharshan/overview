import React from 'react';
import UserItem from './UserItem';
import './UserList.css';
import Card from '../shared/components/UIElements/Card';

const UserList =(props) =>{
  if(props.items.length === 0){
    return(
      <Card className='center'>
        <h2>No users found...</h2>
      </Card>
    )
  }

  return(
    <ul className='users-list'>
    {props.items.map(user =>(
   <UserItem 
    key={user.id}
    id={user.id}
    name={user.name}
    image={user.image}
    details={user.details}
   
   />
    ))}
    </ul>
  )
}

export default UserList;