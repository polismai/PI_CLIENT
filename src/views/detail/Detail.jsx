import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MiniNavbar from '../../components/miniNavbar/MiniNavbar';

import style from './Detail.module.css';

const Detail = () => {

  const { id } = useParams();
  
  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchDetail = async () => {
      const { data: { videogameDetail }} = await axios.get(`http://localhost:3001/videogames/${id}`);
      if ({ videogameDetail }) {
        setDetail(videogameDetail)
      } else {
        window.alert('No hay videojuegos con ese ID');
      }
    };
    fetchDetail();
    setDetail();
  }, [id]);

  if (detail) {
    return (
      <>
        <MiniNavbar />
        <div className={style.card}>
          <div className="card_image">
            {detail.background_image && (
              <img src={detail.background_image} alt={detail.name} />
            )}
          </div>
          <div className={style.card_description}> 
            {detail.name && <h2>{detail.name}</h2> }
            <div className="section-container">
            {detail.platforms && <p>Plataformas: {detail.platforms.map(({ name }, i) => {
              return (
                <span key={i}>{name}</span>
              )
            })}</p>} 
            </div>
            <div className="section-container">
            {detail.description && <p>Descripcion: {detail.description}</p>}
            </div>
            <div className="section-container">
            {detail.rating && <p>Rating: {detail.rating}</p>}
            </div>
            <div className="section-container">
            {detail.genres && <p>Generos: {detail.genres.map(({ name }, i) => {
              return (
                <span key={i}>{name}</span>
              )
            })}</p>}
            </div>
            <div className="section-container">
              {detail.released && <p>Fecha de lanzamiento: {detail.released}</p>}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div>Cargando...</div>
    )
  }
};

export default Detail;