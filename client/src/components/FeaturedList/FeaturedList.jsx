import React, { useState, useEffect } from 'react'
import "./featuredList.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getRatingColor = (ratingValue) => {
  if (ratingValue >= 1 && ratingValue <= 2) {
    return 'red';
  } else if (ratingValue === 3) {
    return 'yellow';
  } else if (ratingValue >= 4 && ratingValue <= 5) {
    return 'green';
  } else {
    return 'blue';
  }
};

const Item = (props) => {
  const navigate = useNavigate();

  const handleMove = () => {
    navigate("/explore");
  }

  return (
    <div onClick={handleMove} className="fpItem">
      <img
        src={props.image[0]}
        alt="img"
        className="fpImg"
      />
      <span className="fpName">{props.name}</span>
      <span className="fpCity">
        {props.city.charAt(0).toUpperCase() + props.city.slice(1)}
      </span>
      <span className="fpPrice">Available ₹{props.rentalPrice}</span>
      <div className="fpRating">
        <button style={{ backgroundColor: getRatingColor(props.rating) }}>{props.rating}</button>
        <span>{props.review}</span>
      </div>
    </div>
  );
};

const FeaturedList = () => {
  const [randItem, setrandItem] = useState([]);

  const getRandom = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.get('http://localhost:8000/api/v1/inventory/get-random',
        config
      );
      setrandItem(data.randomItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRandom();
  }, [])

  return (
    <div className="fp">
      {randItem.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </div>
  );
};

export default FeaturedList;
