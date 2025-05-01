import React from 'react';

import UserList from '../components/UserList';

const Users =() =>{

  const USERS = [
    {
      id:'u1',
      name:"Dharshan",
      image:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
      details:3
    },
    {
      id:'u2',
       name:"Surya",
       image:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
       details:4
    },{
      id:'u3',
      name:"Karthik",
      image:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
      details:4
    } 
  ];
  return <UserList  items={USERS}/>
}

export default Users;