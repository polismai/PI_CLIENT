import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, setSearchString } from '../../redux/actions';

import style from "./SearchBar.module.css";

const SearchBar = () => {
  
  const dispatch = useDispatch();
  const searchString = useSelector((state) => state.searchString);
  const allVideogames = useSelector((state) => state.allVideogames);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    dispatch(setSearchString(event.target.value));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || searchString === '') {
      return
    }

    try {
      setLoading(true);
      await dispatch(getByName(searchString));
      setLoading(false);
      setErrorMessage('');
    } catch (error) {
      setLoading(false);
      setErrorMessage('¡No se encontraron videojuegos con ese nombre!');
    }
  };  

  return (
    <>
      <div className={style.search_container}>
        {allVideogames.length !== 0 && (
          <form onSubmit={handleSubmit} className={style.search_form}>
            <input 
              className={style.search_input} 
              placeholder='Escribe aqui el nombre del videojuego' 
              type='search'
              onChange={handleSearchChange}
            />
            <button className={style.search_button} type='submit' disabled={loading || searchString.trim() === ''}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        )}
      </div>
      {errorMessage && <div className={style.error}>{errorMessage}</div>}
    </>
  );
}

export default SearchBar;
