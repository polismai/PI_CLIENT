import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MiniNavbar from '../../components/miniNavbar/MiniNavbar';

import style from './Detail.module.css';

const Detail = () => {
  const params = useParams();
  const id = params.id;

  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchDetail = async () => {
      const { data: { videogameDetail }} = await axios.get(`http://localhost:3001/videogames/${id}`);  
      setDetail(videogameDetail)
    };

    fetchDetail();
  }, [id]);

  if (detail) {
    return (
      <div>
        <MiniNavbar />
        <div className={style.card}>
          <div className={style.card_description}> 
          {detail.name && <h2>{detail.name}</h2> }
          {detail.platforms && <p>Plataformas: {detail.platforms.map(({ name }, i) => {
            return (
              <p key={i}>{name}</p>
            )
          })}</p>} 
          {detail.description && <p>Descripcion: {detail.description}</p>}
          {detail.rating && <p>Rating: {detail.rating}</p>}
          {detail.genres && <p>Generos: {detail.genres.map(({ name }, i) => {
            return (
             <p key={i}>{name}</p>
            )
          })}</p>}
          {detail.released && <p>Fecha de lanzamiento: {detail.released}</p>}
          </div>
          {detail.background_image && (
          <div className={style.card_image}>
            <img src={detail.background_image} alt={detail.name} />
          </div>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>Cargando...</div>
    )
  }
};

export default Detail;