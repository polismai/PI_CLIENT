import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, setSearchString } from '../../redux/actions';

import style from "./SearchBar.module.css";

const SearchBar = () => {
  
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || search === '') {
      return
    }

    dispatch(setSearchString(search));

    try {
      setLoading(true);
      await dispatch(getByName(search));
      setLoading(false);
      setErrorMessage('');
      setSearch('');
    } catch (error) {
      setLoading(false);
      setErrorMessage('¡No se encontraron videojuegos con ese nombre!');
    }
  };  

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <>
      <div className={style.search_container}>
        {allVideogames.length !== 0 && (
          <form onSubmit={handleSubmit} className={style.search_form}>
            <input 
              value={search}
              onChange={handleSearch}
              className={style.search_input} 
              placeholder='Escribe aqui el nombre del videojuego' 
              type='search'
            />
            <button className={style.search_button} type='submit' disabled={loading}>
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
