import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ videogame }) => {
  const { id, name, background_image, genres, rating } = videogame;

  return (
    <Link to={`/detail/${id}`} className={style.card} style={{
      backgroundImage: `url(${background_image})`,
    }}>
      <div className={style.overlay}>
        <div className={style.info}>
          <h2>{name}</h2>
          {genres.map(({ name }, i) => {
            return <p key={i}>{name}</p>;
          })}
          <p className={style.rating}>Rating: {rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;