import React from 'react';
import { useParams } from 'react-router-dom';

import DetailsList from './components/DetailsList';


  const USERS = [
    {
      id:'p1',
      place:"Coimbatore",
      message:"Suddenly get fire accident our area",
      address:"Near By Thondamuthur",
      image:"https://ijournal.iseindia.in/wp-content/uploads/2020/04/Fire-Accident-in-India-846x515.jpg",
      contact:"7603964515",
      creator:"u1"
    },
    {
      id:"p2",
      place:"Chennai",
      message:"Suddenly get fire accident our area",
      image:"https://b3673829.smushcdn.com/3673829/wp-content/uploads/2024/04/causes-of-fire-incidents-0-1024x683-1.webp?lossy=2&strip=1&webp=1",
      address:"Near By vellore",
      contact:"6238612757",
      creator:"u2"
    },
    {
      id:"p3",
      place:"Errutupalam",
      message:"Suddenly get fire accident our area",
      image:"https://b3673829.smushcdn.com/3673829/wp-content/uploads/2024/04/causes-of-fire-incidents-0-1024x683-1.webp?lossy=2&strip=1&webp=1",
      address:"Near By Isha",
      contact:"7826263622",
      creator:"u3"
    }
  ]
 
const UserDetails = () =>{
  const userId = useParams().userId;
  const loadedDetails = USERS.filter(det => det.creator === userId);
     return(
      <DetailsList items={loadedDetails}/>
     )
}

export default UserDetails;