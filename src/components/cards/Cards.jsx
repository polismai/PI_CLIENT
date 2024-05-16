import style from './Cards.module.css';
import Card from '../card/Card';
// import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const Cards = ({ allVideogames }) => {

    // const [ videogames, setVideogames ] = useState([]);

    // useEffect(async () => {
    //   const { data: { allVideogames } } = await axios.get("http://localhost:3001/videogames/");
    //   setVideogames(allVideogames);
    // }, []);

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