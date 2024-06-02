import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderByAlphabetic, orderByRating, filterByOrigin, filterByGender, setAllVideogames, setSearchString } from '../../redux/actions';
import { ORDERS } from '../../constants';

import style from './Navbar.module.css';

const DEFAULT_VALUE = 'default';

const Navbar = () => {

  const allGenres = useSelector((state) => state.allGenres);
  const allVideogames = useSelector((state) => state.allVideogames);
  const searchString = useSelector((state) => state.searchString);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedOriginValue, setSelectedOriginValue] = useState(DEFAULT_VALUE);
  const [selectedGenderValue, setSelectedGenderValue] = useState(DEFAULT_VALUE);
  
  const handleOrderByRating = (event) => {
    dispatch(orderByRating(event.target.value));
  };

  const handleOrderByAlphabetic = (event) => {
    dispatch(orderByAlphabetic(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    const value = event.target.value;
    setSelectedOriginValue(value);
    dispatch(filterByOrigin(value));
  };

  const handleFilterByGender = (event) => {
    const value = event.target.value;
    setSelectedGenderValue(value);
    dispatch(filterByGender(value));
  };

  const handleSetAllVideogames = () => {
    dispatch(setAllVideogames(allVideogames));
    setSelectedOriginValue(DEFAULT_VALUE);
    setSelectedGenderValue(DEFAULT_VALUE);
    setSearchString('');
  };

  return (
    <nav className={style.nav}>
      
      <button onClick={()=> navigate("/create")}>Crear videojuego</button>
      
      {allVideogames.length !== 0 && (
        <div>
          <select className={style.select} onChange={handleFilterByOrigin} disabled={selectedOriginValue !== DEFAULT_VALUE} value={selectedOriginValue}>
            <option value={DEFAULT_VALUE}>Seleccionar por Origen</option>
            <option value='false'>Api</option>
            <option value='true'>BDD</option>
          </select>

          <select className={style.select} onChange={handleFilterByGender} disabled={selectedGenderValue !== DEFAULT_VALUE} value={selectedGenderValue}>
            <option value={DEFAULT_VALUE}>Seleccionar por Géneros</option>
            {allGenres.map(genre => (
              <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
          </select>

          <select className={style.select} onChange={handleOrderByRating}>
            <option value="default">Ordenar por Rating</option>
            <option value={ORDERS.A}>Ascendente</option>
            <option value={ORDERS.D}>Descendente</option>
          </select>

          <select className={style.select} onChange={handleOrderByAlphabetic}>
            <option value="default">Ordenar Alfabéticamente</option>
            <option value={ORDERS.A}>A-Z</option>
            <option value={ORDERS.D}>Z-A</option>
          </select>

          {(selectedOriginValue !== DEFAULT_VALUE || selectedGenderValue !== DEFAULT_VALUE) &&
            <button onClick={handleSetAllVideogames}>Eliminar filtros</button>
          }   
        </div>
      )}

      {searchString !== '' && (
        <div style={{fontFamily: 'arial'}}>
          <p>Nombre buscado: {searchString}</p>
          <button onClick={handleSetAllVideogames}>Limpiar búsqueda</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


