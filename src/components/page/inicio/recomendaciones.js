import React, { useState, useEffect } from 'react';
import LoremIpsum from 'react-lorem-ipsum';
import data from '../../../Data2';
import axios from 'axios';

export default function Recomendaciones() {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=23');
        const usersWithStars = response.data.results.map(user => ({
          ...user,
          randomStarCount: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
          loremIpsumText: generateLoremIpsum(),
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

  const generateLoremIpsum = () => {
    // Use the react-lorem-ipsum function to generate Lorem Ipsum text
    return LoremIpsum({
      p: 1,  // Number of paragraphs
      avgWordsPerSentence: 7,  // Average words per sentence
    });
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

  const goToPreviousPage = () => {
    setCurrentIndex(Math.max(0, currentIndex - 9));
  };

  const goToNextPage = () => {
    setCurrentIndex(Math.min(currentIndex + 9, userList.length - 1));
  };

  return (
    <>
      <h1 className="produ">RECOMENDACIONES</h1>
      <div className="pagination-buttons">
        <button onClick={goToPreviousPage} disabled={currentIndex === 0}>
          Página Anterior 
        </button>
        <button onClick={goToNextPage} disabled={currentIndex + 10 >= userList.length}>
          Página Siguiente
        </button>
      </div>
      
      <div className='recomendaciones'>
        {userList.slice(currentIndex, currentIndex + 10).map((userData, index) => (
          <div key={index} className='recomendacion'>
            <div className='imagenes-container'>
              <img className='UserProfile' src={userData.picture.large} alt={`User ${index + 1}`} />
              <img className='Sneaker' src={randomImages[currentIndex + index]} alt={`Random Image ${index + 1}`} style={{ maxWidth: '50%' }} />
            </div>
            <p><b>Nombre:</b> {`${userData.name.first} ${userData.name.last}`}</p>
            <p><b>Correo:</b>  {userData.email}</p>
            <p><b>Ubicación:</b>  {`${userData.location.city}, ${userData.location.country}`}</p>
            <p><b>Opinión:</b> {userData.loremIpsumText}</p>
            <div className='stars-container'>
              {renderStars(5, currentIndex + index)}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={goToPreviousPage} disabled={currentIndex === 0}>
          Página Anterior 
        </button>
        <button onClick={goToNextPage} disabled={currentIndex + 10 >= userList.length}>
          Página Siguiente
        </button>
      </div>
    </>
  );
}