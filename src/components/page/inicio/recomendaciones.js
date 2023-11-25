import React, { useState, useEffect } from 'react';
import data from '../../../Data2';
import axios from 'axios';

export default function Recomendaciones() {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);

  // Conjunto de frases aleatorias
  const randomOpinions = [
    "Estas zapatillas son increíbles, las recomiendo totalmente.",
    "Nunca antes había tenido unas zapatillas tan cómodas como estas.",
    "El diseño de estas zapatillas es simplemente asombroso, ¡me encantan!",
    "¡No puedo creer lo bien que se sienten estas zapatillas al caminar!",
    "Son perfectas para cualquier ocasión, definitivamente valen la pena.",
    "Me sorprendió la durabilidad y calidad de estas zapatillas, son geniales.",
    "Estoy muy contento con mi compra, estas zapatillas superaron mis expectativas.",
    "Cada paso con estas zapatillas es como caminar sobre nubes, muy cómodas.",
    "El estilo y la funcionalidad se combinan perfectamente en estas zapatillas.",
    "Recomiendo estas zapatillas a cualquiera que busque comodidad y calidad.",
    "Estas zapatillas ofrecen un ajuste perfecto y gran comodidad.",
    "La calidad de construcción de estas zapatillas es impresionante.",
    "¡Me encanta la versatilidad y el estilo único de estas zapatillas!",
    "Las zapatillas son ideales para largas caminatas, son muy cómodas.",
    "Estoy sorprendido por lo ligeras que son estas zapatillas, ¡increíble!",
    "El diseño innovador de estas zapatillas destaca a primera vista.",
    "Las mejores zapatillas que he tenido, son duraderas y funcionales.",
    "Estas zapatillas elevan mi rendimiento en cada actividad deportiva.",
    "Son perfectas para cualquier clima, mantienen mis pies secos siempre.",
    "Recomendaría estas zapatillas a todos, son simplemente extraordinarias."
  ];

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=23');
        const usersWithStars = response.data.results.map(user => ({
          ...user,
          randomStarCount: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
          randomOpinion: randomOpinions[Math.floor(Math.random() * randomOpinions.length)]
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
            <p><b>Opinión:</b> {userData.randomOpinion}</p>
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
