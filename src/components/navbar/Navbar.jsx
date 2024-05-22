import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderByAlphabetic, orderByRating, filterByOrigin, filterByGender } from '../../redux/actions';
import SearchBar from '../searchBar/SearchBar';

import style from './Navbar.module.css';


const Navbar = () => {
  const allGenres = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchString = useSelector((state) => state.searchString);
  
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

  return (
    <>
      <div className={style.nav}> 
        <button onClick = {()=> navigate("/create")}>Crear</button>
        <SearchBar />  
        <div className={style.containerSelect}>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleOrderByRating}>
              <option>Ordenar por Rating</option>
              <option value='A'>Ascendente</option>
              <option value='D'>Descendente</option>
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleOrderByAlphabetic}>
              <option>Ordenar Alfabéticamente</option>
              <option value='A'>A-Z</option>
              <option value='D'>Z-A</option>
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleFilterByOrigin}>
              <option>Seleccionar por Origen</option>
              <option value='all'>Todos</option>
              <option value='false'>Api</option>
              <option value='true'>BDD</option>
            </select>
          </div>
          <div className={style.selectContainer}>
            <select className={style.select} onChange={handleFilterByGender}>
              <option>Seleccionar por Géneros</option>
              <option value='all'>Todos</option>
              {allGenres.map(genre => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {searchString !== '' && <p>Nombre buscado: {searchString} [BOTON DE ELIMINAR]</p>}
    </>
  );
};

export default Navbar;


