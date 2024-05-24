import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderByAlphabetic, orderByRating, filterByOrigin, filterByGender, setAllVideogames } from '../../redux/actions';
import SearchBar from '../searchBar/SearchBar';
import { ORDERS, TYPES } from '../../constants';

import style from './Navbar.module.css';

const Navbar = () => {

  const allGenres = useSelector((state) => state.allGenres);
  const allVideogames = useSelector((state) => state.allVideogames);
  const searchString = useSelector((state) => state.searchString);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showSearchText, setShowSearchText] = useState(true);
  
  const handleOrderByRating = (event) => {
    dispatch(orderByRating(event.target.value));
  };

  const handleOrderByAlphabetic = (event) => {
    dispatch(orderByAlphabetic(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleFilterByGender = (event) => {
    dispatch(filterByGender(event.target.value));
  };

  const handleSetAllVideogames = () => {
    dispatch(setAllVideogames(allVideogames));
    setShowSearchText(false);
  };

  return (
    <>
      <div className={style.nav}> 
        <SearchBar />  
        <div className={style.containerSelect}>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleFilterByOrigin}>
              <option>Seleccionar por Origen</option>
              <option value={TYPES.ALL}>Todos</option>
              <option value='false'>Api</option>
              <option value='true'>BDD</option>
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleFilterByGender}>
              <option>Seleccionar por Géneros</option>
              <option value={TYPES.ALL}>Todos</option>
              {allGenres.map(genre => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleOrderByRating}>
              <option>Ordenar por Rating</option>
              <option value={ORDERS.A}>Ascendente</option>
              <option value={ORDERS.D}>Descendente</option>
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleOrderByAlphabetic}>
              <option>Ordenar Alfabéticamente</option>
              <option value={ORDERS.A}>A-Z</option>
              <option value={ORDERS.D}>Z-A</option>
            </select>
          </div>
        </div>
        <button onClick = {()=> navigate("/create")}>Crear videojuego</button>
      </div>
      {showSearchText && searchString !== '' && 
      <div>
        <p>Nombre buscado: {searchString}</p>
        <button onClick={handleSetAllVideogames}>Limpiar búsqueda</button>
      </div>
      }   
    </>
  );
};

export default Navbar;


