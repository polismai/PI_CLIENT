import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSearchString(event.target.value)
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
    <div className={style.search_container}>
      <form onSubmit={handleSubmit} className={style.search_form}>
        <input 
          className={style.search_input} 
          placeholder='Escribe aqui el nombre del videojuego' 
          type='search'
          onChange={handleChange}
        />
        <button className={style.search_button} type='submit' disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

export default SearchBar;
