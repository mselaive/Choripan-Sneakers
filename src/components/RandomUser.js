import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../Data2';
// ... (importaciones y código anterior)

export const RandomUser = () => {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=9');
        const usersWithStars = response.data.results.map(user => ({
          ...user,
          randomStarCount: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
        }));
        setUserList(usersWithStars);
      } catch (error) {
        console.error('Error fetching random users:', error);
      }
    };

    fetchRandomUsers();
  }, []);

  useEffect(() => {
    const randomImagesData = userList.map(() => {
      const randomIndex = Math.floor(Math.random() * data.items.length);
      return data.items[randomIndex].image;
    });

    setRandomImages(randomImagesData);
  }, [userList]);

  const showNextUsers = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % userList.length);
  };

  const showPreviousUsers = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + userList.length) % userList.length);
  };

  const renderStars = (count, userIndex) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <box-icon
          key={i}
          name='star'
          type={i < userList[userIndex].randomStarCount ? 'solid' : 'regular'}
        />
      );
    }
    return stars;
  };

  return (
    <div className='random-user-container'>
      <div className='button-container'>
        <box-icon onClick={showPreviousUsers} name="left-arrow" type="solid" />
      </div>
      <div className='usuarios'>
        {userList.slice(currentIndex, currentIndex + 3).map((userData, index) => (
          <div key={index} className='usuario'>
            <div className='imagenes-container  '>
              <img className='UserProfile' src={userData.picture.large} alt={`User ${index + 1}`} />
              <img src={randomImages[currentIndex + index]} alt={`Random Image ${index + 1}`} style={{ maxWidth: '50%' }} />
            </div>
            <p>Nombre: {`${userData.name.first} ${userData.name.last}`}</p>
            <p>Email: {userData.email}</p>
            <p>Locación : {`${userData.location.city}, ${userData.location.country}`}</p>
            <div className='stars-container'>
              {renderStars(5, currentIndex + index)}
            </div>
          </div>
        ))}
      </div>
      <div className='button-container'>
        <box-icon onClick={showNextUsers} name="right-arrow" type="solid" />
      </div>
    </div>
  );
};
