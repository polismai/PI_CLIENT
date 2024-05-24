import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ videogame }) => {
  const { id, name, background_image, genres, rating } = videogame;
  return (
    <div className={style.card}>
      <img src={background_image} alt={name} width={200} />
      <p className={style.name}><Link to={`/detail/${id}`}>{name}</Link></p>
      {genres.map(({name}, i) => {
        return (
          <p key={i}>{name}</p>
        )
      })}
      <p>{rating}</p>
    </div>
  );
};

export default Card;