import style from './Cards.module.css';
import Card from '../card/Card';

const Cards = ({ allVideogames }) => {
  return (
    <div className={style.cards_container}>
      {allVideogames?.map((videogame) => {
        return (
          <Card key={videogame.id} videogame={videogame} />
        )
      })}
    </div>
  );
};
export default Cards;