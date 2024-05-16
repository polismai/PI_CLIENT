import style from './Detail.module.css';
import { getById } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {

  const dispatch = useDispatch();
  const videogameDetail = useSelector((state) => state.gameDetails);
  

  // const [ videogame, setVideogame ] = useState();

  // useEffect(async () => {
  //   const { data: { videogameDetail } } = await axios.get(`http://localhost:3001/videogames/${id}`);
  //   setVideogame(videogameDetail);
  //   console.log(videogameDetail)
  // }, []);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        dispatch(getById(id));
      } catch (error) {
        console.error('Error al cargar el detalle:', error);
      }
    };

    fetchData(id);
   
    // dispatch(getAllVideogames())
    // return (() => {
    //   clearDetail()
    // })
  }, [dispatch, id]);

  if (videogameDetail) {
    return (
      <div>
        <div className={style.card}>
          <div className={style.card_description}> 
          {videogameDetail.name && <h2>{videogameDetail.name}</h2> }
          {videogameDetail.platforms && <p>Plataformas: {videogameDetail.platforms.map(({ name }, i) => {
            return (
              <p key={i}>{name}</p>
            )
          })}</p>} 
          {videogameDetail.description && <p>Descripcion: {videogameDetail.description}</p>}
          {videogameDetail.rating && <p>Rating: {videogameDetail.rating}</p>}
          {videogameDetail.genres && <p>Generos: {videogameDetail.genres.map(({ name }, i) => {
            return (
             <p key={i}>{name}</p>
            )
          })}</p>}
          {videogameDetail.released && <p>Fecha de lanzamiento: {videogameDetail.released}</p>}
          </div>
          {videogameDetail.background_image && (
          <div className={style.card_image}>
            <img src={videogameDetail.background_image} alt={videogameDetail.name} />
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