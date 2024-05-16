import { Link } from 'react-router-dom';

import style from './Card.module.css';

const Card = ({videogame: { id, name, background_image, genres, rating }}) => {
  return (
    <div className={style.card}>
      <p className={style.name}><Link to={`/detail/${id}`}>{name}</Link></p>
      <img src={background_image} alt={name} width={200} />
      {/* {genres.map(({ name }, i) => {
        return (
          <p key={i}>{name}</p>
        )
      })} */}
      <p>{rating}</p>
    </div>
  );
};

export default Card;