import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, cleanDetail } from '../../redux/actions';
import MiniNavbar from '../../components/miniNavbar/MiniNavbar';
import Loader from '../../components/loader/Loader'

import style from './Detail.module.css';

const Detail = () => {

  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await dispatch(getDetail(id));
      } catch (error) {
        console.error('Error al cargar el detalle:', error);
      }
    };
    fetchDetail();
    return () => dispatch(cleanDetail()); //return es el desmontaje del componente
  }, [id]);

  return (
    <>
      <MiniNavbar />
      {Object.keys(detail).length === 0 && <Loader />}
      {Object.keys(detail).length > 0 && (
        <div className={style.container}>
          <img src={detail.background_image} alt={detail.name} className={style.image} />
          <div>
            <div className={style.description}> 
              {detail.name && <h2>{detail.name}</h2> }
              {detail.platforms && <p><strong>Plataformas:</strong> {detail.platforms.map(item => item.name).join(" | ")}</p>}
              {detail.description && <div style={{fontSize: "16px"}} dangerouslySetInnerHTML={{ __html: detail.description }} />}
              {detail.rating && <p><strong>Rating:</strong> {detail.rating}</p>}
              {detail.genres && <p><strong>Generos:</strong> {detail.genres.map(item => item.name).join(", ")}</p>}
              {detail.released && <p><strong>Fecha de lanzamiento:</strong> {detail.released}</p>}
            </div>
          </div>
        </div>
      )}
      
    </>
  )
};

export default Detail;